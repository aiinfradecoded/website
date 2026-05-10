import {
  ArrowUpRight,
  Boxes,
  CheckCircle2,
  CircuitBoard,
  Database,
  GitFork,
  Lock,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";

import { Container } from "@/app/_components/Container";
import { Footer } from "@/app/_components/Footer";
import { Logo } from "@/app/_components/Logo";
import { Nav } from "@/app/_components/Nav";
import { TerminalMock } from "@/app/_components/TerminalMock";

const FEATURES = [
  {
    icon: GitFork,
    title: "Tier-routed LLM",
    body:
      "LiteLLM router with three tiers and automatic fallback. Wire your own API keys (Anthropic, OpenAI, Gemini), or skip them entirely and run on Ollama or vLLM. Same code path. A frontier outage downgrades to local instead of throwing 500s at your customers.",
  },
  {
    icon: Zap,
    title: "Multi-turn streaming",
    body:
      "POST /chat/stream over SSE with meta / token / done / error events. User and assistant messages persist to your Postgres, so you can replay, audit, or fine-tune from production logs you own.",
  },
  {
    icon: Database,
    title: "Hybrid pgvector RAG",
    body:
      "Documents embed via the model of your choice: frontier (OpenAI text-embedding-3, Voyage) or local (Ollama nomic-embed-text). Search blends pgvector cosine with pg_trgm so semantic and exact matches surface together. No Pinecone, no Weaviate, no extra bill.",
  },
  {
    icon: ScrollText,
    title: "Eval harness with CI gate",
    body:
      "LLM-judge pattern with golden inputs persisted to eval_runs. pytest fails the build if pass rate drops more than 5%, so model regressions get caught before your customers see them.",
  },
  {
    icon: CircuitBoard,
    title: "Self-hosted observability",
    body:
      "Every LiteLLM call traces to a self-hosted Langfuse: cost, latency, model, conversation_id. Your prompts and outputs never leave your infra, which is what enterprise procurement actually wants to see.",
  },
  {
    icon: ShieldCheck,
    title: "Production-honest auth",
    body:
      "Clerk JWKS verification with 24h key cache. Stripe and Polar webhooks scaffolded with HMAC verification. Per-plan rate limiting via Postgres. Wire your environment, not your security model.",
  },
];

const TRUST_LOGOS = [
  { name: "FastAPI", version: "0.115" },
  { name: "Next.js", version: "15" },
  { name: "LiteLLM", version: "1.50+" },
  { name: "Postgres", version: "16 + pgvector" },
  { name: "Clerk", version: "6" },
  { name: "SQLAlchemy", version: "2" },
  { name: "Tailwind", version: "4" },
  { name: "pytest", version: "8" },
];

const AUDIENCES = [
  {
    icon: Sparkles,
    title: "Indie SaaS founders",
    body: "Skip the 1-2 weekends of plumbing every AI app needs. Ship the actual product.",
  },
  {
    icon: Zap,
    title: "Senior engineers tired of the OpenAI bill",
    body: "Same code path runs keyless on Ollama or vLLM. Drop a $300/mo bill to $0.",
  },
  {
    icon: GitFork,
    title: "Consultants shipping AI for clients",
    body: "A vetted base for every engagement. Commercial license covers unlimited paid work.",
  },
  {
    icon: ShieldCheck,
    title: "Teams owning their AI infra",
    body: "Source-available, fork-friendly, no telemetry, audit the whole stack end-to-end.",
  },
];

const BUILD_IT_YOURSELF = [
  "Clerk JWKS verification with caching — 1 weekend",
  "Multi-turn streaming chat over SSE — 1 weekend",
  "Hybrid pgvector + pg_trgm RAG — 1 weekend",
  "Polar/Stripe webhooks with idempotency — 1 weekend",
  "Per-plan rate limiting + observability — 1 weekend",
  "LLM-judge eval harness + CI gate — 1 weekend",
];

const STATS = [
  { value: "360+", label: "tests in the suite", note: "Unit + integration + edge case" },
  { value: "<90 min", label: "to deployed app", note: "From clone to first prompt" },
  { value: "$0", label: "infra cost in dev", note: "Local Ollama + Postgres" },
  { value: "Lifetime", label: "v1.x patches", note: "Bug fixes shipped into the same repo" },
];

const TRUST_PILLARS = [
  {
    icon: Lock,
    title: "Zero vendor lock-in",
    body:
      "Bring your own API keys (Anthropic, OpenAI, Gemini), or run keyless on Ollama / vLLM. Your infrastructure, your data, your control.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy-first by design",
    body:
      "No telemetry sent back to us. Your prompts, conversations, and customer data stay on the stack you deploy. Source-available, fully auditable.",
  },
  {
    icon: GitFork,
    title: "Patches, included",
    body:
      "Every fix and improvement ships into the same source repo. Pro tier adds 1 year of feature updates on the main branch.",
  },
];

export default function Home() {
  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden />
        <Container size="lg" className="relative pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)]">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs text-zinc-300">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                AgentForge v1.0 · production-ready
              </span>
              <h1 className="mt-6 text-balance font-serif text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
                Production AI infrastructure,{" "}
                <span className="bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent">
                  decoded.
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-zinc-400">
                A flagship boilerplate for senior engineers building real AI products.
                Bring whichever API keys you already have (Anthropic, OpenAI, Gemini),
                or run it keyless on Ollama or vLLM if you&apos;d rather not pay per
                token. Either way, you own the source.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link
                  href="/pricing"
                  className="cta-glow group inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-white"
                >
                  Get AgentForge
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-800/50 bg-zinc-900/40 px-5 py-3 text-sm font-medium text-zinc-100 transition hover:border-zinc-700 hover:bg-zinc-900"
                >
                  Try the live demo
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-zinc-500">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  Use your own API keys
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  Or run keyless on Ollama / vLLM
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  You own the source
                </span>
              </div>
            </div>

            <div className="lg:pl-6">
              <TerminalMock />
            </div>
          </div>
        </Container>
      </section>

      {/* Trust strip — stack badges */}
      <section className="surface-alt">
        <Container size="lg">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-6 text-sm text-zinc-500">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-600">
              Built on
            </span>
            {TRUST_LOGOS.map((item) => (
              <span key={item.name} className="flex items-baseline gap-1.5">
                <span className="text-zinc-300">{item.name}</span>
                <span className="font-mono text-[10px] text-zinc-600">{item.version}</span>
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* Who this is for — qualifying hook, above-the-fold-adjacent */}
      <section className="py-16 sm:py-20">
        <Container size="lg">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400">
              Who this is for
            </span>
            <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              If you&apos;ve been here before, you already know what this saves.
            </h2>
            <p className="mt-4 text-pretty text-zinc-400">
              Auth. Streaming. RAG. Billing. Eval. Observability. Six things every AI
              product needs before it&apos;s real. AgentForge ships all six wired and
              tested, so you spend your weekend on the part that actually differentiates.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {AUDIENCES.map(({ icon: Icon, title, body }) => (
              <article
                key={title}
                className="rounded-xl border border-zinc-800/50 bg-zinc-950/40 p-6"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800/50 bg-zinc-900 text-cyan-400">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 font-serif text-base font-semibold text-zinc-100">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats row */}
      <section className="py-16">
        <Container size="lg">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="border-l border-zinc-800/50 pl-5">
                <div className="font-serif text-3xl font-semibold tracking-tight text-zinc-100">
                  {s.value}
                </div>
                <div className="mt-1 text-sm font-medium text-zinc-300">{s.label}</div>
                <div className="mt-0.5 text-xs text-zinc-500">{s.note}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Value math — the cost comparison that justifies the price */}
      <section className="py-20 sm:py-24">
        <Container size="md">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400">
              The math
            </span>
            <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              Building this yourself: 6 weekends.
            </h2>
            <p className="mt-4 text-pretty text-zinc-400">
              Every AI product needs the same six production patterns. At typical
              senior rates, that&apos;s <span className="text-zinc-200">$4,000–$10,000</span>{" "}
              of your own time before your customer types their first prompt.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 p-7">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                <Database className="h-4 w-4" strokeWidth={1.75} />
                Build it yourself
              </div>
              <h3 className="mt-3 font-serif text-2xl font-semibold tracking-tight text-zinc-100">
                6 weekends of plumbing
              </h3>
              <ul className="mt-5 space-y-2.5 text-sm text-zinc-400">
                {BUILD_IT_YOURSELF.map((line) => (
                  <li key={line} className="flex items-start gap-2.5">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-700" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-zinc-800/60 pt-5">
                <div className="font-serif text-3xl font-semibold tracking-tight text-zinc-100">
                  $4,000–$10,000
                </div>
                <div className="mt-1 text-xs text-zinc-500">
                  Your own time, before any customer revenue
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/[0.05] via-zinc-950 to-zinc-950 p-7 accent-glow">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-400">
                <Sparkles className="h-4 w-4" strokeWidth={1.75} />
                Buy AgentForge
              </div>
              <h3 className="mt-3 font-serif text-2xl font-semibold tracking-tight text-zinc-100">
                90 minutes, source delivered
              </h3>
              <ul className="mt-5 space-y-2.5 text-sm text-zinc-300">
                {[
                  "All six patterns wired and tested across 360+ tests",
                  "Full source under a commercial license — fork freely",
                  "Bring your own keys, or keyless on Ollama / vLLM",
                  "No subscription, no per-seat fees, no API keys of ours",
                  "Run on your infra — Hetzner, your laptop, Cloudflare Tunnel",
                  "Pro adds production-readiness + 1 year of updates",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400"
                      strokeWidth={2.25}
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-cyan-500/20 pt-5">
                <div className="font-serif text-3xl font-semibold tracking-tight text-zinc-100">
                  $99 <span className="text-zinc-500">or</span> $249
                  <span className="ml-2 text-base font-normal text-zinc-500">once</span>
                </div>
                <div className="mt-1 text-xs text-zinc-500">
                  98–99% off the build-it-yourself number
                </div>
              </div>
              <Link
                href="/pricing"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-100 px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-white"
              >
                See pricing
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Features grid */}
      <section className="surface-alt py-20 sm:py-28">
        <Container size="lg">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400">
              What's wired
            </span>
            <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              Six things every senior dev wires by hand.
            </h2>
            <p className="mt-4 text-pretty text-zinc-400">
              We did them already, with the stack you'd pick anyway.
            </p>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-zinc-800/40 bg-zinc-800/40 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <article
                key={title}
                className="group relative bg-[var(--color-bg)] p-6 transition hover:bg-white/[0.012]"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800/50 bg-zinc-950 text-cyan-400 transition group-hover:border-cyan-500/40 group-hover:text-cyan-300">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="font-serif text-lg font-semibold text-zinc-100">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Founder / about strip */}
      <section className="py-20 sm:py-24">
        <Container size="md">
          <div className="rounded-2xl border border-zinc-800/50 bg-gradient-to-br from-zinc-900/60 to-zinc-950 p-8 sm:p-10">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-cyan-400">
              <span className="h-px w-6 bg-cyan-500/40" />
              About AI Infra Decoded
            </div>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              Built by engineers who got fed up.
            </h2>
            <p className="mt-4 max-w-2xl text-zinc-400">
              AI Infra Decoded came out of one specific frustration. We got tired of
              stitching production AI together from blog posts and starter kits that
              hid the hard parts behind a roadmap. AgentForge is what we built instead:
              tier-routed LLM with your own API keys, real RAG, honest observability,
              and a billing path that doesn&apos;t break in production.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-sm font-medium text-zinc-100 hover:border-zinc-700 hover:bg-zinc-900"
              >
                Read the story
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <a
                href="https://aiinfradecoded.beehiiv.com"
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-zinc-300 hover:text-zinc-100"
              >
                Read the newsletter
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="surface-alt py-20 sm:py-24">
        <Container size="md">
          <div className="text-center">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400">
              From clone to deployed
            </span>
            <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              Three commands. No build-tool fights.
            </h2>
          </div>
          <ol className="mt-14 space-y-6">
            {[
              {
                num: "01",
                title: "Clone the repo",
                cmd: "git clone https://github.com/aiinfradecoded/agentforge-starter && cd agentforge-starter",
                body: "Source-available repo, yours under a single-LLC commercial license. Customize without restriction.",
              },
              {
                num: "02",
                title: "Bring up the stack",
                cmd: "docker compose up -d  # postgres + pgvector + ollama",
                body: "Postgres 16 + pgvector + your local LLM via Ollama. No cloud signup required to develop.",
              },
              {
                num: "03",
                title: "Backend + frontend",
                cmd: "make dev  # uvicorn + next dev, both watching",
                body: "Backend on :8000, frontend on :3000. Sign up via Clerk and start chatting in 90 seconds.",
              },
            ].map((step) => (
              <li
                key={step.num}
                className="grid gap-4 rounded-xl border border-zinc-800/50 bg-zinc-900/40 p-6 sm:grid-cols-[80px_minmax(0,1fr)] sm:items-center"
              >
                <span className="font-mono text-3xl font-semibold text-cyan-400/70 sm:text-2xl">
                  {step.num}
                </span>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-zinc-100">{step.title}</h3>
                  <pre className="codeblock mt-2">{step.cmd}</pre>
                  <p className="mt-2 text-sm text-zinc-400">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* From the maker — brand anchor + trust pillars */}
      <section className="surface-alt py-20 sm:py-24">
        <Container size="md">
          <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/[0.04] via-zinc-950 to-zinc-950 p-8 sm:p-12 accent-glow">
            <div className="flex items-center gap-3">
              <Logo size={48} />
              <div>
                <h3 className="font-serif text-xl font-semibold tracking-tight text-zinc-100">
                  AI Infra Decoded
                </h3>
                <p className="mt-0.5 text-[11px] uppercase tracking-widest text-zinc-500">
                  Atlanta · est. 2026
                </p>
              </div>
            </div>

            <h2 className="mt-10 text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              Built like infrastructure you&apos;d ship yourself.
            </h2>
            <p className="mt-4 max-w-2xl text-pretty text-zinc-400">
              AgentForge is what we put in front of our own production traffic. Same code
              path, same tests, same observability — packaged so a senior engineer can have
              it running on their own infra inside an afternoon.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {TRUST_PILLARS.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="rounded-xl border border-zinc-800/50 bg-zinc-950/40 p-6"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800/50 bg-zinc-900 text-cyan-400">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 font-serif text-base font-semibold text-zinc-100">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <Container size="md">
          <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 via-zinc-950 to-zinc-950 p-10 text-center accent-glow">
            <div className="mx-auto max-w-2xl">
              <Boxes className="mx-auto h-10 w-10 text-cyan-400" strokeWidth={1.5} />
              <h2 className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Skip the boilerplate. Own the stack.
              </h2>
              <p className="mt-4 text-pretty text-zinc-400">
                You buy once, you get the source, and you run it on your infrastructure
                with your own API keys. Or none at all: AgentForge is compatible with
                Ollama and vLLM if you&apos;d rather skip per-token costs. No
                subscriptions, no per-seat fees, no API keys of ours in the loop. Try
                the live demo first if you want to kick the tires.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/pricing"
                  className="rounded-lg bg-zinc-100 px-5 py-3 text-sm font-medium text-zinc-950 hover:bg-white"
                >
                  Get AgentForge
                </Link>
                <Link
                  href="/demo"
                  className="rounded-lg border border-zinc-800 bg-zinc-900/60 px-5 py-3 text-sm font-medium text-zinc-100 hover:border-zinc-700 hover:bg-zinc-900"
                >
                  Try the live demo
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}
