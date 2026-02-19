"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Content } from "@/lib/content";

const ContentContext = createContext<Content | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<Content | null>(null);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then(setContent)
      .catch(console.error);
  }, []);

  return (
    <ContentContext.Provider value={content}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  return ctx;
}
