import { Check, Lock, Minus } from "lucide-react";
import Link from "next/link";

import { Container } from "@/app/_components/Container";
import { Footer } from "@/app/_components/Footer";
import { Nav } from "@/app/_components/Nav";

export const metadata = {
  title: "Pricing",
  description:
    "Pricing for AI Infra Decoded products. MCP Anvil: $29 personal / $99 team. AgentForge: source-available, one-time license.",
  alternates: { canonical: "/pricing" },
};

/**
 * Checkout URLs.
 *
 * Hobby + Pro go through Polar (merchant of record — handles VAT/sales tax).
 * Team stays as a mailto since multi-seat licenses get negotiated.
 *
 * The Polar URLs come from env so they can be set per environment without a
 * deploy. If unset (e.g., during initial setup), we fall back to a mailto so
 * the page never has a dead link.
 *
 * To populate:
 *   1. Create the products in your Polar dashboard.
 *   2. Either grab the public product URL OR create a dedicated Checkout Link
 *      under Polar → Products → Checkout Links.
 *   3. Set NEXT_PUBLIC_POLAR_HOBBY_URL and NEXT_PUBLIC_POLAR_PRO_URL.
 */
const HOBBY_FALLBACK_MAILTO =
  "mailto:team@aiinfradecoded.com?subject=AgentForge%20Hobby%20%28%2499%29&body=Hi%2C%20I%27d%20like%20to%20buy%20the%20Hobby%20tier.%20Please%20send%20me%20the%20checkout%20link.";
const PRO_FALLBACK_MAILTO =
  "mailto:team@aiinfradecoded.com?subject=AgentForge%20Pro%20%28%24249%29&body=Hi%2C%20I%27d%20like%20to%20buy%20the%20Pro%20tier.%20Please%20send%20me%20the%20checkout%20link.";

const POLAR_HOBBY_URL =
  process.env.NEXT_PUBLIC_POLAR_HOBBY_URL ?? HOBBY_FALLBACK_MAILTO;
const POLAR_PRO_URL =
  process.env.NEXT_PUBLIC_POLAR_PRO_URL ?? PRO_FALLBACK_MAILTO;

// MCP Anvil checkout URLs. Same env-var pattern as the AgentForge tiers
// above so the page never has a dead link. /mcp-anvil#pricing is the
// canonical product page; this page just surfaces a quick pick.
const MCPANVIL_PERSONAL_URL =
  process.env.NEXT_PUBLIC_POLAR_MCPANVIL_PERSONAL_URL ||
  "mailto:hello@aiinfradecoded.com?subject=MCP%20Anvil%20Personal%20(%2429)";
const MCPANVIL_TEAM_URL =
  process.env.NEXT_PUBLIC_POLAR_MCPANVIL_TEAM_URL ||
  "mailto:hello@aiinfradecoded.com?subject=MCP%20Anvil%20Team%20(%2499)";

const isPolarUrl = (url: string) => url.startsWith("http");
const HOBBY_CTA_LABEL = isPolarUrl(POLAR_HOBBY_URL) ? "Buy Hobby — $99" : "Email to buy";
const PRO_CTA_LABEL = isPolarUrl(POLAR_PRO_URL) ? "Buy Pro — $249" : "Email to buy";

interface Tier {
  name: string;
  price: string;
  cadence: string;
  tagline: string;
  features: string[];
  cta: string;
  ctaHref: string;
  /** When true, the CTA renders with a Polar trust signal underneath. */
  hasPolarCheckout?: boolean;
  highlighted?: boolean;
  fitFor: string;
}

