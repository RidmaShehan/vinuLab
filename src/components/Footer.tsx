"use client";

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-zinc-500 text-sm">
          © {new Date().getFullYear()} VinuLab. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a
            href="https://graffico.it/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-cyan-400 transition-colors text-sm"
          >
            Privacy Policy
          </a>
          <a
            href="https://graffico.it/cookie-policy"
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
