import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * Returns whether content is stored in the database (Supabase) or file fallback.
 * Used by the admin panel to show connection status.
 */
export async function GET() {
  return NextResponse.json({
    source: supabase ? "database" : "file",
  });
}
