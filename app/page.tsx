import {
  ArrowUpRight,
  Boxes,
  CheckCircle2,
  CircuitBoard,
  Database,
  GitFork,
  Globe,
  Layers,
  Lock,
  Server,
  Shield,
  ShieldCheck,
  Sparkles,
  Terminal,
  Wrench,
  Zap,
} from "lucide-react";
import Link from "next/link";

import { Container } from "@/app/_components/Container";
import { Footer } from "@/app/_components/Footer";
import { Logo } from "@/app/_components/Logo";
import { Nav } from "@/app/_components/Nav";

// Home is a products gateway. The page leads with MCP Anvil (flagship,
// since it's the bigger story now: daemon + dashboard + 64 built-in tools
// + CLI), then introduces AgentForge as the heavier production-stack
// boilerplate. Each product gets its own card-and-CTA section before the
// shared "trust pillars + about" footer block, so a buyer landing here
// from search can identify which product they want in <5s of scrolling.

export const metadata = {
  title: {
    absolute: "AI Infra Decoded · MCP Anvil + AgentForge",
  },
  description:
    "Production AI infrastructure tooling. MCP Anvil — a local MCP daemon + dashboard + 64 built-in tools. AgentForge — source-available agent stack with FastAPI + Next.js. Both run on your infra, both work with your API keys.",
  alternates: { canonical: "/" },
};

// What MCP Anvil's dashboard looks like. We render a pseudo-screenshot
// (HTML + Tailwind, not a real PNG) so it stays crisp at any resolution
// and we don't ship a 200KB hero image. Two-column: sidebar with tabs +
// counts on the left, server list on the right.
const DASHBOARD_SERVERS = [
  { name: "anvil-builtin", state: "READY", count: 64, label: "Built-in tools", isDefault: true },
  { name: "anvil-custom", state: "READY", count: 4, label: "Custom tools", isDefault: true },
  { name: "code-review", state: "READY", count: 7, label: "Imported from Claude Desktop", isDefault: false },
  { name: "neon-db", state: "REGISTERED", count: 0, label: "Imported (HTTP — not supported)", isDefault: false },
];
const DASHBOARD_TABS = [
  { name: "Servers", count: 4, active: true },
  { name: "Tools", count: 75 },
  { name: "Templates", count: 2 },
  { name: "Saved Calls", count: 6 },
  { name: "Prompts", count: 4 },
  { name: "History", count: 38 },
  { name: "Events", count: 12 },
  { name: "Help & guides", count: null },
];

const MCP_ANVIL_PILLARS = [
  { icon: Server, name: "Local daemon", note: "127.0.0.1:7820 · REST + WebSocket" },
  { icon: Layers, name: "Browser dashboard", note: "Eight tabs · zero install" },
  { icon: Wrench, name: "64 built-in tools", note: "Filesystem · docs · network · security" },
  { icon: Globe, name: "One-click import", note: "Claude Desktop / Code / Cursor" },
];

// AgentForge teaser — kept short. The full pitch lives at /agentforge.
const AGENTFORGE_HIGHLIGHTS = [
  "Tier-routed LLM (frontier / local-large / local-small) with automatic fallback",
  "Multi-turn streaming chat over SSE, persisted to your Postgres",
  "Hybrid pgvector + pg_trgm RAG — no Pinecone, no Weaviate bill",
  "LLM-judge eval harness with CI gate · 360+ tests",
  "Self-hosted Langfuse observability included",
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
      "No telemetry sent back to us. Your prompts, conversations, and tool calls stay on the stack you deploy. Source-available, fully auditable.",
  },
  {
    icon: GitFork,
    title: "Patches, included",
    body:
      "Every fix and improvement ships into the same source repo. License tier sets your update window; the bytes you bought stay yours.",
  },
];

