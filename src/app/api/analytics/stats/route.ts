import { NextRequest, NextResponse } from "next/server";
import { getAnalytics } from "@/lib/analytics";

export async function GET(request: NextRequest) {
  try {
    const password = request.headers.get("x-admin-password");
    const expected = process.env.ADMIN_PASSWORD || "vinulab-admin";
    if (password !== expected) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const visits = getAnalytics();

    const uniqueIps = new Set(visits.map((v) => v.ip));
    const byCountry: Record<string, number> = {};
    const byPath: Record<string, number> = {};
    const withLocation: { ll: [number, number]; country?: string; city?: string; count: number }[] = [];
    const locationMap = new Map<string, { ll: [number, number]; country?: string; city?: string; count: number }>();

    for (const v of visits) {
      byPath[v.path] = (byPath[v.path] ?? 0) + 1;
      if (v.country) byCountry[v.country] = (byCountry[v.country] ?? 0) + 1;

      if (v.ll) {
        const key = `${v.ll[0].toFixed(2)},${v.ll[1].toFixed(2)}`;
        const existing = locationMap.get(key);
        if (existing) existing.count++;
        else locationMap.set(key, { ll: v.ll, country: v.country, city: v.city, count: 1 });
      }
    }

    withLocation.push(...locationMap.values());

    const last24h = Date.now() - 24 * 60 * 60 * 1000;
    const last7d = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const visitsLast24h = visits.filter((v) => v.timestamp >= last24h).length;
    const visitsLast7d = visits.filter((v) => v.timestamp >= last7d).length;

    return NextResponse.json({
      totalVisits: visits.length,
      uniqueVisitors: uniqueIps.size,
      visitsLast24h,
      visitsLast7d,
      byCountry: Object.entries(byCountry)
        .sort((a, b) => b[1] - a[1])
        .map(([country, count]) => ({ country, count })),
      byPath: Object.entries(byPath)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20),
      locations: withLocation,
      recentVisits: visits.slice(-100).reverse(),
    });
  } catch (err) {
    console.error("Analytics stats error:", err);
    return NextResponse.json({ error: "Failed to load analytics" }, { status: 500 });
  }
}
