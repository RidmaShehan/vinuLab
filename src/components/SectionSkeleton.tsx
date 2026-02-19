"use client";

/** Minimal skeleton for Suspense fallback when lazy-loading below-the-fold sections */
export default function SectionSkeleton() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="h-10 w-64 mx-auto rounded bg-white/10 animate-pulse" />
        <div className="h-5 w-96 max-w-full mx-auto mt-4 rounded bg-white/10 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 rounded-2xl bg-white/5 border border-white/10 animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
}
