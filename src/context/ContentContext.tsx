"use client";

import { createContext, useContext, useCallback, useEffect, useState, ReactNode } from "react";
import type { Content } from "@/lib/content";

type ContentState = {
  content: Content | null;
  loading: boolean;
  error: string | null;
  retry: () => void;
};

const ContentContext = createContext<ContentState | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = useCallback(() => {
    setError(null);
    setLoading(true);
    fetch("/api/content")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load content");
        return res.json();
      })
      .then((data) => {
        setContent(data);
        setError(null);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to load content");
        setContent(null);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const value: ContentState = {
    content,
    loading,
    error,
    retry: fetchContent,
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent(): Content | null {
  const ctx = useContext(ContentContext);
  return ctx?.content ?? null;
}

export function useContentState(): ContentState {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContentState must be used within ContentProvider");
  return ctx;
}
