"use client";

import { useContent } from "@/context/ContentContext";

export default function Footer() {
  const content = useContent();
  if (!content) return null;

  const c = content.contact;

  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-zinc-500 text-sm">
          © {new Date().getFullYear()} VinuLab. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a
            href={c.privacyPolicyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-cyan-400 transition-colors text-sm"
          >
            Privacy Policy
          </a>
          <a
            href={c.cookiePolicyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-cyan-400 transition-colors text-sm"
          >
            Cookie Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
