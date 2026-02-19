import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (typeof window === "undefined" && (!url || !serviceKey) && process.env.NODE_ENV === "development") {
  console.warn(
    "[vinulab] Supabase not configured. Using file fallback for content/consultations/analytics. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local to use the database."
  );
}

export const supabase =
  url && serviceKey ? createClient(url, serviceKey, { auth: { persistSession: false } }) : null;
