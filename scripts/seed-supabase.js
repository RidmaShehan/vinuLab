/**
 * Seed Supabase site_content from src/data/content.json.
 * Run after applying the migration. Requires Supabase credentials in env.
 *
 *   NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/seed-supabase.js
 *
 * Or copy .env.example to .env.local, fill in values, then (Unix):
 *   set -a && source .env.local && set +a && node scripts/seed-supabase.js
 *
 * Alternative: open /admin, click Save once (copies current file content to DB).
 */
const path = require("path");
const fs = require("fs");

const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const raw = fs.readFileSync(envPath, "utf-8");
  raw.split("\n").forEach((line) => {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "").trim();
  });
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(url, key);

const contentPath = path.join(process.cwd(), "src", "data", "content.json");
const content = JSON.parse(fs.readFileSync(contentPath, "utf-8"));

async function seed() {
  const { error } = await supabase.from("site_content").upsert(
    { id: 1, data: content, updated_at: new Date().toISOString() },
    { onConflict: "id" }
  );
  if (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
  console.log("Site content seeded successfully.");
}

seed();
