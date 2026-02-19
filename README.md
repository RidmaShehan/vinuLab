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
- **Supabase** - PostgreSQL database (content, consultations, analytics)
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

Without a database, the site uses local JSON files under `src/data/`. For dynamic content backed by PostgreSQL, set up Supabase below.

## Build

```bash
npm run build
npm start
```

## Database (Supabase / PostgreSQL)

The site can store **content**, **consultations**, and **analytics** in Supabase (PostgreSQL). When configured, the admin panel saves to the database and the public site reads from it.

### 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a project.
2. In **Project Settings → API**, copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **service_role** key (secret) → `SUPABASE_SERVICE_ROLE_KEY`

### 2. Environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and set:

- `NEXT_PUBLIC_SUPABASE_URL` – your project URL
- `SUPABASE_SERVICE_ROLE_KEY` – your service_role key
- `ADMIN_PASSWORD` – password for `/admin` (default: `vinulab-admin`). Use this when logging in and when clicking **Save**.

### 3. Create tables

In the Supabase dashboard, open **SQL Editor** and run the migration:

- Copy the contents of `supabase/migrations/001_initial_schema.sql`
- Paste and run it in the SQL Editor

### 4. Seed initial content (optional)

**Option A – From the admin:**  
Open [http://localhost:3000/admin](http://localhost:3000/admin), log in, and click **Save**. The current content from `src/data/content.json` is written to the database.

**Option B – From the command line:**

```bash
# With env vars loaded (e.g. from .env.local on Unix):
node scripts/seed-supabase.js
```

After this, the site uses the database: admin changes are stored in Supabase and the frontend shows that data on each load.

## Project Structure

```
src/
├── app/              # Next.js App Router (pages, API routes, admin)
├── components/       # React components
├── context/         # React context (scroll, theme, content)
├── lib/              # Content, Supabase, consultations, analytics
└── data/             # Fallback JSON (used when Supabase not configured)
supabase/
├── migrations/       # SQL schema (run in Supabase SQL Editor)
└── seed.sql          # Optional SQL seed for site_content
scripts/
└── seed-supabase.js  # Optional: seed DB from content.json
```

## Credits

Inspired by [Graffico](https://graffico.it) - Awwwards Nominee. Built for educational purposes.
