"use client";

/**
 * Full-page skeleton shown while content is loading from the database (or file fallback).
 * Mirrors the layout for good perceived performance; no dummy data.
 */
export default function ContentLoading() {
  return (
    <main className="min-h-screen">
      {/* Hero skeleton */}
      <section className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20 px-6">
        <div className="max-w-4xl">
          <div className="h-4 w-24 rounded bg-white/10 mb-4 animate-pulse" />
          <div className="h-12 sm:h-14 md:h-16 w-full max-w-2xl rounded bg-white/10 animate-pulse" />
          <div className="h-12 sm:h-14 md:h-16 w-3/4 max-w-xl rounded bg-white/10 mt-2 animate-pulse" />
          <div className="mt-6 h-6 w-full max-w-xl rounded bg-white/10 animate-pulse" />
          <div className="mt-12 flex gap-12">
            <div className="h-10 w-24 rounded bg-white/10 animate-pulse" />
            <div className="h-10 w-20 rounded bg-white/10 animate-pulse" />
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="h-3 w-12 rounded bg-white/10 animate-pulse" />
          <div className="h-6 w-6 rounded bg-white/10 animate-pulse" />
        </div>
      </section>

      {/* Section skeletons */}
      {[1, 2, 3, 4, 5].map((i) => (
        <section key={i} className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="h-10 w-64 mx-auto rounded bg-white/10 animate-pulse" />
              <div className="h-5 w-96 max-w-full mx-auto mt-4 rounded bg-white/10 animate-pulse" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-48 rounded-2xl bg-white/5 border border-white/10 animate-pulse" style={{ animationDelay: `${j * 100}ms` }} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Footer skeleton */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="h-4 w-40 rounded bg-white/10 animate-pulse" />
          <div className="flex gap-6">
            <div className="h-4 w-24 rounded bg-white/10 animate-pulse" />
            <div className="h-4 w-24 rounded bg-white/10 animate-pulse" />
          </div>
        </div>
      </footer>

    </main>
  );
}
