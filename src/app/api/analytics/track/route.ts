import { NextRequest, NextResponse } from "next/server";
import { appendVisit, type VisitRecord } from "@/lib/analytics";

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "127.0.0.1";
}

async function getGeo(ip: string): Promise<{ country?: string; region?: string; city?: string; ll?: [number, number] }> {
  if (ip === "127.0.0.1" || ip === "::1" || ip.startsWith("192.168.") || ip.startsWith("10.")) {
    return {};
  }
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=country,regionName,city,lat,lon`, {
      signal: AbortSignal.timeout(3000),
    });
    const data = (await res.json()) as { country?: string; regionName?: string; city?: string; lat?: number; lon?: number };
    if (data.lat != null && data.lon != null) {
      return {
        country: data.country,
        region: data.regionName,
        city: data.city,
        ll: [data.lon, data.lat] as [number, number],
      };
    }
  } catch {
    // ignore
  }
  return {};
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const body = await request.json().catch(() => ({}));
    const { path: pagePath = "/", referrer, userAgent, screenWidth, screenHeight } = body;

    const geo = await getGeo(ip);
    const record: VisitRecord = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      timestamp: Date.now(),
      path: String(pagePath).slice(0, 256),
      ip,
      country: geo.country,
      region: geo.region,
      city: geo.city,
      ll: geo.ll,
      userAgent: userAgent ? String(userAgent).slice(0, 512) : request.headers.get("user-agent") ?? undefined,
      referrer: referrer ? String(referrer).slice(0, 512) : undefined,
      screenWidth: typeof screenWidth === "number" ? screenWidth : undefined,
      screenHeight: typeof screenHeight === "number" ? screenHeight : undefined,
    };

    await appendVisit(record);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Analytics track error:", err);
    return NextResponse.json({ error: "Track failed" }, { status: 500 });
  }
}
