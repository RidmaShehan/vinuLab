"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContent } from "@/context/ContentContext";

gsap.registerPlugin(ScrollTrigger);

export default function ServiceGrid() {
  const content = useContent();
  if (!content) return null;

  const { services: s } = content;
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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
          y: 80,
          opacity: 0,
          duration: 0.9,
          delay: i * 0.15,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [s.items.length]);

  return (
    <section id="servizi" ref={sectionRef} className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            {s.heading}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
              {s.headingHighlight}
            </span>
          </h2>
          <p className="mt-6 text-xl text-zinc-400">
            {s.subheading}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {s.items.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="group relative p-8 lg:p-10 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-cyan-400/30 transition-all duration-500 overflow-hidden"
            >
              <span className="text-6xl font-bold text-white/5 absolute top-6 right-6">{item.id}</span>
              <h3 className="text-2xl font-bold mb-4 relative z-10">{item.title}</h3>
              <p className="text-zinc-400 mb-6 relative z-10">{item.description}</p>
              <div className="flex flex-wrap gap-2 relative z-10">
                {item.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10 text-zinc-400">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-cyan-400/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
