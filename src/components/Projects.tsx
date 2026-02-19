"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContent } from "@/context/ContentContext";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const content = useContent();
  if (!content) return null;

  const p = content.projects;
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
      if (tagsRef.current?.children) {
        gsap.from(tagsRef.current.children, {
          scrollTrigger: { trigger: tagsRef.current, start: "top 90%" },
          opacity: 0,
          duration: 0.5,
          stagger: 0.03,
          delay: 0.2,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="progetti" ref={sectionRef} className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            {p.heading}
          </h2>
          <p className="text-zinc-500">{p.subheading}</p>
        </div>

        <div ref={tagsRef} className="flex flex-wrap justify-center gap-3 mb-20">
          {p.keywords.map((kw) => (
            <span key={kw} className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] text-zinc-500 text-sm hover:text-cyan-400 hover:border-cyan-400/30 transition-colors">
              {kw}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {p.items.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group aspect-[4/3] rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-cyan-400/30 transition-all duration-500 flex items-center justify-center"
            >
              <span className="text-sm font-medium text-zinc-500 group-hover:text-cyan-400 transition-colors px-4 text-center">
                {item.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
