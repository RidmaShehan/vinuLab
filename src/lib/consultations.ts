import path from "path";
import fs from "fs";

export interface ConsultationRequest {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: number;
  gotIt: boolean;
}

const getFilePath = () => path.join(process.cwd(), "src", "data", "consultations.json");

export function getConsultations(): ConsultationRequest[] {
  try {
    const raw = fs.readFileSync(getFilePath(), "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function addConsultation(data: Omit<ConsultationRequest, "id" | "timestamp" | "gotIt">): ConsultationRequest {
  const list = getConsultations();
  const record: ConsultationRequest = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    ...data,
    timestamp: Date.now(),
    gotIt: false,
  };
  list.unshift(record);
  fs.writeFileSync(getFilePath(), JSON.stringify(list, null, 2), "utf-8");
  return record;
}

export function updateConsultationGotIt(id: string, gotIt: boolean): ConsultationRequest | null {
  const list = getConsultations();
  const idx = list.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], gotIt };
  fs.writeFileSync(getFilePath(), JSON.stringify(list, null, 2), "utf-8");
  return list[idx];
}
