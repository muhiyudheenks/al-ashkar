# Al Ashkar

Premium traditional men's thobe tailoring — a bilingual (English / العربية)
five-page site built with Vite, React, TypeScript and Tailwind CSS v4.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the shop's real details
npm run dev
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server on http://localhost:5173 |
| `npm run build` | Typecheck, then build to `dist/` |
| `npm run preview` | Serve the production build |
| `npm run typecheck` | Types only |

## Pages

| Route | Page |
| --- | --- |
| `/` | Home — hero, tailoring services, brand values, collection preview, WhatsApp CTA |
| `/about` | About Al Ashkar |
| `/services` | Thobe services, fabric guidance, process |
| `/gallery` | Gallery / collection with filters and a lightbox |
| `/contact` | Contact details and the thobe order form |

## Design system

The palette and type scale live in one place: the `@theme` block at the top of
[`src/index.css`](src/index.css).

| Token | Value | Use |
| --- | --- | --- |
| `--color-white` | `#FFFFFF` | Primary background |
| `--color-gold` | `#C5A15B` | CTAs, borders, icons, dividers, selected states |
| `--color-charcoal` | `#202020` | Headings and navigation text |
| `--color-ivory` | `#F7F3EB` | Secondary background |
| `--color-muted` | `#77736D` | Secondary text |

Shared component classes (`.btn`, `.card`, `.field`, `.shell`, `.section`,
`.eyebrow`, `.rule-gold`) are defined in the same file, so buttons, forms,
cards and spacing stay consistent across all five pages.

Typography pairs a display serif with a body sans in each script —
Cormorant Garamond / Inter for English, Amiri / Tajawal for Arabic. The Arabic
stack swaps in automatically whenever the document direction is RTL.

## Configuration

No real-world business detail is hardcoded. Everything comes from environment
variables and is **left blank by default** — the UI hides or labels anything
that is not configured rather than showing an invented value.

Copy `.env.example` to `.env.local` and fill in:

| Variable | Notes |
| --- | --- |
| `VITE_WHATSAPP_NUMBER` | Digits only, with country code, e.g. `9665XXXXXXXX`. Until this is set, WhatsApp buttons are hidden and the floating bubble does not render. |
| `VITE_PHONE`, `VITE_EMAIL`, `VITE_ADDRESS`, `VITE_HOURS` | Shown on the contact page and in the footer. |
| `VITE_MAPS_URL` | Optional link on the address card. |
| `VITE_INSTAGRAM_URL`, `VITE_X_URL`, `VITE_SNAPCHAT_URL`, `VITE_TIKTOK_URL` | Footer icons; only configured ones appear. |
| `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` | Order form storage. |
| `VITE_SUPABASE_ORDERS_TABLE` | Defaults to `thobe_orders`. |

## Supabase

Run [`supabase/schema.sql`](supabase/schema.sql) once in the Supabase SQL
editor. It creates `thobe_orders` with row level security: the anon key may
only `INSERT`, so submitted customer details cannot be read back through the
public site.

The form degrades safely at every step:

1. **Supabase configured** — the order is inserted and a confirmation is shown.
2. **Not configured** — the visitor is told the form is not connected and is
   offered the same details prefilled as a WhatsApp message.
3. **Insert fails** — the error is shown along with the WhatsApp fallback.

## Internationalisation

`src/i18n/en.ts` is the source of truth; `src/i18n/ar.ts` is typed against it,
so a missing or renamed Arabic key is a compile error rather than a blank
string. Switching language sets `lang` and `dir` on `<html>`, which drives the
Arabic font stack and the RTL layout. The choice persists in `localStorage`.

Layout uses CSS logical properties (`inset-inline`, `ps-*`/`pe-*`, `start`/`end`)
throughout, so both directions come from one set of rules.

The brand name is rendered in Latin script as **Al Ashkar** in both locales.

## Photography

All images are replaceable drop-ins. See
[`public/images/README.md`](public/images/README.md) for the full list of
slots, suggested shots and crop guidance. Missing photographs render a
designed placeholder rather than a broken image.

## Accessibility

- Skip link to main content, and a visible gold focus ring on every control.
- The mobile drawer and the gallery lightbox trap Escape, lock scroll and
  restore focus on close; lightbox arrow keys follow reading direction.
- Form errors are announced with `role="alert"` and tied to inputs via
  `aria-describedby`; submitting moves focus to the first field in error.
- All decorative artwork is `aria-hidden`; placeholders expose the translated
  alt text via `role="img"`.
- `prefers-reduced-motion` disables every transition and animation.
