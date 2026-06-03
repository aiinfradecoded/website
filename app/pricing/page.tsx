import { Check, Lock, Minus, Sparkles } from "lucide-react";
import Link from "next/link";

import { Container } from "@/app/_components/Container";
import { Footer } from "@/app/_components/Footer";
import { Nav } from "@/app/_components/Nav";

export const metadata = {
  title: "Pricing",
  description:
    "Pricing for AI Infra Decoded products. MCP Anvil ($29 / $99), Agent Forge ($49 / $149), or bundle both for $59 / $199.",
  alternates: { canonical: "/pricing" },
};

/**
 * Pricing page. Three concerns:
 *   1) MCP Anvil tiers ($29 personal / $99 team)
 *   2) Agent Forge tiers ($49 personal / $149 team)
 *   3) Bundle SKUs ($59 personal / $199 team)
 *
 * All checkout URLs come from Cloudflare env vars so they can be set
 * per environment without a deploy. Mailto fallbacks keep every CTA
 * functional during the period before the SKUs exist in Polar.
 */

// MCP Anvil
const MCPANVIL_PERSONAL_URL =
  process.env.NEXT_PUBLIC_POLAR_MCPANVIL_PERSONAL_URL ||
  "mailto:hello@aiinfradecoded.com?subject=MCP%20Anvil%20Personal%20(%2429)";
const MCPANVIL_TEAM_URL =
  process.env.NEXT_PUBLIC_POLAR_MCPANVIL_TEAM_URL ||
  "mailto:hello@aiinfradecoded.com?subject=MCP%20Anvil%20Team%20(%2499)";

// Agent Forge
const AGENTFORGE_PERSONAL_URL =
  process.env.NEXT_PUBLIC_POLAR_AGENTFORGE_PERSONAL_URL ||
  "mailto:hello@aiinfradecoded.com?subject=Agent%20Forge%20Personal%20(%2449)";
const AGENTFORGE_TEAM_URL =
  process.env.NEXT_PUBLIC_POLAR_AGENTFORGE_TEAM_URL ||
  "mailto:hello@aiinfradecoded.com?subject=Agent%20Forge%20Team%20(%24149)";

// Bundle (Anvil + Forge)
const BUNDLE_PERSONAL_URL =
  process.env.NEXT_PUBLIC_POLAR_BUNDLE_PERSONAL_URL ||
  "mailto:hello@aiinfradecoded.com?subject=Anvil%20%2B%20Forge%20Bundle%20Personal%20(%2459)";
const BUNDLE_TEAM_URL =
  process.env.NEXT_PUBLIC_POLAR_BUNDLE_TEAM_URL ||
  "mailto:hello@aiinfradecoded.com?subject=Anvil%20%2B%20Forge%20Bundle%20Team%20(%24199)";

const FAQ: { q: string; a: string }[] = [
  {
    q: "Is this a SaaS subscription or a one-time purchase?",
    a: "One-time. Pay once, install on your machine, no recurring billing. Each tier includes 1 year of updates on the main branch. After that you keep what you have; new major releases are a separate purchase.",
  },
  {
    q: "Why is there a bundle?",
    a: "MCP Anvil hosts tools. Agent Forge wields them. Most buyers want both. The bundle is priced so it's the obvious move — save $19 on personal, $49 on team — but each product still works standalone if you don't need the pairing.",
  },
  {
    q: "MCP Anvil is closed binary. Agent Forge is source-available. Why?",
    a: "Different threat models. MCP Anvil's value is the audit + integrations + dashboard — buyers want the binary, not the rule lists. Agent Forge runs autonomous code against your filesystem and shell, so you should be able to audit the loop. Source-available means you read it, fork it, and modify it under the commercial license.",
  },
  {
    q: "Whose API keys?",
    a: "Yours. Both products plug into whichever API key you have (Anthropic, OpenAI, Gemini) and the LLM bill goes from your provider directly to you. Our keys are never in the loop. Skip API keys entirely with Ollama or vLLM on your own hardware.",
  },
  {
    q: "Can I use this for paid client work?",
    a: "Yes. Every tier includes unlimited use in paid client projects under the commercial license. The only restriction: you can't resell the unmodified product itself as a competing offering.",
  },
  {
    q: "Multi-developer license?",
    a: "Personal covers one developer. Team adds 4 more seats — one license file covers your whole team of up to 5. Bigger team? Contact us — we'll write a quote.",
  },
  {
    q: "Updates after purchase?",
    a: "1 year of updates on the main branch for every tier. Bug fixes ship as patches into the same branch; minor releases (v0.2 → v0.3) too. Major-version upgrades are a separate purchase at a discount for existing customers.",
  },
];

