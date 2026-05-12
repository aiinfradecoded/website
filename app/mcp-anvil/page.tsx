import {
  ArrowUpRight,
  CheckCircle2,
  FileText,
  Gauge,
  ShieldAlert,
  Sparkles,
  Terminal,
} from "lucide-react";
import Link from "next/link";

import { Container } from "@/app/_components/Container";
import { Footer } from "@/app/_components/Footer";
import { Nav } from "@/app/_components/Nav";

// Polar checkout links. Set per environment via the marketing-site env vars;
// fall back to mailto for the period before the checkout SKUs exist.
const POLAR_PERSONAL_URL =
  process.env.NEXT_PUBLIC_POLAR_MCPANVIL_PERSONAL_URL ||
  "mailto:hello@aiinfradecoded.com?subject=MCP%20Forge%20Personal%20(%2429)";
const POLAR_TEAM_URL =
  process.env.NEXT_PUBLIC_POLAR_MCPANVIL_TEAM_URL ||
  "mailto:hello@aiinfradecoded.com?subject=MCP%20Forge%20Team%20(%2499)";

const COMMANDS = [
  {
    icon: FileText,
    badge: "Free",
    name: "mcp-anvil new <name>",
    blurb:
      "Scaffold a complete MCP server in Python or TypeScript. Working sample tool, manifest, tests, Dockerfile, README — all real, all FastMCP-based, runs immediately. Free forever.",
  },
  {
    icon: ShieldAlert,
    badge: "Paid",
    name: "mcp-anvil audit <path>",
    blurb:
      "21 rules across two phases. Static rules read the manifest (auth gaps, lookalike tool names, hardcoded secrets, missing schemas). Runtime probes boot the server in a sandbox and check the MCP handshake, tools/list consistency, response-size budgets, Windows stream-buffering. Opt-in adversarial fuzzing.",
  },
  {
    icon: Terminal,
    badge: "Paid",
    name: "mcp-anvil inspect <path>",
    blurb:
      "Live tool playground at localhost:7800. Auto-renders forms from each tool's input schema, fires calls, shows request/response timelines with latency. Stop guessing what your MCP host sees.",
  },
];

const SOURCES = [
  {
    paper: "arXiv 2506.13538",
    title: "MCP at First Glance",
    blurb: "Empirical study of 1,899 MCP servers — auth gaps, maintainability, session-in-URL leaks.",
    href: "https://arxiv.org/abs/2506.13538",
  },
  {
    paper: "arXiv 2603.05637",
    title: "Real Faults in MCP Software",
    blurb: "MCP fault taxonomy. 66.7% of OS-dependent faults are Windows-specific.",
    href: "https://arxiv.org/abs/2603.05637",
  },
  {
    paper: "AgentDojo (NeurIPS 2024)",
    title: "Agent injection benchmark",
    blurb: "Adversarial probes ported into the fuzz phase.",
    href: "https://arxiv.org/abs/2406.13352",
  },
];

const FAQ = [
  {
    q: "Why pay for a CLI? Anthropic ships MCP Inspector free.",
    a: "Inspector is bare-bones — it lets you click tools, that's it. MCP Anvil ships the scaffolder (auto-generates the boring 200 lines every server reinvents), a real security audit grounded in published fault taxonomies, and a playground with run history, latency, and form-driven UX. Inspector is a starting block; this is the toolbox.",
  },
  {
    q: "What's a license, technically?",
    a: "Ed25519-signed JSON. Buyer pastes a base32 blob into `mcp-anvil license activate`. The CLI verifies the signature against an embedded public key locally — no network call on the happy path. 30-day offline grace after the weekly revocation check.",
  },
  {
    q: "Source-available or closed binary?",
    a: "Closed binary, distributed via direct download + Homebrew + Scoop + npm wrapper + pipx wrapper. The audit ruleset and templates are inspectable in the bundled package once installed.",
  },
  {
    q: "What about TypeScript? Rust? Go?",
    a: "Python and TypeScript ship at v1. Rust and Go are queued — open a GitHub issue and they bump up the list.",
  },
  {
    q: "Refund policy?",
    a: "Email hello@aiinfradecoded.com within 14 days if it doesn't work for you — full refund, no questions. The 14-day full-feature trial usually answers this before money changes hands.",
  },
];

