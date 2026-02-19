"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContent } from "@/context/ContentContext";

gsap.registerPlugin(ScrollTrigger);

export default function Blog() {
  const content = useContent();
  if (!content) return null;

  const b = content.blog;
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 90%" },
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [b.articles.length]);

  return (
    <section id="blog" ref={sectionRef} className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            {b.heading}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
              {b.headingHighlight}
            </span>
            .
          </h2>
          <p className="text-zinc-400 max-w-2xl mb-6">
            {b.subheading}
          </p>
          <a
            href={b.viewAllUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-2"
          >
            {b.viewAllText}
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {b.articles.map((a, i) => (
            <a
              key={`article-${i}`}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => { cardRefs.current[i] = el; }}
              className="group block p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-cyan-400/30 transition-all duration-500"
            >
              <span className="text-sm text-zinc-500">{a.readTime}</span>
              <h3 className="mt-2 text-xl font-bold group-hover:text-cyan-400 transition-colors line-clamp-2">
                {a.title}
              </h3>
              <p className="mt-3 text-zinc-500 text-sm line-clamp-3">{a.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-cyan-400 text-sm font-medium">
                Read
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
