"use client";

import { useEffect } from "react";

export default function AnalyticsTracker() {
  useEffect(() => {
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: typeof window !== "undefined" ? window.location.pathname || "/" : "/",
        referrer: typeof document !== "undefined" ? document.referrer || null : null,
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : null,
        screenWidth: typeof window !== "undefined" ? window.screen?.width : null,
        screenHeight: typeof window !== "undefined" ? window.screen?.height : null,
      }),
    }).catch(() => {});
  }, []);

  return null;
}
