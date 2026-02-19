"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { useContent } from "@/context/ContentContext";
import type { ThemeMode } from "@/lib/content";

const STORAGE_KEY = "vinulab-theme";

const ThemeContext = createContext<{
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
} | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const content = useContent();
  const defaultFromContent = content?.theme?.defaultMode ?? "dark";

  const [theme, setThemeState] = useState<ThemeMode>(defaultFromContent);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    if (stored === "light" || stored === "dark") {
      setThemeState(stored);
    } else {
      setThemeState(defaultFromContent);
    }
    setMounted(true);
  }, [defaultFromContent]);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme, mounted]);

  const setTheme = useCallback((mode: ThemeMode) => {
    setThemeState(mode);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, mode);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, next);
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