export default function Home() {
  return (
    <>
      <Nav />

      {/* Hero — products gateway. Two-column on desktop: copy left, MCP
          Anvil dashboard mockup right. The mockup is the hero visual
          because the dashboard IS the flagship product. */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden />
        <Container size="lg" className="relative pt-20 pb-24 sm:pt-28 sm:pb-28">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)]">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/[0.06] px-3 py-1 text-xs text-cyan-300">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                Two products · one stack philosophy
              </span>
              <h1 className="mt-6 text-balance font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Production AI infrastructure,{" "}
                <span className="bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent">
                  decoded.
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-zinc-400">
                <strong className="text-zinc-200">MCP Anvil</strong> is a local
                MCP toolbox — daemon, dashboard, 64 built-in tools.{" "}
                <strong className="text-zinc-200">AgentForge</strong> is the
                source-available agent stack that drives real production
                traffic. Both run on your infra. Both work with your API keys.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link
                  href="/mcp-anvil"
                  className="cta-glow group inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-400"
                >
                  Explore MCP Anvil
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  href="/agentforge"
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-800/50 bg-zinc-900/40 px-5 py-3 text-sm font-medium text-zinc-100 transition hover:border-zinc-700 hover:bg-zinc-900"
                >
                  See AgentForge
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-zinc-500">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  Use your own API keys
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  Run keyless on Ollama / vLLM
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  You own the source
                </span>
              </div>
            </div>

            {/* MCP Anvil dashboard hero — real screenshot captured via
                Edge headless against the live daemon at 127.0.0.1:7820.
                Sets the buyer's expectation visually: this is what you
                get after `pip install mcp-anvil && mcp-anvil daemon start`. */}
            <div className="min-w-0">
              <img
                src="/screenshots/dashboard.png"
                alt="MCP Anvil dashboard — Servers tab showing anvil-builtin (64 tools) and anvil-custom under READY + DEFAULT badges, sidebar tabs for Tools / Templates / Saved Calls / Prompts / History / Events / Help."
                className="w-full rounded-xl border border-zinc-800/70 shadow-2xl shadow-cyan-500/[0.06]"
                loading="eager"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* MCP Anvil section — flagship. Comes first since the visual above
          already primes the buyer for this product. */}
      <section id="mcp-anvil" className="surface-alt py-20 sm:py-24">
        <Container size="lg">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/[0.06] px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-300">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                Flagship
              </span>
              <h2 className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                MCP Anvil — one toolbox for every MCP server.
              </h2>
              <p className="mt-5 text-pretty text-zinc-400">
                A local daemon hosts every MCP server you register. A browser
                dashboard runs on the same port. 64 tools ship out of the box —
                filesystem, docs (PDF/Excel/CSV), networking (DNS/ports/SSL),
                system (CPU/PowerShell), security (hashing/JWT/secret-scanning),
                dev workflow. Import existing servers from Claude Desktop /
                Code / Cursor with one click.
              </p>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {MCP_ANVIL_PILLARS.map(({ icon: Icon, name, note }) => (
                  <li
                    key={name}
                    className="flex items-start gap-3 rounded-lg border border-zinc-800/50 bg-zinc-950/50 p-3"
                  >
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-cyan-500/20 bg-cyan-500/[0.06] text-cyan-300">
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-zinc-100">{name}</div>
                      <div className="text-xs text-zinc-500">{note}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/mcp-anvil"
                  className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-400"
                >
                  See what's in the box
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/mcp-anvil#pricing"
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/40 px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-zinc-700 hover:bg-zinc-900"
                >
                  Pricing — from $29
                </Link>
              </div>
            </div>

            {/* Mini stats card — three numbers that capture the scale. */}
            <div className="rounded-2xl border border-zinc-800/60 bg-gradient-to-br from-zinc-900/60 to-zinc-950 p-7">
              <div className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                What you get
              </div>
              <div className="mt-5 space-y-5">
                {[
                  { value: "64", label: "built-in tools", note: "six categories, ship by default" },
                  { value: "8", label: "dashboard tabs", note: "servers · tools · templates · prompts · …" },
                  { value: "1-click", label: "import existing servers", note: "Claude Desktop · Claude Code · Cursor" },
                ].map((s) => (
                  <div key={s.label} className="border-l-2 border-cyan-500/40 pl-4">
                    <div className="font-serif text-2xl font-semibold tracking-tight text-zinc-100">
                      {s.value}
                    </div>
                    <div className="mt-0.5 text-sm font-medium text-zinc-300">{s.label}</div>
                    <div className="mt-0.5 text-xs text-zinc-500">{s.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* AgentForge section — secondary. Same shape as MCP Anvil section
          for visual rhyme, but zinc instead of cyan accents so it reads
          as "and also, this other thing" rather than competing. */}
      <section id="agentforge" className="py-20 sm:py-24">
        <Container size="lg">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:items-center">
            <div className="lg:order-first">
              <div className="rounded-2xl border border-zinc-800/60 bg-gradient-to-br from-zinc-900/60 to-zinc-950 p-7">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  <CircuitBoard className="h-4 w-4" />
                  The agent stack
                </div>
                <ul className="mt-5 space-y-3">
                  {AGENTFORGE_HIGHLIGHTS.map((line) => (
                    <li key={line} className="flex items-start gap-2.5 text-sm text-zinc-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" strokeWidth={2} />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Production stack
              </span>
              <h2 className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                AgentForge — the agent boilerplate behind it.
              </h2>
              <p className="mt-5 text-pretty text-zinc-400">
                Skip the 1–2 weeks of plumbing every AI app needs. Tier-routed
                LLM, multi-turn streaming, hybrid RAG, eval harness with CI
                gate, observability, billing. FastAPI 0.115 + Next.js 15 +
                pgvector. The same code path that drives our own production
                traffic, source-available under a commercial license.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/agentforge"
                  className="inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-white"
                >
                  See AgentForge
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/40 px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-zinc-700 hover:bg-zinc-900"
                >
                  Try the live demo
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Trust pillars — shared. Same three things hold for both products. */}
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
              Built like infrastructure you'd ship yourself.
            </h2>
            <p className="mt-4 max-w-2xl text-pretty text-zinc-400">
              Both products run on your infra, accept your API keys, and ship
              full source. Same code paths we put in front of our own
              production traffic — packaged so a senior engineer can have them
              running inside an afternoon.
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

      {/* Closing CTA — funnels to MCP Anvil since it's the flagship. */}
      <section className="py-20 sm:py-28">
        <Container size="md">
          <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/[0.06] via-zinc-950 to-zinc-950 p-10 text-center accent-glow">
            <div className="mx-auto max-w-2xl">
              <Boxes className="mx-auto h-10 w-10 text-cyan-400" strokeWidth={1.5} />
              <h2 className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Start with MCP Anvil. Or the demo.
              </h2>
              <p className="mt-4 text-pretty text-zinc-400">
                MCP Anvil installs in one pip command, runs locally on
                127.0.0.1:7820, and connects to Claude Desktop with a single
                config entry. The AgentForge demo is a hosted chat — no signup,
                runs entirely client-side.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/mcp-anvil"
                  className="rounded-lg bg-cyan-500 px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-cyan-400"
                >
                  Get MCP Anvil — $29
                </Link>
                <Link
                  href="/demo"
                  className="rounded-lg border border-zinc-800 bg-zinc-900/60 px-5 py-3 text-sm font-medium text-zinc-100 hover:border-zinc-700 hover:bg-zinc-900"
                >
                  Try the AgentForge demo
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
