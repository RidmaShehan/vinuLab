"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContent } from "@/context/ContentContext";

gsap.registerPlugin(ScrollTrigger);

const ICONS = [
  <svg key="1" className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>,
  <svg key="2" className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>,
  <svg key="3" className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>,
];

export default function WhatWeOffer() {
  const content = useContent();
  if (!content) return null;

  const { heading, headingHighlight, subheading, items } = content.services;
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subheadingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
      gsap.from(subheadingRef.current, {
        scrollTrigger: { trigger: subheadingRef.current, start: "top 85%" },
        y: 60,
        opacity: 0,
        duration: 0.9,
        delay: 0.2,
        ease: "power3.out",
      });
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 90%" },
          y: 100,
          opacity: 0,
          duration: 1,
          delay: i * 0.15,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [items.length]);

  return (
    <section ref={sectionRef} className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className="text-center mb-6">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            {heading}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
              {headingHighlight}
            </span>
          </h2>
        </div>
        <div ref={subheadingRef} className="text-center max-w-3xl mx-auto mb-24">
          <p className="text-xl text-zinc-400 leading-relaxed">
            {subheading}
          </p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {items.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group relative"
            >
              <div className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-16 items-start">
                <div className="flex items-center justify-center w-24 h-24 rounded-2xl bg-white/5 border border-white/10 text-cyan-400 group-hover:bg-cyan-400/10 group-hover:border-cyan-400/30 transition-all duration-500 shrink-0">
                  {ICONS[index % ICONS.length]}
                </div>
                <div>
                  <span className="text-sm font-mono text-cyan-400/80">
                    {item.id}
                  </span>
                  <h3 className="mt-2 text-2xl sm:text-3xl font-bold">
                    {item.title}
                  </h3>
                  <p className="mt-6 text-zinc-400 leading-relaxed text-lg max-w-3xl">
                    {item.description}
                  </p>
                </div>
              </div>
              {index < items.length - 1 && (
                <div className="mt-16 md:mt-24 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
