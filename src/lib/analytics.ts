import path from "path";
import fs from "fs";
import { getSupabase } from "./supabase";

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

const getFilePath = () => path.join(process.cwd(), "src", "data", "analytics.json");

function readFromFile(): VisitRecord[] {
  try {
    const raw = fs.readFileSync(getFilePath(), "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeToFile(data: VisitRecord[]): void {
  fs.writeFileSync(getFilePath(), JSON.stringify(data, null, 2), "utf-8");
}

export async function getAnalytics(): Promise<VisitRecord[]> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("analytics_events")
        .select("id, timestamp, path, ip, country, region, city, ll, user_agent, referrer, screen_width, screen_height")
        .order("timestamp", { ascending: false });
      if (!error && Array.isArray(data)) {
        return data.map((row) => ({
          id: row.id,
          timestamp: row.timestamp,
          path: row.path ?? "",
          ip: row.ip ?? "",
          country: row.country ?? undefined,
          region: row.region ?? undefined,
          city: row.city ?? undefined,
          ll: Array.isArray(row.ll) && row.ll.length >= 2 ? (row.ll as [number, number]) : undefined,
          userAgent: row.user_agent ?? undefined,
          referrer: row.referrer ?? undefined,
          screenWidth: row.screen_width ?? undefined,
          screenHeight: row.screen_height ?? undefined,
        }));
      }
    } catch (e) {
      console.warn("Supabase analytics fetch failed, using file:", e);
    }
  }
  return readFromFile();
}

export async function appendVisit(record: VisitRecord): Promise<void> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { error } = await supabase.from("analytics_events").insert({
        timestamp: record.timestamp,
        path: record.path,
        ip: record.ip,
        country: record.country ?? null,
        region: record.region ?? null,
        city: record.city ?? null,
        ll: record.ll ?? null,
        user_agent: record.userAgent ?? null,
        referrer: record.referrer ?? null,
        screen_width: record.screenWidth ?? null,
        screen_height: record.screenHeight ?? null,
      });
      if (!error) return;
      throw new Error(error.message);
    } catch (e) {
      console.warn("Supabase analytics insert failed, using file:", e);
    }
  }
  const data = readFromFile();
  data.push(record);
  writeToFile(data);
}
