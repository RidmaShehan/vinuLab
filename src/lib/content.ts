import path from "path";
import fs from "fs";
import { supabase } from "./supabase";

export type ThemeMode = "light" | "dark";

export interface Content {
  theme?: { defaultMode: ThemeMode };
  services: {
    heading: string;
    headingHighlight: string;
    subheading: string;
    items: Array<{ id: string; title: string; description: string; tags: string[] }>;
  };
  projects: {
    heading: string;
    subheading: string;
    keywords: string[];
    items: Array<{ name: string; url: string }>;
  };
  team: {
    heading: string;
    headingHighlight: string;
    paragraph1: string;
    paragraph2: string;
    memberNames: string[];
    memberLabel: string;
  };
  blog: {
    heading: string;
    headingHighlight: string;
    subheading: string;
    viewAllUrl: string;
    viewAllText: string;
    articles: Array<{ title: string; excerpt: string; url: string; readTime: string }>;
  };
  faq: {
    subheading: string;
    heading: string;
    items: Array<{ q: string; a: string }>;
  };
  contact: {
    heading: string;
    headingHighlight: string;
    subheading: string;
    buttonText: string;
    defaultMessage: string;
    contactEmail: string;
    linkedinUrl: string;
    instagramUrl: string;
    privacyPolicyUrl: string;
    cookiePolicyUrl: string;
  };
}

const getContentPath = () => path.join(process.cwd(), "src", "data", "content.json");

function getContentFromFile(): Content {
  const filePath = getContentPath();
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Content;
}

export async function getContent(): Promise<Content> {
  if (supabase) {
    const { data, error } = await supabase
      .from("site_content")
      .select("data")
      .eq("id", 1)
      .single();
    if (!error && data?.data) {
      return data.data as Content;
    }
  }
  return getContentFromFile();
}

export async function saveContent(content: Content): Promise<void> {
  if (supabase) {
    const { error } = await supabase
      .from("site_content")
      .upsert({ id: 1, data: content, updated_at: new Date().toISOString() }, { onConflict: "id" });
    if (!error) return;
    throw new Error(error.message);
  }
  const filePath = getContentPath();
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), "utf-8");
}
