"use client";

import { useState, useEffect } from "react";
import WorldMap from "@/components/WorldMap";

interface AnalyticsData {
  totalVisits: number;
  uniqueVisitors: number;
  visitsLast24h: number;
  visitsLast7d: number;
  byCountry: { country: string; count: number }[];
  byPath: [string, number][];
  locations: { ll: [number, number]; country?: string; city?: string; count: number }[];
  recentVisits: Array<{
    timestamp: number;
    path: string;
    ip: string;
    country?: string;
    city?: string;
    userAgent?: string;
    referrer?: string;
  }>;
}

export default function AnalyticsTab() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    fetch("/api/analytics/stats", { credentials: "include" })
      .then((r) => {
        if (!r.ok) throw new Error("Unauthorized");
        return r.json();
      })
      .then((d) => {
        setData(d);
        setError("");
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const refresh = () => {
    setLoading(true);
    setError("");
    fetch("/api/analytics/stats", { credentials: "include" })
      .then((r) => {
        if (!r.ok) throw new Error("Unauthorized");
        return r.json();
      })
      .then((d) => {
        setData(d);
        setError("");
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-zinc-400">Loading analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02] space-y-4">
        <h3 className="font-semibold text-zinc-300">Analytics Access</h3>
        <p className="text-zinc-400 text-sm">
          {error === "Unauthorized"
            ? "The password you entered doesn't match. Enter the correct admin password in the header field above, then click Refresh."
            : error}
        </p>
        <button
          onClick={refresh}
          className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors text-sm"
        >
          Refresh
        </button>
      </div>
    );
  }

  if (!data) return null;

  const StatCard = ({
    label,
    value,
    sub,
  }: {
    label: string;
    value: string | number;
    sub?: string;
  }) => (
    <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:border-cyan-400/20 transition-colors">
      <p className="text-sm text-zinc-500 mb-1">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
      {sub && <p className="text-xs text-zinc-500 mt-1">{sub}</p>}
    </div>
  );

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleString();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analytics</h2>
        <button
          onClick={refresh}
          className="px-4 py-2 rounded-lg border border-white/10 hover:border-cyan-400/50 text-sm text-zinc-400 hover:text-cyan-400 transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Visits" value={data.totalVisits} />
        <StatCard label="Unique Visitors" value={data.uniqueVisitors} sub="by IP" />
        <StatCard label="Last 24h" value={data.visitsLast24h} />
        <StatCard label="Last 7 Days" value={data.visitsLast7d} />
      </div>

      {/* World Map */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h3 className="font-semibold">Visit Locations</h3>
          <p className="text-sm text-zinc-500">Geographic distribution of visitors</p>
        </div>
        <div className="aspect-[2/1] min-h-[320px] bg-zinc-900/50">
          <WorldMap locations={data.locations} width={800} height={400} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* By Country */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h3 className="font-semibold">By Country</h3>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {data.byCountry.length === 0 ? (
              <p className="p-6 text-zinc-500 text-sm">No location data yet</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-zinc-500 border-b border-white/5">
                    <th className="text-left px-6 py-3">Country</th>
                    <th className="text-right px-6 py-3">Visits</th>
                  </tr>
                </thead>
                <tbody>
                  {data.byCountry.slice(0, 15).map(({ country, count }) => (
                    <tr key={country} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="px-6 py-3">{country}</td>
                      <td className="px-6 py-3 text-right text-cyan-400">{count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* By Page */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h3 className="font-semibold">By Page</h3>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {data.byPath.length === 0 ? (
              <p className="p-6 text-zinc-500 text-sm">No page data yet</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-zinc-500 border-b border-white/5">
                    <th className="text-left px-6 py-3">Path</th>
                    <th className="text-right px-6 py-3">Visits</th>
                  </tr>
                </thead>
                <tbody>
                  {data.byPath.slice(0, 10).map(([path, count]) => (
                    <tr key={path} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="px-6 py-3 font-mono text-xs truncate max-w-[200px]">{path || "/"}</td>
                      <td className="px-6 py-3 text-right text-cyan-400">{count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Recent Visits - IP, Location, etc. */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h3 className="font-semibold">Recent Visits</h3>
          <p className="text-sm text-zinc-500">IP, location, path, and timestamp</p>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {data.recentVisits.length === 0 ? (
            <p className="p-6 text-zinc-500 text-sm">No visits recorded yet</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-zinc-900/95">
                <tr className="text-zinc-500 border-b border-white/5">
                  <th className="text-left px-6 py-3">Time</th>
                  <th className="text-left px-6 py-3">IP</th>
                  <th className="text-left px-6 py-3">Location</th>
                  <th className="text-left px-6 py-3">Path</th>
                  <th className="text-left px-6 py-3 hidden md:table-cell">Referrer</th>
                </tr>
              </thead>
              <tbody>
                {data.recentVisits.map((v) => (
                  <tr key={v.timestamp + v.ip} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="px-6 py-3 text-zinc-400 whitespace-nowrap">{formatTime(v.timestamp)}</td>
                    <td className="px-6 py-3 font-mono text-xs">{v.ip}</td>
                    <td className="px-6 py-3">
                      {[v.city, v.country].filter(Boolean).join(", ") || "—"}
                    </td>
                    <td className="px-6 py-3 font-mono text-xs">{v.path || "/"}</td>
                    <td className="px-6 py-3 text-zinc-500 truncate max-w-[180px] hidden md:table-cell">
                      {v.referrer ? (v.referrer.match(/^https?:\/\/([^/]+)/)?.[1] ?? v.referrer.slice(0, 25)) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
