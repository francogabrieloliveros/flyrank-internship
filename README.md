# Three Roads: Choose Your Stack with AI

## General AI Fluency - Week 4

## Constraints given to AI

- **Budget:** Free tools only.
- **Skill level:** Experienced in frontend programming; must be able to maintain and explain the choice myself, not just copy it.
- **What the portfolio needs to do:** Follow the sitemap/content map (Home → Proof of Work → Contact → About), with a one-claim hero, a lead case study (Draw Collab) getting full detail while Farm-to-table, Chef Bot, etc. get secondary emphasis, skills grouped by Backend/AI/Frontend/Tools, and a single repeated CTA driving to "Connect on LinkedIn."
- **How my work must be shown:** Card-based project grid with category tag filters (JAVASCRIPT, TYPESCRIPT, DART, FLUTTER, REACT, JAVA, C, ARDUINO), each card showing a project image/logo, short description, and tech-stack tags — matching my current Projects page layout.
- **Dynamic at launch?** Yes, but only the contact form. Everything else (project cards, tag filtering) can be static data filtered client-side.

## Three stack options presented

1. **Static site + form service** — Plain HTML/CSS/JS or Astro, hosted on GitHub Pages/Netlify/Vercel, no backend, contact form via Formspree/Web3Forms. Simplest to build and maintain, but shows zero backend/AI evidence, which undercuts my "concurrent backend systems and AI-powered pipelines" claim.
2. **React/Next.js (static export) + managed form backend** — React or Next.js with TypeScript, hosted free on Vercel/Netlify, still no backend of my own, form handled by a third-party service. Better component structure and reuse for the project cards, but the site itself still doesn't demonstrate backend work.
3. **Next.js with a real API route (serverless) for the contact form** — Next.js App Router, a self-written `/api/contact` route on Vercel's free serverless tier, optionally Resend for email and Supabase for storage. Needs a small backend, but shows and defends the actual claim the portfolio is making, since I own the request/response path myself.

## Pressure-test

- **What breaks if I pick the simplest (Option 1)?** It'll break credibility and make development much harder.
- **What do I maintain if I pick the most powerful (Option 3)?** I want the projects page to be easily editable if I have new ones.
- **Can I finish in two weeks?** Yes — I already know React/TypeScript , so I just have to learn Next.js.
- **Does it show my work the way it needs to be shown?** Yes — Next.js/React/Tailwind allows for easier page routing, and dynamic Frontend.

## Rationale

I'm going with **TypeScript + React (via Next.js) + Tailwind CSS, hosted on Vercel**.

I picked Next.js over plain React specifically for three things AI pointed out: file-based routing , lazy loading, and use of react. I'm not familiar with Next.js yet, but since I already know react making it maintainabal; but I also want to use this opportunity to learn Next.js. I chose Vercel since its free and I don't need a backend for this portfolio yet.