// Anvil-vs-Forge feature comparison. Replaces the old Hobby/Pro/Team
// matrix; the question buyers now ask is "which product solves my
// problem?" not "which AgentForge tier?"
const COMPARE: {
  label: string;
  anvil: boolean | string;
  forge: boolean | string;
}[] = [
  { label: "Local daemon / runtime", anvil: true, forge: true },
  { label: "Browser dashboard", anvil: true, forge: true },
  { label: "CLI included", anvil: true, forge: true },
  { label: "Source available", anvil: false, forge: true },
  { label: "64 built-in tools", anvil: true, forge: false },
  { label: "Custom-tool builder", anvil: true, forge: false },
  { label: "Import from Claude Desktop / Code / Cursor", anvil: true, forge: false },
  { label: "Template bundle export / import", anvil: true, forge: false },
  { label: "21-rule audit + live inspect", anvil: true, forge: false },
  { label: "Define agents in dashboard", anvil: false, forge: true },
  { label: "Multi-agent orchestration", anvil: false, forge: true },
  { label: "Eval harness + CI gate", anvil: false, forge: true },
  { label: "Span-based agent tracing", anvil: false, forge: true },
  { label: "Pairs with MCP Anvil's tool catalog", anvil: "—", forge: true },
  { label: "Works against any MCP server", anvil: "—", forge: true },
];

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
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
                Local-first, no telemetry
              </li>
            </ul>
          </Container>
        </section>

        {/* Bundle hero — surfaced first because it's the recommended path */}
        <section id="bundle" className="py-4">
          <Container size="lg">
            <div className="mx-auto max-w-4xl rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-cyan-500/[0.10] via-zinc-950 to-zinc-950 p-7 sm:p-9 accent-glow">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-cyan-500/20 pb-4">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-cyan-500/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-cyan-300">
                    Recommended
                  </span>
                  <h2 className="font-serif text-2xl font-semibold tracking-tight text-zinc-100">
                    Anvil + Forge bundle
                  </h2>
                </div>
                <p className="text-xs text-cyan-300">
                  MCP Anvil + Agent Forge · one license, both products
                </p>
              </div>
              <p className="mt-5 max-w-2xl text-sm text-zinc-400">
                MCP Anvil hosts the tools. Agent Forge wields them. Together
                they form the local AI dev workbench. The bundle is the
                intended way to buy if you&apos;re building agents — and it
                saves $19 on personal, $49 on team versus buying each
                product individually.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/[0.04] p-5">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-cyan-300">
                    Personal bundle
                  </div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-4xl font-semibold tracking-tight text-zinc-50">$59</span>
                    <span className="text-sm text-zinc-500 line-through">$78</span>
                    <span className="text-xs text-cyan-300">save $19</span>
                  </div>
                  <p className="mt-2 text-xs text-zinc-500">
                    1 developer · 1 year of updates · both products
                  </p>
                  <Link
                    href={BUNDLE_PERSONAL_URL}
                    className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-400"
                  >
                    Bundle personal — $59
                  </Link>
                </div>
                <div className="rounded-lg border border-zinc-700 bg-zinc-925 p-5">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-zinc-300">
                    Team bundle
                  </div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-4xl font-semibold tracking-tight text-zinc-50">$199</span>
                    <span className="text-sm text-zinc-500 line-through">$248</span>
                    <span className="text-xs text-zinc-300">save $49</span>
                  </div>
                  <p className="mt-2 text-xs text-zinc-500">
                    Up to 5 developers · 1 year of updates · both products
                  </p>
                  <Link
                    href={BUNDLE_TEAM_URL}
                    className="mt-4 inline-flex w-full items-center justify-center rounded-lg border border-zinc-700 bg-zinc-925 px-4 py-2.5 text-sm font-semibold text-zinc-100 transition hover:border-zinc-600 hover:bg-zinc-900"
                  >
                    Bundle team — $199
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* MCP Anvil — flagship product */}
        <section id="mcp-anvil" className="pt-12">
          <Container size="lg">
            <div className="mb-8 flex items-baseline justify-between border-b border-zinc-800/60 pb-3">
              <div>
                <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-cyan-400">
                  Flagship · sold standalone
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
              Local MCP daemon, browser dashboard, 64 built-in tools, and a
              CLI. Import existing servers from Claude Desktop / Code / Cursor
              with one click.
            </p>
            <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
              <Tier
                name="Personal"
                pill="Most popular"
                pillStyle="cyan"
                price="$29"
                tagline="Daemon + dashboard + all 64 tools + CLI."
                fitFor="1 developer · 1 year of updates."
                features={[
                  "Full daemon + dashboard",
                  "64 built-in tools, every category",
                  "Import from Claude Desktop / Code / Cursor",
                  "Template bundle export / import",
                  "21-rule audit + live inspect",
                  "MCP router for Claude integration",
                ]}
                cta="Get personal — $29"
                ctaHref={MCPANVIL_PERSONAL_URL}
                ctaStyle="primary"
              />
              <Tier
                name="Team"
                pill="Best value"
                pillStyle="zinc"
                price="$99"
                tagline="Everything in Personal, plus team tooling + roadmap influence."
                fitFor="Up to 5 developers · 1 year of updates."
                features={[
                  "Everything in Personal",
                  "5 developer seats — one license, your team",
                  "Team-only tools (multi-user history, shared templates, audit log)",
                  "Priority audit-rule + built-in-tool additions",
                  "Direct email support — 1 business day",
                  "Vote on the v0.3+ roadmap",
                ]}
                cta="Get team — $99"
                ctaHref={MCPANVIL_TEAM_URL}
                ctaStyle="secondary"
              />
            </div>
          </Container>
        </section>

        {/* Agent Forge — secondary product, source-available */}
        <section id="agent-forge" className="pt-16 pb-12">
          <Container size="lg">
            <div className="mb-8 flex items-baseline justify-between border-b border-zinc-800/60 pb-3">
              <div>
                <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-cyan-400">
                  Sold standalone · pairs with MCP Anvil
                </span>
                <h2 className="mt-1 font-serif text-2xl font-semibold tracking-tight text-zinc-100">
                  Agent Forge
                </h2>
              </div>
              <Link
                href="/agentforge"
                className="text-xs text-cyan-300 hover:text-cyan-200"
              >
                Full product page →
              </Link>
            </div>
            <p className="mx-auto mb-10 max-w-2xl text-center text-sm text-zinc-400">
              The local agent workbench. Define agents in the dashboard, wire
              them to MCP Anvil&apos;s tool catalog, run them as chat
              endpoints, eval them before you deploy. Source-available.
            </p>
            <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
              <Tier
                name="Personal"
                pill="Most popular"
                pillStyle="cyan"
                price="$49"
                tagline="Full Agent Forge source + commercial license."
                fitFor="1 developer · 1 year of updates."
                features={[
                  "Agent runtime + dashboard + CLI",
                  "Multi-agent orchestration",
                  "Eval harness + CI gate",
                  "Span-based local tracing",
                  "Source available · audit + fork freely",
                  "Unlimited internal + paid client work",
                ]}
                cta="Get personal — $49"
                ctaHref={AGENTFORGE_PERSONAL_URL}
                ctaStyle="primary"
              />
              <Tier
                name="Team"
                pill="Best value"
                pillStyle="zinc"
                price="$149"
                tagline="Everything in Personal, plus production patterns + roadmap influence."
                fitFor="Up to 5 developers · 1 year of updates."
                features={[
                  "5 developer seats — one license, your team",
                  "Production deploy patterns (auth, billing, multi-tenancy)",
                  "Priority feature requests",
                  "Direct email support — 1 business day",
                  "Vote on the v0.x roadmap",
                ]}
                cta="Get team — $149"
                ctaHref={AGENTFORGE_TEAM_URL}
                ctaStyle="secondary"
              />
            </div>
          </Container>
        </section>

        {/* Compare — which product for which job */}
        <section className="py-12">
          <Container size="md">
            <h2 className="font-serif text-2xl font-semibold tracking-tight">Compare</h2>
            <p className="mt-2 text-sm text-zinc-400">
              The two products solve different problems but share a buyer.
              This table is the quick answer to &quot;which one do I need?&quot;
            </p>
            <div className="mt-7 overflow-x-auto rounded-2xl border border-zinc-800/50">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-zinc-800/50 bg-zinc-900/40">
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-widest text-zinc-500">
                      Capability
                    </th>
                    <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-widest text-cyan-300">
                      MCP Anvil
                    </th>
                    <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-widest text-cyan-300">
                      Agent Forge
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map((row, i) => (
                    <tr
                      key={row.label}
                      className={`border-b border-zinc-800/30 ${i % 2 === 1 ? "bg-zinc-900/20" : ""}`}
                    >
                      <td className="px-5 py-3 text-zinc-300">{row.label}</td>
                      <Cell value={row.anvil} accent />
                      <Cell value={row.forge} accent />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </section>

        {/* FAQ */}
        {/* FAQPage structured data — built from the same FAQ array rendered
            below, so the markup can never drift from the visible Q&A (Google
            requires structured-data answers to match on-page content). */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQ.map(({ q, a }) => ({
                "@type": "Question",
                name: q,
                acceptedAnswer: { "@type": "Answer", text: a },
              })),
            }),
          }}
        />
        <section className="surface-alt py-20">
          <Container size="md">
            <h2 className="font-serif text-2xl font-semibold tracking-tight">FAQ</h2>
            <dl className="mt-8 space-y-3">
              {FAQ.map(({ q, a }) => (
                <details
                  key={q}
                  className="group rounded-xl border border-zinc-800/50 bg-zinc-900/30 transition hover:border-zinc-700"
                >
                  <summary className="cursor-pointer list-none px-5 py-4 text-sm font-medium text-zinc-100 transition-colors hover:text-cyan-300 [&::-webkit-details-marker]:hidden">
                    <span className="mr-2 text-cyan-400 group-open:text-cyan-300">›</span>
                    {q}
                  </summary>
                  <div className="px-5 pb-5 text-sm leading-relaxed text-zinc-400">{a}</div>
                </details>
              ))}
            </dl>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-20">
          <Container size="md">
            <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/[0.06] via-zinc-950 to-zinc-950 p-10 text-center accent-glow">
              <Sparkles className="mx-auto h-10 w-10 text-cyan-400" strokeWidth={1.5} />
              <h2 className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Anvil for tools. Forge for agents.
              </h2>
              <p className="mt-4 mx-auto max-w-xl text-zinc-400">
                One bundle, both products, one local stack. Or pick the one
                that fits today and add the other later — licenses stack.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href={BUNDLE_PERSONAL_URL}
                  className="rounded-lg bg-cyan-500 px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-cyan-400"
                >
                  Bundle — $59
                </Link>
                <Link
                  href="/mcp-anvil"
                  className="rounded-lg border border-zinc-800 bg-zinc-900/60 px-5 py-3 text-sm font-medium text-zinc-100 hover:border-zinc-700 hover:bg-zinc-900"
                >
                  Just MCP Anvil
                </Link>
                <Link
                  href="/agentforge"
                  className="rounded-lg border border-zinc-800 bg-zinc-900/60 px-5 py-3 text-sm font-medium text-zinc-100 hover:border-zinc-700 hover:bg-zinc-900"
                >
                  Just Agent Forge
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

