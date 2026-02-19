"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContent } from "@/context/ContentContext";

gsap.registerPlugin(ScrollTrigger);

const defaultFaq = {
  subheading: "Questions? We have answers",
  heading: "Everything you need to know.",
  items: [{ q: "Question?", a: "Answer." }],
};

export default function FAQ() {
  const content = useContent();
  const f = content?.faq ?? defaultFaq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" ref={sectionRef} className="py-32 px-6 relative">
      <div className="max-w-3xl mx-auto">
        <div ref={headingRef} className="text-center mb-16">
          <p className="text-sm text-cyan-400 font-medium mb-2">{f.subheading}</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            {f.heading}
          </h2>
        </div>

        <div className="space-y-2">
          {f.items.map((item, i) => (
            <div
              key={i}
              className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.02]"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 flex items-start justify-between gap-4 text-left hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex gap-4">
                  <span className="text-sm font-mono text-zinc-500 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-semibold text-lg">{item.q}</h3>
                </div>
                <svg
                  className={`w-5 h-5 text-zinc-500 shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="px-6 pb-5 pl-16 text-zinc-400 leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
