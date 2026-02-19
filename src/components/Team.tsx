"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContent } from "@/context/ContentContext";

gsap.registerPlugin(ScrollTrigger);

export default function Team() {
  const content = useContent();
  if (!content) return null;

  const t = content.team;
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="team" ref={sectionRef} className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div ref={contentRef} className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            {t.heading}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
              {t.headingHighlight}
            </span>
            .
          </h2>
          <p className="mt-8 text-xl text-zinc-400 leading-relaxed">
            {t.paragraph1}
          </p>
          <p className="mt-4 text-lg text-zinc-500 leading-relaxed">
            {t.paragraph2}
          </p>
          <div className="flex justify-center gap-12 mt-16">
            {t.memberNames.map((name) => (
              <span key={name} className="text-2xl font-bold text-cyan-400">{name}</span>
            ))}
          </div>
          <p className="text-sm text-zinc-500 mt-2">{t.memberLabel}</p>
        </div>
      </div>
    </section>
  );
}
