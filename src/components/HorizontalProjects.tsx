"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContent } from "@/context/ContentContext";

gsap.registerPlugin(ScrollTrigger);

const defaultResults = [
  { value: "300%", label: "Average Growth" },
  { value: "4 Weeks", label: "Average Delivery Time" },
  { value: "98%", label: "Satisfied Clients" },
];

const defaultTestimonials = [
  {
    quote: "We automated 90% of repetitive tasks. A total game-changer for our customer care operations.",
    stat: "90%",
    statLabel: "Automation",
    author: "Marco R.",
    role: "CEO • Studio Legale Associato",
  },
  {
    quote: "The manual workload has been drastically reduced. Now the team can focus on strategic growth.",
    stat: "60%",
    statLabel: "Efficiency",
    author: "Sara B.",
    role: "Operations Manager • Agenzia Digitale",
  },
  {
    quote: "The investment paid off in weeks. The ROI was immediate, clear, and measurable.",
    stat: "3x",
    statLabel: "ROI",
    author: "Luca V.",
    role: "Founder • E-commerce Fashion",
  },
];

export default function HorizontalProjects() {
  const content = useContent();
  const section = content?.resultsSection;
  const results = section?.results ?? defaultResults;
  const testimonials = section?.testimonials ?? defaultTestimonials;
  const heading = section?.heading ?? "Concrete results,";
  const headingHighlight = section?.headingHighlight ?? "not just promises";
  const subheading = section?.subheading ?? "Transforming complexity into measurable impact.";
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
      if (statsRef.current?.children) {
        gsap.from(statsRef.current.children, {
          scrollTrigger: { trigger: statsRef.current, start: "top 85%" },
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          delay: 0.2,
          ease: "power3.out",
        });
      }
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 90%" },
          y: 80,
          opacity: 0,
          duration: 0.9,
          delay: i * 0.1,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Concrete results */}
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            {heading}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
              {headingHighlight}
            </span>
            .
          </h2>
          <p className="mt-6 text-xl text-zinc-400">
            {subheading}
          </p>
        </div>

        <div
          ref={statsRef}
          className="flex flex-wrap justify-center gap-12 md:gap-24 mb-32"
        >
          {results.map((r) => (
            <div key={r.label} className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-cyan-400">
                {r.value}
              </div>
              <div className="mt-1 text-zinc-500">{r.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {testimonials.map((t, i) => (
            <div
              key={i}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="relative p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-cyan-400/30 transition-colors duration-500"
            >
              <blockquote className="text-lg text-zinc-300 leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl font-bold text-cyan-400">{t.stat}</span>
                <span className="text-zinc-500">{t.statLabel}</span>
              </div>
              <div className="text-sm">
                <span className="font-medium text-white">{t.author}</span>
                <span className="text-zinc-500"> • {t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
