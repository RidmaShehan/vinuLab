import path from "path";
import fs from "fs";
import { supabase } from "./supabase";

export interface ConsultationRequest {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: number;
  gotIt: boolean;
}

const consultationsPath = () => path.join(process.cwd(), "src", "data", "consultations.json");

function getConsultationsFromFile(): ConsultationRequest[] {
  try {
    const raw = fs.readFileSync(consultationsPath(), "utf-8");
    return JSON.parse(raw) as ConsultationRequest[];
  } catch {
    return [];
  }
}

export async function getConsultations(): Promise<ConsultationRequest[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from("consultations")
      .select("*")
      .order("timestamp", { ascending: false });
    if (!error && data) {
      return data.map((r) => ({
        id: r.id,
        name: r.name,
        email: r.email,
        message: r.message,
        timestamp: r.timestamp,
        gotIt: r.got_it ?? false,
      }));
    }
  }
  return getConsultationsFromFile();
}

export async function addConsultation(
  data: Omit<ConsultationRequest, "id" | "timestamp" | "gotIt">
): Promise<ConsultationRequest> {
  const record: ConsultationRequest = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    ...data,
    timestamp: Date.now(),
    gotIt: false,
  };
  if (supabase) {
    const { error } = await supabase.from("consultations").insert({
      id: record.id,
      name: record.name,
      email: record.email,
      message: record.message,
      timestamp: record.timestamp,
      got_it: record.gotIt,
    });
    if (error) throw new Error(error.message);
    return record;
  }
  const list = getConsultationsFromFile();
  list.unshift(record);
  fs.writeFileSync(consultationsPath(), JSON.stringify(list, null, 2), "utf-8");
  return record;
}

export async function updateConsultationGotIt(id: string, gotIt: boolean): Promise<ConsultationRequest | null> {
  if (supabase) {
    const { data, error } = await supabase
      .from("consultations")
      .update({ got_it: gotIt })
      .eq("id", id)
      .select()
      .single();
    if (!error && data) {
      return {
        id: data.id,
        name: data.name,
        email: data.email,
        message: data.message,
        timestamp: data.timestamp,
        gotIt: data.got_it ?? false,
      };
    }
    return null;
  }
  const list = getConsultationsFromFile();
  const idx = list.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], gotIt };
  fs.writeFileSync(consultationsPath(), JSON.stringify(list, null, 2), "utf-8");
  return list[idx];
}
