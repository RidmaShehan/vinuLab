import { NextRequest, NextResponse } from "next/server";
import {
  verifyPassword,
  createSessionToken,
  buildSetCookieHeader,
} from "@/lib/auth";

const SESSION_MAX_AGE_SEC = 24 * 60 * 60;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const password = typeof body.password === "string" ? body.password : "";

    if (!password) {
      return NextResponse.json(
        { error: "Password required" },
        { status: 400 }
      );
    }

    if (!verifyPassword(password)) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    const { token } = createSessionToken();
    const response = NextResponse.json({ ok: true });
    response.headers.set(
      "Set-Cookie",
      buildSetCookieHeader(token, SESSION_MAX_AGE_SEC)
    );
    return response;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}
