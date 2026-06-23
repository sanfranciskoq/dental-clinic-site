# Bright Smile Dental — Dental Clinic Website

A modern, high-conversion dental clinic website built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, and **shadcn/ui**.

## Features

- **Conversion-optimized** — sticky mobile Call/Book bar, dual CTAs on every page, trust signals throughout
- **Full multi-page site** — Home, Services, About, Team, FAQ, Contact, Book
- **Frontend-only forms** — client-side validation with react-hook-form + zod; success states ready for backend wiring
- **SEO-ready** — per-page metadata, LocalBusiness JSON-LD, FAQPage schema, Person schema on team profiles
- **Accessible** — skip link, semantic landmarks, WCAG-focused contrast and tap targets (44px min)
- **Static content** — all clinic data in TypeScript files for easy customization

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customization

### Clinic details

Edit [`src/data/site.ts`](src/data/site.ts) — name, phone, email, address, hours, map URL, stats.

### Services

Edit [`src/data/services.ts`](src/data/services.ts) — add/remove services, update slugs, steps, and FAQ links.

### Team

Edit [`src/data/team.ts`](src/data/team.ts) — member bios, photos (Unsplash URLs or local `/public/images/team/`).

### FAQ

Edit [`src/data/faq/index.ts`](src/data/faq/index.ts) — questions, categories, insurance list.

### Testimonials

Edit [`src/data/testimonials.ts`](src/data/testimonials.ts).

### SEO / canonical URL

Set in `.env.local`:

```
NEXT_PUBLIC_SITE_URL=https://yourclinic.com
```

## Project Structure

```
src/
├── app/              # Routes (App Router)
├── components/
│   ├── layout/       # Header, Footer, MobileCTA, Container
│   ├── sections/     # Homepage sections
│   ├── forms/        # BookForm, ContactForm
│   ├── faq/          # FAQ page components
│   └── ui/           # shadcn primitives
├── data/             # Static content (site, services, team, faq)
├── lib/              # utils, validations, metadata, icons
└── types/            # TypeScript interfaces
```

## Scripts

| Command         | Description          |
|-----------------|----------------------|
| `npm run dev`   | Start dev server     |
| `npm run build` | Production build     |
| `npm run start` | Start production     |
| `npm run lint`  | Run ESLint           |

## Deploy

Deploy to [Vercel](https://vercel.com):

```bash
npx vercel
```

Set `NEXT_PUBLIC_SITE_URL` to your production domain in project settings.

## Wiring Forms to a Backend

Forms currently log to console and show success UI. To connect:

1. Create API routes in `src/app/api/contact/route.ts` and `src/app/api/book/route.ts`
2. Replace `console.log` in form `onSubmit` handlers with `fetch('/api/...')`
3. Options: Supabase, Resend (email), Cal.com embed, or practice management software API

## License

Private — customize for your dental practice.
