# ق stones — PRD

## Original Problem Statement
"I want to create a professional website for my pink salt exports from pakistan. The name of the company is ق stones."

## User Choices
- Pages: Home, About, Products, Process, Certifications, Contact + B2B RFQ form
- Products: Himalayan pink salt only (6 families)
- Visual: luxury editorial × industrial B2B fusion (dark + terracotta/salt-pink)
- Logo: Arabic ق + serif "stones"
- Email: Resend/SendGrid — key to be plugged in later (storage-only for now)

## Architecture
- **Backend**: FastAPI + MongoDB (Motor). Endpoints: `/api/products`, `/api/products/{id}`, `/api/rfq` (POST/GET), `/api/contact` (POST/GET).
- **Frontend**: React + react-router-dom + Tailwind + shadcn (sonner). Pages routed under `/`, `/about`, `/products`, `/products/:id`, `/process`, `/certifications`, `/contact`, `/rfq`.
- **Design tokens**: Cormorant Garamond (headings), IBM Plex Sans (body), IBM Plex Mono (overlines/data). Colors: #0A0909 base, #E07A5F primary terracotta, #B0966A gold accent. Grain SVG overlay.

## What's been implemented (Dec 2025 — v1)
- Marketing site (Home with hero, stats, mission, categories, why-us, marquee, CTA)
- About (origin, standards, timeline, quick facts)
- Products list + filter + detail pages (6 SKUs hard-coded in backend)
- Process (6-stage timeline + technical specification table)
- Certifications (6 cert cards + sample COA table)
- Contact (info cards + general enquiry form persisting to MongoDB)
- RFQ (multi-section B2B quote form with success state)
- Header (sticky/blurred, mobile menu) + Footer + grain texture overlay
- Backend tested 100% (9/9 pytest cases). Frontend verified visually + via testing agent.

## Backlog
- **P1**: Wire Resend/SendGrid email on RFQ + Contact (when key arrives) → integration_playbook_expert_v2.
- **P1**: Admin dashboard at `/admin` to view RFQ + contact submissions (auth gated).
- **P2**: Multilingual toggle (EN / UR / AR).
- **P2**: Sample order + courier integration (DHL/FedEx).
- **P2**: Live shipping tracker (BL number → vessel ETA).
- **P3**: Blog / press section, lead magnet (downloadable PDF brochure & price list).
- **P3**: Replace placeholder cert logos with real client artwork.

## Next tasks
1. Plug in email provider once user supplies API key.
2. Build admin dashboard for inquiries.
3. Tighten CORS for production.
