import {
  ArrowUpRight,
  Box,
  Boxes,
  Brain,
  CheckCircle2,
  Code,
  Eye,
  FileCheck,
  Gauge,
  GitFork,
  Layers,
  Network,
  Play,
  Settings,
  Sparkles,
  Workflow,
} from "lucide-react";
import Link from "next/link";

import { Container } from "@/app/_components/Container";
import { Footer } from "@/app/_components/Footer";
import { Nav } from "@/app/_components/Nav";

// Polar checkout URLs (env-var driven; mailto fallback while the SKUs are
// being created).
const POLAR_AGENTFORGE_PERSONAL_URL =
  process.env.NEXT_PUBLIC_POLAR_AGENTFORGE_PERSONAL_URL ||
  "mailto:hello@aiinfradecoded.com?subject=Agent%20Forge%20Personal%20(%2449)";
const POLAR_AGENTFORGE_TEAM_URL =
  process.env.NEXT_PUBLIC_POLAR_AGENTFORGE_TEAM_URL ||
  "mailto:hello@aiinfradecoded.com?subject=Agent%20Forge%20Team%20(%24149)";
const POLAR_BUNDLE_PERSONAL_URL =
  process.env.NEXT_PUBLIC_POLAR_BUNDLE_PERSONAL_URL ||
  "mailto:hello@aiinfradecoded.com?subject=Anvil%20%2B%20Forge%20Bundle%20Personal%20(%2459)";

// The five capabilities of Agent Forge. Order is the buyer's mental
// model — what an agent IS, what RUNS it, what they SEE, how it
// IMPROVES, where it goes WRONG.
const CAPABILITIES = [
  {
    icon: Brain,
    name: "Define an agent in 30 seconds",
    blurb:
      "System prompt + tool subset + model + behavior policy. Saved as a single TOML or Python file you can check into git. The dashboard's form writes the file for you; power users edit it directly.",
  },
  {
    icon: Play,
    name: "Run it locally as a chat endpoint",
    blurb:
      "Long-lived process on 127.0.0.1:7830. Streaming SSE + WebSocket. Conversation history persisted to SQLite. Memory modes: none, conversation, vector. Hit it from curl, the dashboard, or any HTTP client.",
  },
  {
    icon: Eye,
    name: "See every decision the agent makes",
    blurb:
      "Span-based traces of every step: which tool, why, what the LLM thought before choosing it, what the response was. Replayable in the dashboard. No third-party observability service — runs on your machine.",
  },
  {
    icon: FileCheck,
    name: "Evaluate before you deploy",
    blurb:
      "Golden inputs + judge prompts. CI gate: if pass-rate drops below your threshold, the build fails. Regression-test agent behavior the same way you regression-test code.",
  },
  {
    icon: Network,
    name: "Multi-agent orchestration",
    blurb:
      "Agents can call other agents like tools. One classifier routes to specialists. A planner agent decomposes work and delegates. The dashboard shows the full chain as a tree, not a flat log.",
  },
];

// Concrete agent + tool pairings. The point: Agent Forge stops being
// "a generic chat thing" and becomes "the obvious place to wire LLM
// reasoning to MCP Anvil's catalog."
const PAIRINGS = [
  {
    agent: "Code Auditor",
    tools: "find_secrets · fs_grep · code_count",
    blurb: "Scans a repo for security smells. Reports back as a markdown table.",
  },
  {
    agent: "Issue Triager",
    tools: "(GitHub MCP, imported from Claude Desktop)",
    blurb: "Reads new issues, classifies them, applies labels, drafts a reply.",
  },
  {
    agent: "Commit Crafter",
    tools: "git_diff · git_log",
    blurb: "Reads your staged changes. Writes a conventional-commit message.",
  },
  {
    agent: "URL Investigator",
    tools: "http_health · ssl_cert_info · web_scrape · header_security_check",
    blurb: "Runs all four against any URL. Summarizes uptime + security posture.",
  },
  {
    agent: "PDF Summarizer",
    tools: "pdf_extract · markdown_to_text",
    blurb: "Reads a PDF, returns a structured summary + key entities + open questions.",
  },
  {
    agent: "Build Watcher",
    tools: "run_pytest · git_status · find_todos",
    blurb: "Runs tests, checks git status, finds TODOs. Posts a daily status report.",
  },
];

