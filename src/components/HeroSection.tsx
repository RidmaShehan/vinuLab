"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useScroll } from "@/context/ScrollContext";
import { useContent } from "@/context/ContentContext";

const defaultHero = {
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

export default function HeroSection() {
  const content = useContent();
  const hero = content?.hero ?? defaultHero;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useScroll();
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Initial state
      gsap.set([line1Ref.current, line2Ref.current, line3Ref.current, ctaRef.current, svgRef.current], {
        opacity: 0,
        y: 60,
      });

      // Staggered reveal
      tl.to(line1Ref.current, { opacity: 1, y: 0, duration: 0.8 })
        .to(line2Ref.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
        .to(line3Ref.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
        .to(
          svgRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
          },
          "-=1.2"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20"
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <div ref={line1Ref} className="overflow-hidden">
            <span className="inline-block text-sm font-medium text-cyan-400 uppercase tracking-widest mb-4">
              {hero.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              {hero.headline}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                {hero.headlineHighlight}
              </span>
            </h1>
          </div>
          <div ref={line2Ref} className="mt-6 overflow-hidden">
            <p className="text-xl sm:text-2xl text-zinc-400 max-w-2xl leading-relaxed">
              {hero.subheading}
            </p>
          </div>
          <div ref={ctaRef} className="mt-12 flex flex-wrap gap-12">
            {hero.stats.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-3xl sm:text-4xl font-bold text-cyan-400">{s.value}</span>
                <span className="text-zinc-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Animated SVG element */}
        <div ref={line3Ref} className="mt-20 flex justify-start">
          <svg
            ref={svgRef}
            className="w-24 h-24 text-cyan-400/80"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="8 4"
              className="origin-center animate-spin"
              style={{ animationDuration: "20s" }}
            />
            <path
              d="M50 20 L50 80 M20 50 L80 50"
              stroke="currentColor"
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <circle cx="50" cy="50" r="8" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-zinc-500 uppercase tracking-widest">{hero.scrollLabel}</span>
        <svg className="w-6 h-6 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

    </section>
  );
}
