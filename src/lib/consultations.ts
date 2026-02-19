import path from "path";
import fs from "fs";
import { getSupabase } from "./supabase";

export interface ConsultationRequest {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: number;
  gotIt: boolean;
}

const getFilePath = () => path.join(process.cwd(), "src", "data", "consultations.json");

function readFromFile(): ConsultationRequest[] {
  try {
    const raw = fs.readFileSync(getFilePath(), "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeToFile(list: ConsultationRequest[]): void {
  fs.writeFileSync(getFilePath(), JSON.stringify(list, null, 2), "utf-8");
}

export async function getConsultations(): Promise<ConsultationRequest[]> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("consultations")
        .select("id, name, email, message, created_at, got_it")
        .order("created_at", { ascending: false });
      if (!error && Array.isArray(data)) {
        return data.map((row) => ({
          id: row.id,
          name: row.name ?? "",
          email: row.email ?? "",
          message: row.message ?? "",
          timestamp: new Date(row.created_at).getTime(),
          gotIt: row.got_it ?? false,
        }));
      }
    } catch (e) {
      console.warn("Supabase consultations fetch failed, using file:", e);
    }
  }
  return readFromFile();
}

export async function addConsultation(
  data: Omit<ConsultationRequest, "id" | "timestamp" | "gotIt">
): Promise<ConsultationRequest> {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const record: ConsultationRequest = {
    id,
    ...data,
    timestamp: Date.now(),
    gotIt: false,
  };

  const supabase = getSupabase();
  if (supabase) {
    try {
      const { error } = await supabase.from("consultations").insert({
        id: record.id,
        name: record.name,
        email: record.email,
        message: record.message,
        got_it: record.gotIt,
      });
      if (!error) return record;
      throw new Error(error.message);
    } catch (e) {
      console.warn("Supabase consultation insert failed, using file:", e);
    }
  }

  const list = readFromFile();
  list.unshift(record);
  writeToFile(list);
  return record;
}

export async function updateConsultationGotIt(
  id: string,
  gotIt: boolean
): Promise<ConsultationRequest | null> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("consultations")
        .update({ got_it: gotIt })
        .eq("id", id)
        .select("id, name, email, message, created_at, got_it")
        .single();
      if (!error && data) {
        return {
          id: data.id,
          name: data.name ?? "",
          email: data.email ?? "",
          message: data.message ?? "",
          timestamp: new Date(data.created_at).getTime(),
          gotIt: data.got_it ?? false,
        };
      }
      return null;
    } catch (e) {
      console.warn("Supabase consultation update failed, using file:", e);
    }
  }

  const list = readFromFile();
  const idx = list.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], gotIt };
  writeToFile(list);
  return list[idx];
}