const TRUST_PILLARS = [
  {
    icon: Code,
    title: "Source-available, verifiable",
    body:
      "You get the full source under a commercial license. Read it, audit it, fork it, modify it. No closed binary, no telemetry sent home. Run it knowing exactly what it does.",
  },
  {
    icon: Layers,
    title: "Stacks on top of MCP Anvil",
    body:
      "Agent Forge reads MCP Anvil's tool catalog over the same OAuth-gated REST surface Claude Desktop uses. Add a tool to anvil-custom; it appears in the agent-builder's tool picker on the next refresh.",
  },
  {
    icon: GitFork,
    title: "Standalone if you want",
    body:
      "Agent Forge works against any MCP server, not just MCP Anvil. Point it at a different endpoint and it picks up that catalog instead. The pairing is the optimization, not the requirement.",
  },
];

const FAQ = [
  {
    q: "How is Agent Forge different from LangChain / LlamaIndex / Autogen?",
    a: "Those are libraries. You write Python, glue together their primitives, run them as part of YOUR code. Agent Forge is a local product — it runs as its own process, has a dashboard, persists state to SQLite, and integrates with MCP Anvil's tool catalog out of the box. Closer to 'Postman for agents' than 'a framework you import.' You can still write agents in Python; the dashboard is the on-ramp, not the ceiling.",
  },
  {
    q: "Do I need MCP Anvil to use Agent Forge?",
    a: "No. Agent Forge speaks MCP, so it works against any MCP server — Claude Desktop's, your own, a third party's. MCP Anvil just makes the pairing very easy because the tool catalog is rich and the auth is already set up. The bundle exists because most buyers will want both, not because they're locked together.",
  },
  {
    q: "Why source-available instead of closed?",
    a: "Agents will make decisions about your filesystem, your shell, your private code. You should be able to audit the loop, not trust a binary blob. Source-available also means you can fork and modify under the commercial license — no waiting on us for your custom use case.",
  },
  {
    q: "What's the runtime built on?",
    a: "Python 3.11+. LiteLLM for model routing (works with Claude, GPT-4, Gemini, Ollama, vLLM — bring your own keys or run keyless). FastAPI for the local HTTP surface. SQLite for conversation persistence. The dashboard is a single-file HTML SPA — same architecture as MCP Anvil's, no npm install required.",
  },
  {
    q: "How do I deploy an agent built in Agent Forge?",
    a: "The simplest path: run the runtime itself wherever you'd run any Python process. Docker image included. Cloudflare Tunnel + the local runtime is a working serverless deploy. For real production traffic — auth, billing, multi-tenancy, observability — the Pro tier ships the FastAPI / Next.js boilerplate that wraps the runtime with the production patterns.",
  },
  {
    q: "What about an existing agent codebase I have?",
    a: "Agent Forge agents are just Python files with a defined shape (system prompt, tool list, model, etc.). If you have an existing agent in LangChain or vanilla Python, the migration is mostly removing your hand-rolled tool-calling loop and pointing at MCP Anvil's HTTP API for tool resolution. We have a one-page porting guide in the docs.",
  },
  {
    q: "Multi-developer license?",
    a: "Personal covers one developer + all of their internal projects + paid client work they personally ship. Team adds 4 more developer seats. If your team is bigger than 5 and you want to keep using Agent Forge, contact us — we'll write a quote.",
  },
];

export const metadata = {
  title: "Agent Forge — local agent workbench on top of MCP Anvil",
  description:
    "Define an agent, pick its tools from MCP Anvil's catalog, run it locally, eval it, trace it. Source-available. $49 personal / $149 team. Bundle with MCP Anvil for $59.",
  alternates: { canonical: "/agentforge" },
};

