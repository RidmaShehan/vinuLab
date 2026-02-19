import path from "path";
import fs from "fs";

export interface VisitRecord {
  id: string;
  timestamp: number;
  path: string;
  ip: string;
  country?: string;
  region?: string;
  city?: string;
  ll?: [number, number]; // [lon, lat]
  userAgent?: string;
  referrer?: string;
  screenWidth?: number;
  screenHeight?: number;
}

const getFilePath = () => path.join(process.cwd(), "src", "data", "analytics.json");

export function getAnalytics(): VisitRecord[] {
  try {
    const raw = fs.readFileSync(getFilePath(), "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function appendVisit(record: VisitRecord): void {
  const data = getAnalytics();
  data.push(record);
  fs.writeFileSync(getFilePath(), JSON.stringify(data, null, 2), "utf-8");
}