// ---- Reusable tier card -------------------------------------------------

function Tier({
  name,
  pill,
  pillStyle,
  price,
  tagline,
  fitFor,
  features,
  cta,
  ctaHref,
  ctaStyle,
}: {
  name: string;
  pill: string;
  pillStyle: "cyan" | "zinc";
  price: string;
  tagline: string;
  fitFor: string;
  features: string[];
  cta: string;
  ctaHref: string;
  ctaStyle: "primary" | "secondary";
}) {
  return (
    <article
      className={`relative flex flex-col rounded-2xl p-7 transition ${
        ctaStyle === "primary"
          ? "border border-cyan-500/40 bg-gradient-to-br from-cyan-500/[0.06] via-zinc-950 to-zinc-950 accent-glow"
          : "border border-zinc-700/70 bg-zinc-900/50"
      }`}
    >
      <span
        className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest ${
          pillStyle === "cyan"
            ? "border border-cyan-400/40 bg-cyan-500/10 text-cyan-300"
            : "border border-zinc-700 bg-zinc-900 text-zinc-300"
        }`}
      >
        {pill}
      </span>
      <header>
        <h3 className="font-serif text-xl font-semibold tracking-tight">{name}</h3>
        <p className="mt-1.5 text-sm text-zinc-400">{tagline}</p>
        <div className="mt-5 flex items-baseline gap-2">
          <span className="text-4xl font-semibold tracking-tight text-zinc-50">{price}</span>
          <span className="text-sm text-zinc-500">one-time</span>
        </div>
        <p className="mt-2 text-xs text-zinc-500">{fitFor}</p>
      </header>
      <ul className="my-6 space-y-2.5 text-sm text-zinc-300">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <Check
              className={`mt-0.5 h-4 w-4 shrink-0 ${
                ctaStyle === "primary" ? "text-cyan-400" : "text-zinc-300"
              }`}
              strokeWidth={2.5}
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        <a
          href={ctaHref}
          className={`block w-full rounded-lg px-4 py-2.5 text-center text-sm font-medium transition ${
            ctaStyle === "primary"
              ? "bg-cyan-500 font-semibold text-zinc-950 hover:bg-cyan-400"
              : "border border-zinc-700 bg-zinc-925 text-zinc-100 hover:border-zinc-600 hover:bg-zinc-900"
          }`}
        >
          {cta}
        </a>
        <p className="mt-2 text-center text-[11px] text-zinc-500">
          Secure checkout via <span className="underline">Polar</span> · instant access
        </p>
      </div>
    </article>
  );
}

function Cell({ value, accent }: { value: boolean | string; accent?: boolean }) {
  if (typeof value === "string") {
    return (
      <td className="px-5 py-3 text-center text-sm text-zinc-300">{value}</td>
    );
  }
  return (
    <td className="px-5 py-3 text-center">
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