export default function AgentForgePage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden />
          <Container size="lg" className="relative pt-20 pb-24 sm:pt-28 sm:pb-28">
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)]">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/[0.06] px-3 py-1 text-xs text-cyan-300">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                  Agent Forge · the workbench above MCP Anvil
                </span>
                <h1 className="mt-6 text-balance font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                  Build agents{" "}
                  <span className="bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent">
                    on your tools.
                  </span>
                </h1>
                <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-zinc-400">
                  <strong className="text-zinc-200">Agent Forge</strong> is the
                  local agent workbench. Define a system prompt, pick its
                  tools from MCP Anvil&apos;s 64-tool catalog (or any MCP
                  server you have registered), pick the model. The runtime
                  hosts it as a chat endpoint with streaming, memory, traces,
                  and an eval harness. All on your machine.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Link
                    href={POLAR_AGENTFORGE_PERSONAL_URL}
                    className="cta-glow group inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-400"
                  >
                    Get Agent Forge — $49
                    <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  <Link
                    href={POLAR_BUNDLE_PERSONAL_URL}
                    className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/40 bg-cyan-500/[0.06] px-5 py-3 text-sm font-medium text-cyan-300 transition hover:border-cyan-400/60 hover:bg-cyan-500/10"
                  >
                    Bundle with MCP Anvil — $59
                    <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                      save $19
                    </span>
                  </Link>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-zinc-500">
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    Source-available
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    Your API keys, your infra
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    Pairs with MCP Anvil
                  </span>
                </div>
              </div>

              {/* Hero visual — agent-definition form mockup */}
              <AgentBuilderMockup />
            </div>
          </Container>
        </section>

        {/* The architecture pairing — Anvil + Forge */}
        <section className="surface-alt py-20 sm:py-24">
          <Container size="lg">
            <div className="text-center">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400">
                One stack philosophy
              </span>
              <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Anvil hosts the tools. Forge wields them.
              </h2>
              <p className="mt-4 mx-auto max-w-2xl text-zinc-400">
                Two local processes that talk to each other. MCP Anvil
                provides the 64-tool catalog + your custom + imported
                servers. Agent Forge reads from that catalog when you
                build an agent. Same machine, same buyer, same dashboard
                vocabulary.
              </p>
            </div>
            <ArchitectureDiagram />
          </Container>
        </section>

        {/* Five capabilities */}
        <section className="py-20 sm:py-24">
          <Container size="lg">
            <div className="text-center">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400">
                What's in the box
              </span>
              <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Five capabilities. Local-first.
              </h2>
            </div>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {CAPABILITIES.map(({ icon: Icon, name, blurb }) => (
                <div
                  key={name}
                  className="rounded-xl border border-zinc-800/70 bg-zinc-900/40 p-6"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800/50 bg-zinc-950 text-cyan-400">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-5 font-serif text-lg font-semibold text-zinc-100">
                    {name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    {blurb}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Concrete pairings — what agents you'd actually build */}
        <section className="surface-alt py-20 sm:py-24">
          <Container size="lg">
            <div className="text-center">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400">
                Examples
              </span>
              <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Six agents you could ship this afternoon.
              </h2>
              <p className="mt-4 mx-auto max-w-2xl text-zinc-400">
                Each is a system prompt + a handful of tools from MCP
                Anvil&apos;s catalog. Fork any of these, swap tools,
                ship your own variant.
              </p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {PAIRINGS.map(({ agent, tools, blurb }) => (
                <div
                  key={agent}
                  className="rounded-xl border border-zinc-800/70 bg-zinc-900/40 p-5"
                >
                  <div className="flex items-center gap-2">
                    <Workflow className="h-4 w-4 text-cyan-400" strokeWidth={1.75} />
                    <h3 className="font-serif text-base font-semibold text-zinc-100">
                      {agent}
                    </h3>
                  </div>
                  <p className="mt-2 font-mono text-[11.5px] leading-relaxed text-cyan-300/80">
                    {tools}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {blurb}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Trust pillars */}
        <section className="py-20 sm:py-24">
          <Container size="lg">
            <div className="grid gap-6 sm:grid-cols-3">
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
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Pricing */}
        <section id="pricing" className="surface-alt py-20 sm:py-24">
          <Container size="lg">
            <div className="text-center">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400">
                Pricing
              </span>
              <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                One-time. Source included.
              </h2>
              <p className="mt-4 mx-auto max-w-xl text-zinc-400">
                Pay once, get the source, install on your machine. Bring
                your own API keys. Bundle with MCP Anvil to save $19.
              </p>
            </div>
            <div className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
              {/* Personal */}
              <div className="relative rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-cyan-500/[0.06] via-zinc-900/40 to-zinc-900/40 p-7 ring-1 ring-cyan-500/20">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-cyan-300">
                  Most popular
                </span>
                <h3 className="font-serif text-xl font-semibold">Personal</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold">$49</span>
                  <span className="text-sm text-zinc-500">one-time</span>
                </div>
                <p className="mt-3 text-sm text-zinc-400">
                  Full Agent Forge source + commercial license. 1 developer.
                </p>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {[
                    "Agent runtime + dashboard + CLI",
                    "Multi-agent orchestration",
                    "Eval harness + CI gate",
                    "Span-based local tracing",
                    "Unlimited internal + paid client work",
                    "1 year of updates on main",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-400" strokeWidth={2} />
                      <span className="text-zinc-200">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={POLAR_AGENTFORGE_PERSONAL_URL}
                  className="mt-7 inline-flex w-full items-center justify-center rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-400"
                >
                  Get personal — $49
                </Link>
                <p className="mt-2 text-center text-[11px] text-zinc-500">
                  Secure checkout via <span className="underline">Polar</span> · source delivered instantly
                </p>
              </div>

              {/* Team */}
              <div className="relative rounded-2xl border border-zinc-700/70 bg-zinc-900/50 p-7">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-300">
                  Best value
                </span>
                <h3 className="font-serif text-xl font-semibold">Team</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold">$149</span>
                  <span className="text-sm text-zinc-500">one-time</span>
                </div>
                <p className="mt-3 text-sm text-zinc-400">
                  Everything in Personal, plus 4 more seats + roadmap influence.
                </p>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {[
                    "5 developer seats — one license, your whole team",
                    "Production patterns (auth, billing, multi-tenancy) included",
                    "Priority feature requests",
                    "Direct email support (1 business day)",
                    "Vote on the v0.x roadmap",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-zinc-300" strokeWidth={2} />
                      <span className="text-zinc-300">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={POLAR_AGENTFORGE_TEAM_URL}
                  className="mt-7 inline-flex w-full items-center justify-center rounded-lg border border-zinc-700 bg-zinc-925 px-4 py-2.5 text-sm font-semibold text-zinc-100 transition hover:border-zinc-600 hover:bg-zinc-900"
                >
                  Get team — $149
                </Link>
                <p className="mt-2 text-center text-[11px] text-zinc-500">
                  Secure checkout via <span className="underline">Polar</span> · source delivered instantly
                </p>
              </div>
            </div>

            {/* Bundle pitch — separately styled so it doesn't compete
                with the per-product tiers above. */}
            <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-cyan-500/[0.10] via-zinc-950 to-zinc-950 p-7 accent-glow">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="rounded-full bg-cyan-500/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-cyan-300">
                  Bundle
                </span>
                <h3 className="font-serif text-xl font-semibold text-zinc-100">
                  Anvil + Forge — the full stack
                </h3>
              </div>
              <p className="mt-3 text-sm text-zinc-400">
                MCP Anvil + Agent Forge together. One license file, both
                products, immediate save. The intended way to buy if you&apos;re
                building agents.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/[0.04] p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-cyan-300">
                    Personal bundle
                  </div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-3xl font-semibold text-zinc-50">$59</span>
                    <span className="text-xs text-zinc-500 line-through">$78</span>
                    <span className="text-xs text-cyan-300">save $19</span>
                  </div>
                  <Link
                    href={POLAR_BUNDLE_PERSONAL_URL}
                    className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-400"
                  >
                    Bundle personal — $59
                  </Link>
                </div>
                <div className="rounded-lg border border-zinc-700 bg-zinc-925 p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-zinc-300">
                    Team bundle
                  </div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-3xl font-semibold text-zinc-50">$199</span>
                    <span className="text-xs text-zinc-500 line-through">$248</span>
                    <span className="text-xs text-zinc-300">save $49</span>
                  </div>
                  <Link
                    href="/pricing#bundle"
                    className="mt-3 inline-flex w-full items-center justify-center rounded-lg border border-zinc-700 bg-zinc-925 px-4 py-2 text-sm font-semibold text-zinc-100 transition hover:border-zinc-600 hover:bg-zinc-900"
                  >
                    Bundle team — $199
                  </Link>
                </div>
              </div>
            </div>

            <p className="mx-auto mt-6 max-w-2xl text-center text-[11.5px] text-zinc-500">
              VAT and sales tax handled by Polar.sh as the merchant of record.
            </p>
          </Container>
        </section>

        {/* BreadcrumbList structured data — Home > Agent Forge, so Google can
            render a breadcrumb trail in the result instead of the bare URL. */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://aiinfradecoded.com" },
                { "@type": "ListItem", position: 2, name: "Agent Forge", item: "https://aiinfradecoded.com/agentforge" },
              ],
            }),
          }}
        />

        {/* FAQ */}
        {/* FAQPage structured data — built from the same FAQ array rendered
            below, so it can't drift from the visible Q&A. */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQ.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            }),
          }}
        />
        <section className="py-20 sm:py-24">
          <Container size="lg">
            <div className="text-center">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400">
                FAQ
              </span>
              <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Predictable questions, answered.
              </h2>
            </div>
            <dl className="mx-auto mt-12 max-w-3xl space-y-4">
              {FAQ.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-xl border border-zinc-800/70 bg-zinc-900/40"
                >
                  <summary className="cursor-pointer list-none px-5 py-4 text-sm font-medium text-zinc-100 transition-colors hover:text-cyan-300 [&::-webkit-details-marker]:hidden">
                    <span className="mr-2 text-cyan-400 group-open:text-cyan-300">›</span>
                    {item.q}
                  </summary>
                  <div className="px-5 pb-5 text-sm leading-relaxed text-zinc-400">
                    {item.a}
                  </div>
                </details>
              ))}
            </dl>
          </Container>
        </section>

        {/* CTA */}
        <section className="surface-alt py-20 sm:py-24">
          <Container size="md">
            <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/[0.06] via-zinc-950 to-zinc-950 p-10 text-center accent-glow">
              <Boxes className="mx-auto h-10 w-10 text-cyan-400" strokeWidth={1.5} />
              <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Stop hand-rolling tool-calling loops.
              </h2>
              <p className="mt-4 mx-auto max-w-xl text-zinc-400">
                The runtime is already there. The tool catalog is already
                there (from MCP Anvil). The eval harness is already there.
                Define an agent, run it, ship it.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href={POLAR_BUNDLE_PERSONAL_URL}
                  className="cta-glow inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-400"
                >
                  Bundle — $59
                </Link>
                <Link
                  href={POLAR_AGENTFORGE_PERSONAL_URL}
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-5 py-3 text-sm font-medium text-zinc-100 hover:border-zinc-700 hover:bg-zinc-900"
                >
                  Agent Forge alone — $49
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

