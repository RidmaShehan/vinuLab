# vinuLab - Graffico Clone

A full clone of the [Graffico](https://graffico.it) website - an award-nominated B2B software agency experience. Built with Next.js, GSAP, Lenis, and Tailwind CSS.

## Features

- **Hero Experience** - Animated introduction sequence with staggered text reveals and gradient orbs
- **Immersive Horizontal Projects** - Horizontal scroll section showcasing services with GSAP ScrollTrigger
- **Kinetic Typography & What We Offer** - Scroll-triggered animations for the three service offerings
- **Interactive Service Grid** - Parallax effects and hover microinteractions
- **Seamless Navigation** - Lenis smooth scrolling with ScrollToPlugin-style anchor navigation
- **Responsive Design** - Mobile-first with hamburger menu

## Tech Stack

- **Next.js 16** - React framework
- **GSAP** - ScrollTrigger, timeline animations
- **Lenis** - Smooth scroll library
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety

## Custom Content

The site showcases three core offerings:

1. **Strategic Technical Partnership** - Dedicated engineering arm for product development
2. **Startup Architecture Consultancy** - Scalable system design and CTO-level guidance
3. **Professional Staff Training & AI Integration** - Expert-led upskilling in modern tech

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/           # Next.js App Router
├── components/    # React components
│   ├── HeroSection.tsx
│   ├── HorizontalProjects.tsx
│   ├── WhatWeOffer.tsx
│   ├── ServiceGrid.tsx
│   ├── Navbar.tsx
│   └── Footer.tsx
└── context/
    └── ScrollContext.tsx  # Lenis + smooth scroll
```

## Credits

Inspired by [Graffico](https://graffico.it) - Awwwards Nominee. Built for educational purposes.
