import { NextRequest } from "next/server";
import crypto from "crypto";

const COOKIE_NAME = "vinulab_admin_session";
const SESSION_MAX_AGE_SEC = 24 * 60 * 60; // 24 hours
const TOKEN_SEPARATOR = ".";

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.SESSION_SECRET;
  if (secret && secret.length >= 32) return secret;
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "Set ADMIN_SESSION_SECRET (or SESSION_SECRET) to a random string of at least 32 characters"
    );
  }
  return "dev-session-secret-min-32-chars-long-do-not-use-in-production";
}

function getExpectedPassword(): string {
  return process.env.ADMIN_PASSWORD || "vinulab-admin";
}

/** Timing-safe password comparison to prevent timing attacks. */
export function verifyPassword(input: string): boolean {
  const expected = getExpectedPassword();
  if (input.length !== expected.length) {
    // Still hash both to consume similar time
    crypto.createHash("sha256").update(input).digest();
    crypto.createHash("sha256").update(expected).digest();
    return false;
  }
  const a = Buffer.from(input, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function base64UrlEncode(buf: Buffer): string {
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(str: string): Buffer {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = 4 - (base64.length % 4);
  return Buffer.from(base64 + (pad === 4 ? "" : "=".repeat(pad)), "base64");
}

export function createSessionToken(): { token: string; expiresAt: number } {
  const secret = getSessionSecret();
  const sid = crypto.randomBytes(24).toString("base64url");
  const expiresAt = Date.now() + SESSION_MAX_AGE_SEC * 1000;
  const payload = JSON.stringify({ sid, exp: expiresAt });
  const payloadB64 = base64UrlEncode(Buffer.from(payload, "utf8"));
  const sig = crypto.createHmac("sha256", secret).update(payloadB64).digest();
  const sigB64 = base64UrlEncode(sig);
  const token = `${payloadB64}${TOKEN_SEPARATOR}${sigB64}`;
  return { token, expiresAt };
}

export function verifySessionToken(token: string): boolean {
  try {
    const secret = getSessionSecret();
    const idx = token.indexOf(TOKEN_SEPARATOR);
    if (idx <= 0) return false;
    const payloadB64 = token.slice(0, idx);
    const sigB64 = token.slice(idx + 1);
    const sig = base64UrlDecode(sigB64);
    const expectedSig = crypto.createHmac("sha256", secret).update(payloadB64).digest();
    if (sig.length !== expectedSig.length || !crypto.timingSafeEqual(sig, expectedSig)) return false;
    const payloadJson = base64UrlDecode(payloadB64).toString("utf8");
    const payload = JSON.parse(payloadJson) as { exp?: number };
    if (typeof payload.exp !== "number" || payload.exp < Date.now()) return false;
    return true;
  } catch {
    return false;
  }
}

export function getSessionCookie(request: NextRequest): string | null {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]*)`));
  const value = match?.[1];
  if (!value) return null;
  try {
    return decodeURIComponent(value);
  } catch {
    return null;
  }
}

/** Returns true if the request has a valid admin session (cookie). Use in API routes. */
export function isAdminRequest(request: NextRequest): boolean {
  const token = getSessionCookie(request);
  if (!token) return false;
  return verifySessionToken(token);
}

export function getCookieName(): string {
  return COOKIE_NAME;
}

/** Build Set-Cookie header value for logging in. */
export function buildSetCookieHeader(value: string, maxAge: number): string {
  const secure = process.env.NODE_ENV === "production";
  const parts = [
    `${COOKIE_NAME}=${encodeURIComponent(value)}`,
    "Path=/",
    "HttpOnly",
    `Max-Age=${maxAge}`,
    "SameSite=Lax",
  ];
  if (secure) parts.push("Secure");
  return parts.join("; ");
}

/** Build Set-Cookie header to clear the session (logout). */
export function buildClearCookieHeader(): string {
  return [
    `${COOKIE_NAME}=`,
    "Path=/",
    "HttpOnly",
    "Max-Age=0",
    "SameSite=Lax",
  ].join("; ");
}
