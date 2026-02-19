import path from "path";
import fs from "fs";
import { getSupabase } from "./supabase";

export type ThemeMode = "light" | "dark";

export interface Content {
  theme?: { defaultMode: ThemeMode };
  hero: {
    badge: string;
    headline: string;
    headlineHighlight: string;
    subheading: string;
    stats: Array<{ value: string; label: string }>;
    scrollLabel: string;
  };
  resultsSection: {
    heading: string;
    headingHighlight: string;
    subheading: string;
    results: Array<{ value: string; label: string }>;
    testimonials: Array<{
      quote: string;
      stat: string;
      statLabel: string;
      author: string;
      role: string;
    }>;
  };
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

const CONTENT_ID = "main";

const defaultHero: Content["hero"] = {
  badge: "Web Studio",
  headline: "We craft",
  headlineHighlight: "digital experiences",
  subheading: "We engineer the success of your vision through technology and innovation.",
  stats: [
    { value: "15+", label: "Industries" },
    { value: "5+", label: "Years" },
  ],
  scrollLabel: "Scroll",
};

const defaultResultsSection: Content["resultsSection"] = {
  heading: "Concrete results,",
  headingHighlight: "not just promises",
  subheading: "Transforming complexity into measurable impact.",
  results: [
    { value: "300%", label: "Average Growth" },
    { value: "4 Weeks", label: "Average Delivery Time" },
    { value: "98%", label: "Satisfied Clients" },
  ],
  testimonials: [
    {
      quote: "We automated 90% of repetitive tasks. A total game-changer for our customer care operations.",
      stat: "90%",
      statLabel: "Automation",
      author: "Marco R.",
      role: "CEO • Studio Legale Associato",
    },
    {
      quote: "The manual workload has been drastically reduced. Now the team can focus on strategic growth.",
      stat: "60%",
      statLabel: "Efficiency",
      author: "Sara B.",
      role: "Operations Manager • Agenzia Digitale",
    },
    {
      quote: "The investment paid off in weeks. The ROI was immediate, clear, and measurable.",
      stat: "3x",
      statLabel: "ROI",
      author: "Luca V.",
      role: "Founder • E-commerce Fashion",
    },
  ],
};

/** Ensures hero and resultsSection exist (for older DB rows or partial content). */
function mergeContentDefaults(raw: Partial<Content>): Content {
  const c = raw as Content;
  return {
    ...c,
    hero: c.hero && Array.isArray(c.hero.stats) ? c.hero : { ...defaultHero, ...c.hero },
    resultsSection:
      c.resultsSection && Array.isArray(c.resultsSection.results) && Array.isArray(c.resultsSection.testimonials)
        ? c.resultsSection
        : { ...defaultResultsSection, ...c.resultsSection },
  } as Content;
}

const getContentPath = () => path.join(process.cwd(), "src", "data", "content.json");

function readContentFromFile(): Content {
  const filePath = getContentPath();
  const raw = fs.readFileSync(filePath, "utf-8");
  return mergeContentDefaults(JSON.parse(raw) as Partial<Content>);
}

export async function getContent(): Promise<Content> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("site_content")
        .select("content")
        .eq("id", CONTENT_ID)
        .single();
      if (!error && data?.content && typeof data.content === "object") {
        const parsed = data.content as Record<string, unknown>;
        if (Object.keys(parsed).length > 0) {
          return mergeContentDefaults(data.content as Partial<Content>);
        }
        // DB row exists but empty: seed from file and persist to DB
        const fileContent = readContentFromFile();
        await supabase
          .from("site_content")
          .upsert(
            { id: CONTENT_ID, content: fileContent as unknown as Record<string, unknown>, updated_at: new Date().toISOString() },
            { onConflict: "id" }
          )
          .then(() => {});
        return fileContent;
      }
    } catch (e) {
      console.warn("Supabase content fetch failed, using file:", e);
    }
  }
  return readContentFromFile();
}

export async function saveContent(content: Content): Promise<void> {
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase
      .from("site_content")
      .upsert(
        { id: CONTENT_ID, content: content as unknown as Record<string, unknown>, updated_at: new Date().toISOString() },
        { onConflict: "id" }
      );
    if (error) {
      throw new Error(error.message);
    }
    return;
  }
  const filePath = getContentPath();
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), "utf-8");
}
