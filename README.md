# AI Infra Decoded — Marketing Site

The public marketing site for [aiinfradecoded.com](https://aiinfradecoded.com).

This is the brand's storefront — landing, pricing, about, changelog, license, privacy, and post-purchase pages. The actual product (the AgentForge starter kit that buyers receive) lives in a separate private repo: [`aiinfradecoded/agentforge-starter`](https://github.com/aiinfradecoded/agentforge-starter).

## Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS v4
- Lucide icons
- Hosted on Cloudflare Pages

No auth, no database, no API. Pure static marketing.

## Local development

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open <http://localhost:3000>.

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing page |
| `/pricing` | Hobby ($99) / Pro ($249) / Team — wired to Polar checkout |
| `/demo` | Public scripted streaming-chat preview (no sign-up) |
| `/about` | Brand + author background |
| `/changelog` | Product changelog |
| `/license` | Commercial license terms |
| `/privacy` | Privacy policy |
| `/thanks` | Post-purchase confirmation (Polar redirects here) |

## Deployment

Deploys to Cloudflare Pages on push to `main`. Production URL: `https://aiinfradecoded.com`.

Required production env vars (set in Cloudflare Pages dashboard):
- `NEXT_PUBLIC_SITE_URL=https://aiinfradecoded.com`
- `NEXT_PUBLIC_POLAR_HOBBY_URL=<live Polar checkout URL>`
- `NEXT_PUBLIC_POLAR_PRO_URL=<live Polar checkout URL>`
