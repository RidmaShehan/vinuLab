-- VinuLab Supabase Schema
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)

-- Site content (admin-editable CMS content, single row with id=1)
CREATE TABLE IF NOT EXISTS site_content (
  id INTEGER PRIMARY KEY DEFAULT 1,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Consultations (contact form submissions)
CREATE TABLE IF NOT EXISTS consultations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  timestamp BIGINT NOT NULL,
  got_it BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_consultations_timestamp ON consultations(timestamp DESC);

-- Analytics (visit tracking)
CREATE TABLE IF NOT EXISTS analytics_visits (
  id TEXT PRIMARY KEY,
  timestamp BIGINT NOT NULL,
  path TEXT NOT NULL,
  ip TEXT NOT NULL,
  country TEXT,
  region TEXT,
  city TEXT,
  ll JSONB,
  user_agent TEXT,
  referrer TEXT,
  screen_width INTEGER,
  screen_height INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_timestamp ON analytics_visits(timestamp DESC);

-- Row Level Security: blocks direct anon access. Service role bypasses RLS.
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_visits ENABLE ROW LEVEL SECURITY;