export default function McpAnvilPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="surface-hero py-20 sm:py-28">
          <Container size="lg">
            <div className="text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/[0.06] px-3 py-1 text-xs font-medium text-cyan-300">
                <Sparkles className="h-3 w-3" strokeWidth={2.25} />
                Now in alpha · early-adopter pricing
              </div>
              <h1 className="text-balance font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                MCP Anvil —
                <br />
                <span className="text-cyan-400">the missing toolbox</span>
                <br />
                for MCP server authors.
              </h1>
              <p className="mt-6 text-pretty text-lg text-zinc-400">
                Scaffold a production-grade Model Context Protocol server in
                seconds. Audit it for security holes from the published fault
                taxonomies. Inspect it live in a browser. One CLI.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href={POLAR_PERSONAL_URL}
                  className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-400"
                >
                  Get personal — $29
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
                </Link>
                <Link
                  href="#commands"
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-5 py-2.5 text-sm font-medium text-zinc-200 hover:border-zinc-700 hover:bg-zinc-900"
                >
                  See what it does
                </Link>
              </div>
              <p className="mt-6 text-xs text-zinc-500">
                14-day full-feature trial · no signup · works offline
              </p>
            </div>

            {/* Hero terminal block */}
            <pre className="mt-16 overflow-x-auto rounded-xl border border-zinc-800/70 bg-zinc-950 p-6 font-mono text-[13px] leading-relaxed text-zinc-300">
              <span className="text-zinc-500"># 1. Scaffold a working server (free)</span>
              {"\n"}
              <span className="text-cyan-400">$</span> mcp-anvil new my-server
              {"\n"}
              {"\n"}
              <span className="text-zinc-500"># 2. Audit before you ship (paid)</span>
              {"\n"}
              <span className="text-cyan-400">$</span> mcp-anvil audit ./my-server
              {"\n"}
              <span className="text-zinc-500">  ✓ Audit passed · 0 errors · 0 warnings</span>
              {"\n"}
              {"\n"}
              <span className="text-zinc-500"># 3. Play with tools live (paid)</span>
              {"\n"}
              <span className="text-cyan-400">$</span> mcp-anvil inspect ./my-server
              {"\n"}
              <span className="text-zinc-500">  Playground http://localhost:7800</span>
            </pre>
          </Container>
        </section>

        {/* Commands */}
        <section id="commands" className="surface-alt py-20 sm:py-24">
          <Container size="lg">
            <div className="text-center">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400">
                Three commands
              </span>
              <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Scaffold. Audit. Inspect.
              </h2>
            </div>
            <div className="mt-14 grid gap-6 sm:grid-cols-3">
              {COMMANDS.map(({ icon: Icon, badge, name, blurb }) => (
                <div
                  key={name}
                  className="rounded-xl border border-zinc-800/70 bg-zinc-900/40 p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800/50 bg-zinc-950 text-cyan-400">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-widest ${
                        badge === "Free" ? "text-green-400" : "text-zinc-500"
                      }`}
                    >
                      {badge}
                    </span>
                  </div>
                  <h3 className="mt-5 font-mono text-sm font-semibold text-zinc-100">
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

        {/* Receipts: arXiv sources */}
        <section className="py-20 sm:py-24">
          <Container size="lg">
            <div className="text-center">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400">
                Grounded in receipts
              </span>
              <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                The audit rules come from published research.
              </h2>
              <p className="mt-4 mx-auto max-w-xl text-zinc-400">
                Not vibes. Each rule maps to a specific finding in the MCP
                fault corpus + AgentDojo benchmark. You see the citations in
                every report.
              </p>
            </div>
            <ul className="mt-12 grid gap-4 sm:grid-cols-3">
              {SOURCES.map((s) => (
                <li
                  key={s.paper}
                  className="rounded-xl border border-zinc-800/70 bg-zinc-900/40 p-5"
                >
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener"
                    className="font-mono text-xs text-cyan-400 hover:underline"
                  >
                    {s.paper} ↗
                  </a>
                  <h3 className="mt-2 text-sm font-semibold text-zinc-100">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                    {s.blurb}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* Pricing */}
        <section className="surface-alt py-20 sm:py-24">
          <Container size="lg">
            <div className="text-center">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400">
                Pricing
              </span>
              <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                One-time. Yours forever.
              </h2>
              <p className="mt-4 mx-auto max-w-xl text-zinc-400">
                14-day trial on first launch. After that, activate a license
                or run against the bundled demo server forever.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-3">
              {/* Free */}
              <div className="rounded-2xl border border-zinc-800/70 bg-zinc-900/40 p-7">
                <h3 className="font-serif text-xl font-semibold">Free</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold">$0</span>
                  <span className="text-sm text-zinc-500">forever</span>
                </div>
                <p className="mt-3 text-sm text-zinc-400">
                  The scaffolder. Lead-magnet by design.
                </p>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {[
                    "mcp-anvil new (Python + TypeScript)",
                    "Working sample tools, manifest, tests",
                    "Dockerfile included",
                    "Demo mode for audit + inspect",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-zinc-500" strokeWidth={2} />
                      <span className="text-zinc-300">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Personal */}
              <div className="rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-cyan-500/[0.06] via-zinc-900/40 to-zinc-900/40 p-7 ring-1 ring-cyan-500/20">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-semibold">Personal</h3>
                  <span className="rounded-full bg-cyan-500/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-cyan-300">
                    Most popular
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold">$29</span>
                  <span className="text-sm text-zinc-500">one-time</span>
                </div>
                <p className="mt-3 text-sm text-zinc-400">
                  Everything in Free, plus the paid commands.
                </p>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {[
                    "mcp-anvil audit (21 rules, HTML report)",
                    "mcp-anvil inspect (live playground)",
                    "1 developer · 1 year of updates",
                    "Run anywhere — offline-friendly",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-400" strokeWidth={2} />
                      <span className="text-zinc-200">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={POLAR_PERSONAL_URL}
                  className="mt-7 inline-flex w-full items-center justify-center rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-400"
                >
                  Get personal — $29
                </Link>
              </div>

              {/* Team */}
              <div className="rounded-2xl border border-zinc-800/70 bg-zinc-900/40 p-7">
                <h3 className="font-serif text-xl font-semibold">Team</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold">$99</span>
                  <span className="text-sm text-zinc-500">one-time</span>
                </div>
                <p className="mt-3 text-sm text-zinc-400">
                  Everything in Personal, plus 5 seats.
                </p>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {[
                    "5 developer seats",
                    "Priority audit-rule additions",
                    "Direct email support",
                    "1 year of updates",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-zinc-500" strokeWidth={2} />
                      <span className="text-zinc-300">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={POLAR_TEAM_URL}
                  className="mt-7 inline-flex w-full items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-zinc-100 transition hover:bg-zinc-800"
                >
                  Get team — $99
                </Link>
              </div>
            </div>
            <p className="mt-8 text-center text-xs text-zinc-500">
              VAT/sales tax handled by Polar.sh. 14-day refund on email request.
            </p>
          </Container>
        </section>

        {/* Stats */}
        <section className="py-16">
          <Container size="lg">
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { value: "21", label: "audit rules", note: "12 static + 9 runtime" },
                { value: "3", label: "transports", note: "stdio · streamable-http · sse" },
                { value: "<2s", label: "audit median", note: "on a typical 5-tool server" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-zinc-800/70 bg-zinc-900/30 p-6 text-center"
                >
                  <div className="font-mono text-3xl font-semibold text-cyan-400">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm font-medium text-zinc-200">
                    {stat.label}
                  </div>
                  <div className="mt-1 text-xs text-zinc-500">{stat.note}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section className="surface-alt py-20 sm:py-24">
          <Container size="lg">
            <div className="text-center">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400">
                FAQ
              </span>
              <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Predictable questions, answered.
              </h2>
            </div>
            <dl className="mt-12 space-y-4">
              {FAQ.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-xl border border-zinc-800/70 bg-zinc-900/40"
                >
                  <summary className="cursor-pointer list-none px-5 py-4 text-sm font-medium text-zinc-100 transition-colors hover:text-cyan-300 [&::-webkit-details-marker]:hidden">
                    <span className="mr-2 text-cyan-400 group-open:text-cyan-300">
                      ›
                    </span>
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
        <section className="py-20 sm:py-24">
          <Container size="lg">
            <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/[0.06] via-zinc-950 to-zinc-950 p-10 text-center sm:p-14">
              <Gauge className="mx-auto h-8 w-8 text-cyan-400" strokeWidth={1.75} />
              <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Stop hand-rolling MCP plumbing.
              </h2>
              <p className="mt-4 mx-auto max-w-xl text-zinc-400">
                Scaffold, audit, and inspect in one CLI. 14-day free trial on
                first launch. Activate a license when you're convinced.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href={POLAR_PERSONAL_URL}
                  className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-400"
                >
                  Get personal — $29
                </Link>
                <Link
                  href={POLAR_TEAM_URL}
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-5 py-2.5 text-sm font-medium text-zinc-200 hover:bg-zinc-900"
                >
                  Get team — $99
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

export const metadata = {
  title: "MCP Anvil — scaffold, audit, inspect Model Context Protocol servers",
  description:
    "The missing toolbox for MCP server authors. One CLI: scaffold a server, run a 21-rule security audit, open a live tool playground. $29 personal, $99 team.",
};
