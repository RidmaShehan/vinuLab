import { supabase } from "./supabase";

export interface VisitRecord {
  id: string;
  timestamp: number;
  path: string;
  ip: string;
  country?: string;
  region?: string;
  city?: string;
  ll?: [number, number];
  userAgent?: string;
  referrer?: string;
  screenWidth?: number;
  screenHeight?: number;
}

function getAnalyticsFromFile(): VisitRecord[] {
  try {
    const fs = require("fs");
    const path = require("path");
    const raw = fs.readFileSync(path.join(process.cwd(), "src", "data", "analytics.json"), "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function getAnalytics(): Promise<VisitRecord[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from("analytics_visits")
      .select("*")
      .order("timestamp", { ascending: false });
    if (!error && data) {
      return data.map((r) => ({
        id: r.id,
        timestamp: r.timestamp,
        path: r.path,
        ip: r.ip,
        country: r.country,
        region: r.region,
        city: r.city,
        ll: r.ll,
        userAgent: r.user_agent,
        referrer: r.referrer,
        screenWidth: r.screen_width,
        screenHeight: r.screen_height,
      }));
    }
  }
  return getAnalyticsFromFile();
}

export async function appendVisit(record: VisitRecord): Promise<void> {
  if (supabase) {
    const { error } = await supabase.from("analytics_visits").insert({
      id: record.id,
      timestamp: record.timestamp,
      path: record.path,
      ip: record.ip,
      country: record.country,
      region: record.region,
      city: record.city,
      ll: record.ll,
      user_agent: record.userAgent,
      referrer: record.referrer,
      screen_width: record.screenWidth,
      screen_height: record.screenHeight,
    });
    if (error) throw new Error(error.message);
    return;
  }
  const fs = require("fs");
  const path = require("path");
  const data = getAnalyticsFromFile();
  data.push(record);
  fs.writeFileSync(path.join(process.cwd(), "src", "data", "analytics.json"), JSON.stringify(data, null, 2), "utf-8");
}