const TIERS: Tier[] = [
  {
    name: "Hobby",
    price: "$99",
    cadence: "one-time",
    tagline: "The full kit. One developer, unlimited side projects.",
    features: [
      "FastAPI + Next.js 15 source",
      "1-command install & uninstall wizards",
      "Multi-turn chat + streaming SSE",
      "RAG: vector × trigram hybrid search",
      "LiteLLM tier router with frontier fallback",
      "pgvector schema + Docker Compose stack",
      "Pytest harness with unit + integration tiers",
      "Architecture documentation",
    ],
    cta: HOBBY_CTA_LABEL,
    ctaHref: POLAR_HOBBY_URL,
    hasPolarCheckout: isPolarUrl(POLAR_HOBBY_URL),
    fitFor: "Solo developer. Unlimited internal projects + paid client work.",
  },
  {
    name: "Pro",
    price: "$249",
    cadence: "one-time",
    tagline: "Everything in Hobby, plus deploy templates and priority updates.",
    features: [
      "Everything in Hobby",
      "Hetzner / Vercel / Fly.io deploy templates",
      "Stripe + Polar webhook implementations",
      "Clerk JWKS production verification",
      "Rate-limiting middleware (per-plan)",
      "1-year of updates on the main branch",
      "Private community access",
    ],
    cta: PRO_CTA_LABEL,
    ctaHref: POLAR_PRO_URL,
    hasPolarCheckout: isPolarUrl(POLAR_PRO_URL),
    highlighted: true,
    fitFor: "Indie founder shipping the kit as part of a paid SaaS or client work.",
  },
  {
    name: "Team",
    price: "Contact",
    cadence: "—",
    tagline: "Multi-developer license + priority support.",
    features: [
      "Everything in Pro",
      "Up to 5 developers per team",
      "Priority email support (24h response)",
      "Custom modifications-as-service available",
      "Quarterly office hours",
    ],
    cta: "Email us",
    ctaHref: "mailto:team@aiinfradecoded.com?subject=AgentForge%20Team%20License",
    fitFor: "Agencies and small teams shipping multiple AI products on this base.",
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Is this a SaaS subscription or a one-time purchase?",
    a: "One-time purchase. Hobby = $99 once, Pro = $249 once. The Pro tier includes 1 year of updates on the main branch; after that you keep what you have, but new releases are a separate purchase.",
  },
  {
    q: "Whose API keys does it use? Will I pay per token?",
    a: "Your keys. AgentForge plugs into whichever API key you already have (Anthropic, OpenAI, or Gemini) and the bill goes from your provider directly to you. Our keys are never in the loop. If you'd rather skip API keys entirely, the same code path runs keyless against Ollama or vLLM on your own hardware.",
  },
  {
    q: "Can I use this for paid client work?",
    a: "Yes. Both tiers include unlimited use in paid client projects under the source-available commercial license. The only restriction: you can't resell the unmodified kit itself. See LICENSE.md.",
  },
  {
    q: "What's actually NOT in v1?",
    a: "Production-grade Clerk JWKS verification, Stripe/Polar webhook entitlements, settings page, mobile dashboard layout, rate limiting, deploy templates beyond docker-compose. Pro tier closes most of these. We're explicit about it on the landing page so you know what you're buying time for.",
  },
  {
    q: "Why is Pro $249?",
    a: "It includes the production-readiness items (real auth, real billing, deploy templates, rate limiting) that take 1-2 weeks to build right. The price reflects the time saved, not the lines of code.",
  },
  {
    q: "Updates after purchase?",
    a: "Hobby: bug fixes for 90 days post-purchase. Pro: 1 year of updates on the main branch. Major-version upgrades are a separate purchase at a discount for existing customers.",
  },
];

