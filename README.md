# AI Infra Decoded — Marketing Site

The public marketing site for [aiinfradecoded.com](https://aiinfradecoded.com).

This is the brand's storefront for its two paid products:

- **MCP Anvil** — a local MCP toolbox: daemon + dashboard + 64 built-in tools
  + audit trail. Product page at `/mcp-anvil`.
- **Agent Forge** — a local agent workbench: define agents in YAML, wire them
  to MCP servers, run/eval them. Product page at `/agentforge`.

Checkout is handled by **Polar** (hosted, merchant of record). License
fulfillment (signing the Ed25519 license blob + emailing it) is handled by a
separate Cloudflare Worker that lives in the `mcp-anvil` repo, **not** here.
This repo is the marketing/storefront front end only.

## Stack

- Next.js 15 (App Router) — routes live under `app/`
- React 19
- Tailwind CSS v4
- Lucide icons
- Hosted on Cloudflare Pages

Static marketing site. No auth and no database; the purchase flow is just
links to Polar checkout, and post-purchase fulfillment happens out-of-band in
the Worker.

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
| `/mcp-anvil` | MCP Anvil product + pricing (Personal / Team), wired to Polar |
| `/agentforge` | Agent Forge product + pricing (Personal / Team / bundle), wired to Polar |
| `/pricing` | Combined pricing overview |
| `/demo` | Public scripted preview (no sign-up) |
| `/claim` | Post-purchase license claim / activation help (noindex) |
| `/thanks`, `/mcp-anvil/thanks` | Post-purchase confirmation (Polar redirects here) |
| `/about` | Brand + author background |
| `/changelog` | Product changelog |
| `/license` | Commercial license terms |
| `/privacy` | Privacy policy |

## Deployment

Deploys to Cloudflare Pages on push to `main`. Production URL:
`https://aiinfradecoded.com`. (The site is live and connected to Polar.)

Required production env vars (set in the Cloudflare Pages dashboard). Checkout
URLs are env-driven with a `mailto:` fallback when a SKU URL is unset:

- `NEXT_PUBLIC_SITE_URL=https://aiinfradecoded.com`
- `NEXT_PUBLIC_POLAR_MCPANVIL_PERSONAL_URL=<live Polar checkout URL>`
- `NEXT_PUBLIC_POLAR_MCPANVIL_TEAM_URL=<live Polar checkout URL>`
- `NEXT_PUBLIC_POLAR_AGENTFORGE_PERSONAL_URL=<live Polar checkout URL>`
- `NEXT_PUBLIC_POLAR_AGENTFORGE_TEAM_URL=<live Polar checkout URL>`
- `NEXT_PUBLIC_POLAR_BUNDLE_PERSONAL_URL=<live Polar checkout URL>`
