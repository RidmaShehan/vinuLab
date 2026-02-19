"use client";

import HeroSection from "@/components/HeroSection";
import HorizontalProjects from "@/components/HorizontalProjects";
import WhatWeOffer from "@/components/WhatWeOffer";
import ServiceGrid from "@/components/ServiceGrid";
import Projects from "@/components/Projects";
import Team from "@/components/Team";
import Blog from "@/components/Blog";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <HorizontalProjects />
      <WhatWeOffer />
      <ServiceGrid />
      <Projects />
      <Team />
      <Blog />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