const FEATURE_MATRIX: { label: string; hobby: boolean | string; pro: boolean | string; team: boolean | string }[] = [
  { label: "FastAPI + Next.js 15 source code", hobby: true, pro: true, team: true },
  { label: "Install + uninstall wizards", hobby: true, pro: true, team: true },
  { label: "Multi-turn streaming chat", hobby: true, pro: true, team: true },
  { label: "Hybrid RAG (vector + trigram)", hobby: true, pro: true, team: true },
  { label: "Eval harness", hobby: true, pro: true, team: true },
  { label: "Docker Compose local stack", hobby: true, pro: true, team: true },
  { label: "Production Clerk JWKS verification", hobby: false, pro: true, team: true },
  { label: "Stripe + Polar webhook implementations", hobby: false, pro: true, team: true },
  { label: "Rate limiting middleware", hobby: false, pro: true, team: true },
  { label: "Hetzner / Vercel / Fly.io deploy templates", hobby: false, pro: true, team: true },
  { label: "Updates duration", hobby: "90 days", pro: "1 year", team: "1 year" },
  { label: "Developer seats", hobby: "1", pro: "1", team: "Up to 5" },
  { label: "Priority email support", hobby: false, pro: false, team: true },
  { label: "Quarterly office hours", hobby: false, pro: false, team: true },
];

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero — umbrella for both products' pricing. Concise; the
            individual product sections below carry their own pitch. */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden />
          <Container size="md" className="relative pt-20 pb-12 text-center">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400">
              Pricing
            </span>
            <h1 className="mt-3 text-balance font-serif text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              Buy once. Own the stack.
            </h1>
            <p className="mt-5 text-pretty text-lg text-zinc-400">
              Two products, one philosophy. Pay once, install on your machine,
              no subscription. Bring your own API keys, or run keyless on
              Ollama / vLLM.
            </p>
            <ul className="mx-auto mt-7 inline-flex max-w-2xl flex-wrap justify-center gap-x-7 gap-y-2 text-xs text-zinc-500">
              <li className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-400" strokeWidth={2.5} />
                Bring your own API keys
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-400" strokeWidth={2.5} />
                Or run keyless on Ollama / vLLM
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-400" strokeWidth={2.5} />
                You own the source
              </li>
            </ul>
          </Container>
        </section>

        {/* MCP Anvil pricing — flagship, comes first. Two tiers
            (Personal / Team) matching the /mcp-anvil page, centered
            within the lg container so the pair sits visually balanced. */}
        <Container size="lg" className="pb-12">
          <div className="mb-8 flex items-baseline justify-between border-b border-zinc-800/60 pb-3">
            <div>
              <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-cyan-400">
                Flagship
              </span>
              <h2 className="mt-1 font-serif text-2xl font-semibold tracking-tight text-zinc-100">
                MCP Anvil
              </h2>
            </div>
            <Link
              href="/mcp-anvil"
              className="text-xs text-cyan-300 hover:text-cyan-200"
            >
              Full product page →
            </Link>
          </div>
          <p className="mx-auto mb-10 max-w-2xl text-center text-sm text-zinc-400">
            Local MCP daemon, browser dashboard, 64 built-in tools, and a CLI.
            Import existing servers from Claude Desktop / Code / Cursor with
            one click.
          </p>
          <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
            {/* Personal */}
            <article className="relative flex flex-col rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-cyan-500/[0.06] via-zinc-950 to-zinc-950 p-7 accent-glow">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-cyan-300">
                Most popular
              </span>
              <header>
                <h3 className="font-serif text-xl font-semibold tracking-tight">Personal</h3>
                <p className="mt-1.5 text-sm text-zinc-400">
                  Daemon + dashboard + all 64 tools + CLI.
                </p>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold tracking-tight text-zinc-50">$29</span>
                  <span className="text-sm text-zinc-500">one-time</span>
                </div>
                <p className="mt-2 text-xs text-zinc-500">1 developer · 1 year of updates.</p>
              </header>
              <ul className="my-6 space-y-2.5 text-sm text-zinc-300">
                {[
                  "Full daemon + dashboard",
                  "64 built-in tools, every category",
                  "Import from Claude Desktop / Code / Cursor",
                  "Template bundle export / import",
                  "21-rule audit + live inspect",
                  "MCP router for Claude integration",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" strokeWidth={2.5} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <a
                  href={MCPANVIL_PERSONAL_URL}
                  className="block w-full rounded-lg bg-cyan-500 px-4 py-2.5 text-center text-sm font-semibold text-zinc-950 transition hover:bg-cyan-400"
                >
                  Get personal — $29
                </a>
                <p className="mt-2 text-center text-[11px] text-zinc-500">
                  Secure checkout via <span className="underline">Polar</span> · instant access
                </p>
              </div>
            </article>

            {/* Team — extra value pitch: more tools, team-built features. */}
            <article className="relative flex flex-col rounded-2xl border border-zinc-800/50 bg-zinc-900/40 p-7 hover:border-zinc-700 transition">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-zinc-300">
                Best value
              </span>
              <header>
                <h3 className="font-serif text-xl font-semibold tracking-tight">Team</h3>
                <p className="mt-1.5 text-sm text-zinc-400">
                  Everything in Personal, plus team tooling + roadmap influence.
                </p>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold tracking-tight text-zinc-50">$99</span>
                  <span className="text-sm text-zinc-500">one-time</span>
                </div>
                <p className="mt-2 text-xs text-zinc-500">Up to 5 developers · 1 year of updates.</p>
              </header>
              <ul className="my-6 space-y-2.5 text-sm text-zinc-300">
                {[
                  "Everything in Personal",
                  "5 developer seats — one license file covers your team",
                  "Team-only tools (multi-user history, shared templates, audit log)",
                  "Priority audit-rule + built-in-tool additions",
                  "Direct email support — real reply within 1 business day",
                  "Vote on the v0.3+ roadmap",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-zinc-300" strokeWidth={2.5} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <a
                  href={MCPANVIL_TEAM_URL}
                  className="block w-full rounded-lg border border-zinc-700 bg-zinc-925 px-4 py-2.5 text-center text-sm font-medium text-zinc-100 transition hover:border-zinc-600 hover:bg-zinc-900"
                >
                  Get team — $99
                </a>
                <p className="mt-2 text-center text-[11px] text-zinc-500">
                  Secure checkout via <span className="underline">Polar</span> · instant access
                </p>
              </div>
            </article>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[11.5px] text-zinc-500">
            Team-only features ship as we hit subscriber milestones. Multi-user history, shared templates, and audit log are the first three on deck — buying Team puts your vote at the front of the queue.
          </p>
        </Container>

        {/* AgentForge pricing — secondary product. */}
        <Container size="lg" className="pb-20">
          <div className="mb-8 flex items-baseline justify-between border-b border-zinc-800/60 pb-3">
            <div>
              <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Agent stack
              </span>
              <h2 className="mt-1 font-serif text-2xl font-semibold tracking-tight text-zinc-100">
                AgentForge
              </h2>
            </div>
            <Link
              href="/agentforge"
              className="text-xs text-cyan-300 hover:text-cyan-200"
            >
              Full product page →
            </Link>
          </div>
          <p className="mb-8 max-w-2xl text-sm text-zinc-400">
            The source-available production stack. FastAPI + Next.js 15 + pgvector.
            Tier-routed LLM, multi-turn streaming, hybrid RAG, eval harness, billing.
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            {TIERS.map((tier) => (
              <article
                key={tier.name}
                className={`relative flex flex-col rounded-2xl p-7 transition ${
                  tier.highlighted
                    ? "border border-cyan-500/40 bg-gradient-to-br from-cyan-500/8 via-zinc-950 to-zinc-950 accent-glow"
                    : "border border-zinc-800/50 bg-zinc-900/40 hover:border-zinc-700"
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-cyan-300">
                    Most popular
                  </span>
                )}
                <header>
                  <h2 className="font-serif text-xl font-semibold tracking-tight">{tier.name}</h2>
                  <p className="mt-1.5 text-sm text-zinc-400">{tier.tagline}</p>
                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="text-4xl font-semibold tracking-tight text-zinc-50">
                      {tier.price}
                    </span>
                    <span className="text-sm text-zinc-500">{tier.cadence}</span>
                  </div>
                  <p className="mt-2 text-xs text-zinc-500">{tier.fitFor}</p>
                </header>

                <ul className="my-6 space-y-2.5 text-sm text-zinc-300">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          tier.highlighted ? "text-cyan-400" : "text-zinc-500"
                        }`}
                        strokeWidth={2.5}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <a
                    href={tier.ctaHref}
                    className={`block w-full rounded-lg px-4 py-2.5 text-center text-sm font-medium transition ${
                      tier.highlighted
                        ? "bg-zinc-100 text-zinc-950 hover:bg-white"
                        : "border border-zinc-800/50 bg-zinc-950 text-zinc-100 hover:border-zinc-700 hover:bg-zinc-900"
                    }`}
                  >
                    {tier.cta}
                  </a>
                  {tier.hasPolarCheckout && (
                    <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-zinc-500">
                      <Lock className="h-3 w-3" strokeWidth={2} />
                      <span>
                        Secure checkout via{" "}
                        <span className="font-medium text-zinc-300">Polar</span>
                        <span className="hidden sm:inline"> · instant access on payment</span>
                      </span>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-zinc-500">
            Polar handles all VAT, GST, and US sales tax compliance as the merchant
            of record. Receipts arrive instantly. Questions? Email{" "}
            <a
              href="mailto:team@aiinfradecoded.com"
              className="text-zinc-300 hover:text-zinc-100"
            >
              team@aiinfradecoded.com
            </a>
            .
          </p>
        </Container>

        {/* Feature comparison */}
        <Container size="md" className="pb-20">
          <h2 className="font-serif text-2xl font-semibold tracking-tight">Compare tiers</h2>
          <div className="mt-6 overflow-hidden rounded-xl border border-zinc-800/50">
            <table className="w-full text-sm">
              <thead className="bg-zinc-900/60 text-zinc-400">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Feature</th>
                  <th className="px-4 py-3 text-center font-medium">Hobby</th>
                  <th className="px-4 py-3 text-center font-medium text-cyan-300">Pro</th>
                  <th className="px-4 py-3 text-center font-medium">Team</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {FEATURE_MATRIX.map((row) => (
                  <tr key={row.label} className="text-zinc-300">
                    <td className="px-4 py-3">{row.label}</td>
                    <Cell value={row.hobby} />
                    <Cell value={row.pro} accent />
                    <Cell value={row.team} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>

        {/* FAQ */}
        <Container size="md" className="pb-20">
          <h2 className="font-serif text-2xl font-semibold tracking-tight">FAQ</h2>
          <div className="mt-6 grid gap-3">
            {FAQ.map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-xl border border-zinc-800/50 bg-zinc-900/40 transition hover:border-zinc-700"
              >
                <summary className="cursor-pointer list-none px-5 py-4 text-sm font-medium text-zinc-100 [&::-webkit-details-marker]:hidden">
                  <div className="flex items-start justify-between gap-3">
                    <span>{q}</span>
                    <span className="font-mono text-zinc-500 transition group-open:rotate-45">
                      +
                    </span>
                  </div>
                </summary>
                <div className="border-t border-zinc-800/50 px-5 pb-4 pt-4 text-sm leading-relaxed text-zinc-400">
                  {a}
                </div>
              </details>
            ))}
          </div>
        </Container>

        {/* Final CTA */}
        <Container size="sm" className="pb-24 text-center">
          <h2 className="text-balance font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
            Still on the fence? Try the live demo.
          </h2>
          <p className="mt-3 text-zinc-400">
            Scripted preview of the streaming chat + markdown rendering. No sign-up. See the actual UI before deciding.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/demo"
              className="rounded-lg bg-zinc-100 px-5 py-3 text-sm font-medium text-zinc-950 hover:bg-white"
            >
              Open the demo
            </Link>
            <a
              href="mailto:team@aiinfradecoded.com"
              className="rounded-lg border border-zinc-800 bg-zinc-900/60 px-5 py-3 text-sm font-medium text-zinc-100 hover:border-zinc-700 hover:bg-zinc-900"
            >
              Email me a question
            </a>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

function Cell({ value, accent }: { value: boolean | string; accent?: boolean }) {
  if (typeof value === "string") {
    return (
      <td className={`px-4 py-3 text-center ${accent ? "text-cyan-300" : "text-zinc-300"}`}>
        {value}
      </td>
    );
  }
  return (
    <td className="px-4 py-3 text-center">
      {value ? (
        <Check
          className={`mx-auto h-4 w-4 ${accent ? "text-cyan-400" : "text-zinc-300"}`}
          strokeWidth={2.5}
        />
      ) : (
        <Minus className="mx-auto h-4 w-4 text-zinc-700" strokeWidth={2.5} />
      )}
    </td>
  );
}
