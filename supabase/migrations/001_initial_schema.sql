-- VinuLab: run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- Creates tables for dynamic site content, consultations, and analytics.

-- Single row storing the full site content (Services, Projects, Team, Blog, FAQ, Contact)
CREATE TABLE IF NOT EXISTS site_content (
  id TEXT PRIMARY KEY DEFAULT 'main',
  content JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed initial content (optional; admin can replace via /admin)
INSERT INTO site_content (id, content)
VALUES ('main', '{}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Consultations (contact form submissions)
CREATE TABLE IF NOT EXISTS consultations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  got_it BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_consultations_created_at ON consultations (created_at DESC);

-- Analytics visits
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp BIGINT NOT NULL,
  path TEXT NOT NULL,
  ip TEXT,
  country TEXT,
  region TEXT,
  city TEXT,
  ll JSONB,
  user_agent TEXT,
  referrer TEXT,
  screen_width INT,
  screen_height INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_timestamp ON analytics_events (timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_path ON analytics_events (path);

-- RLS: allow service role full access (API uses service role key)
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Policy: service role can do everything (handled by service_role key)
CREATE POLICY "Service role full access site_content" ON site_content FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access consultations" ON consultations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access analytics_events" ON analytics_events FOR ALL USING (true) WITH CHECK (true);
