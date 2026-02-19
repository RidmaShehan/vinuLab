"use client";

import { lazy, Suspense } from "react";
import ContentGate from "@/components/ContentGate";
import HeroSection from "@/components/HeroSection";
import HorizontalProjects from "@/components/HorizontalProjects";
import WhatWeOffer from "@/components/WhatWeOffer";
import ServiceGrid from "@/components/ServiceGrid";
import Projects from "@/components/Projects";
import SectionSkeleton from "@/components/SectionSkeleton";

const Team = lazy(() => import("@/components/Team"));
const Blog = lazy(() => import("@/components/Blog"));
const FAQ = lazy(() => import("@/components/FAQ"));
const CTA = lazy(() => import("@/components/CTA"));
const Footer = lazy(() => import("@/components/Footer"));

export default function Home() {
  return (
    <ContentGate>
      <main className="min-h-screen">
        <HeroSection />
        <HorizontalProjects />
        <WhatWeOffer />
        <ServiceGrid />
        <Projects />
        <Suspense fallback={<SectionSkeleton />}>
          <Team />
          <Blog />
          <FAQ />
          <CTA />
          <Footer />
        </Suspense>
      </main>
    </ContentGate>
  );
}