/**
 * The agent-builder form mockup that sits in the hero. Shows the
 * dashboard's "+ New agent" form: name + system prompt + tool picker
 * (reads from MCP Anvil's catalog) + model + memory mode.
 *
 * Built from HTML/Tailwind so it scales crisply and renders identical
 * to what the dashboard will actually look like once we ship it.
 */
function AgentBuilderMockup() {
  return (
    <div className="min-w-0">
      <div className="rounded-xl border border-zinc-800/70 bg-zinc-950 shadow-2xl shadow-cyan-500/[0.06] overflow-hidden">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-zinc-800/70 bg-zinc-900/60 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          <span className="ml-3 font-mono text-[10.5px] text-zinc-500">
            127.0.0.1:7830 — Agent Forge
          </span>
        </div>
        <div className="px-5 py-4">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-cyan-300">
            + New agent
          </div>

          <div className="mt-3 space-y-3">
            <FormRow label="name" value="code-auditor" />
            <FormRow
              label="description"
              value="Scans a repo for security smells."
            />
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
                tools
              </div>
              <div className="mt-1.5 space-y-1 text-[11px]">
                <ToolRow tool="anvil-builtin.find_secrets" checked />
                <ToolRow tool="anvil-builtin.fs_grep" checked />
                <ToolRow tool="anvil-builtin.code_count" checked />
                <ToolRow tool="anvil-builtin.shell_exec" />
                <ToolRow tool="anvil-builtin.git_diff" />
                <div className="pl-5 text-[10.5px] text-zinc-600">
                  + 59 more from MCP Anvil
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormRow label="model" value="claude-3.5-sonnet" />
              <FormRow label="memory" value="conversation" />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2">
            <span className="rounded-md bg-cyan-500 px-3 py-1.5 text-[11px] font-semibold text-zinc-950">
              Save + open chat
            </span>
            <span className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-[11px] text-zinc-300">
              Cancel
            </span>
          </div>
        </div>
        <div className="border-t border-zinc-800/70 bg-zinc-900/40 px-4 py-2 text-[10px] text-zinc-500">
          Writes to <span className="font-mono text-cyan-400">~/.agent-forge/agents/code-auditor.toml</span> — yours to edit.
        </div>
      </div>
    </div>
  );
}

function FormRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
        {label}
      </div>
      <div className="mt-1 rounded-md border border-zinc-800 bg-zinc-925 px-2.5 py-1.5 font-mono text-[11.5px] text-zinc-200">
        {value}
      </div>
    </div>
  );
}

function ToolRow({ tool, checked = false }: { tool: string; checked?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`inline-flex h-3 w-3 items-center justify-center rounded-sm border ${
          checked
            ? "border-cyan-400 bg-cyan-500/30 text-cyan-300"
            : "border-zinc-700 bg-zinc-900"
        }`}
        aria-hidden
      >
        {checked && (
          <svg viewBox="0 0 10 10" className="h-2 w-2" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M2 5l2 2 4-4" />
          </svg>
        )}
      </span>
      <code className={`font-mono text-[11px] ${checked ? "text-cyan-300" : "text-zinc-500"}`}>
        {tool}
      </code>
    </div>
  );
}

/**
 * The architecture diagram — two boxes (Anvil + Forge), one arrow,
 * one buyer's machine outline. Built from HTML/Tailwind, same reason.
 */
function ArchitectureDiagram() {
  return (
    <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-zinc-800/70 bg-zinc-925/60 p-6 sm:p-10">
      <div className="mb-4 text-center text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
        Your machine · 127.0.0.1
      </div>
      <div className="grid items-center gap-6 sm:grid-cols-[minmax(0,1fr)_60px_minmax(0,1fr)]">
        <div className="rounded-xl border border-cyan-500/40 bg-gradient-to-br from-cyan-500/[0.06] to-zinc-925 p-5 text-center">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-cyan-300">
            Agent Forge
          </div>
          <div className="mt-2 font-serif text-lg font-semibold text-zinc-100">
            :7830
          </div>
          <div className="mt-2 text-[11.5px] text-zinc-400">
            Reads tools from Anvil. Runs your agents. Streams responses.
          </div>
        </div>

        {/* Arrow — visible on desktop, vertical on mobile */}
        <div className="flex items-center justify-center text-cyan-400">
          <svg viewBox="0 0 60 24" className="hidden h-6 w-full sm:block" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path d="M0 12h54M48 6l8 6-8 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg viewBox="0 0 24 60" className="block h-6 w-6 sm:hidden" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path d="M12 0v54M6 48l6 8 6-8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="rounded-xl border border-cyan-500/40 bg-gradient-to-br from-cyan-500/[0.06] to-zinc-925 p-5 text-center">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-cyan-300">
            MCP Anvil
          </div>
          <div className="mt-2 font-serif text-lg font-semibold text-zinc-100">
            :7820
          </div>
          <div className="mt-2 text-[11.5px] text-zinc-400">
            Hosts 64 built-in tools + your custom + imported MCP servers.
          </div>
        </div>
      </div>
      <div className="mt-6 text-center text-[11px] text-zinc-500">
        OAuth-gated REST · same auth path Claude Desktop already uses · zero network round-trips
      </div>
    </div>
  );
}
