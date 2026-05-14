import {
  ArrowUpRight,
  Box,
  CheckCircle2,
  CircuitBoard,
  Cpu,
  Download,
  FileText,
  Gauge,
  Globe,
  Import,
  Layers,
  Network,
  Package,
  Server,
  Shield,
  ShieldAlert,
  Sparkles,
  Terminal,
  Wrench,
} from "lucide-react";
import Link from "next/link";

import { Container } from "@/app/_components/Container";
import { Footer } from "@/app/_components/Footer";
import { Nav } from "@/app/_components/Nav";

// Polar checkout links. Set per environment via the marketing-site env vars;
// fall back to mailto for the period before the checkout SKUs exist.
const POLAR_PERSONAL_URL =
  process.env.NEXT_PUBLIC_POLAR_MCPANVIL_PERSONAL_URL ||
  "mailto:hello@aiinfradecoded.com?subject=MCP%20Anvil%20Personal%20(%2429)";
const POLAR_TEAM_URL =
  process.env.NEXT_PUBLIC_POLAR_MCPANVIL_TEAM_URL ||
  "mailto:hello@aiinfradecoded.com?subject=MCP%20Anvil%20Team%20(%2499)";

// What you actually get — five top-level pieces. The product is bigger than
// the original 3-command CLI; this grid is how we tell that story without
// drowning the buyer in feature soup.
const PILLARS = [
  {
    icon: Server,
    name: "Local daemon",
    blurb:
      "A long-lived process on 127.0.0.1:7820. Hosts every MCP server you register, exposes a stable REST + WebSocket API, and broadcasts live tool-call events. One address for every LLM client to talk to.",
  },
  {
    icon: Layers,
    name: "Browser dashboard",
    blurb:
      "A no-install web UI on the same port. Browse tools, call them from forms, manage prompts, audit history, import templates, read connection guides — all without leaving the browser.",
  },
  {
    icon: Wrench,
    name: "64 built-in tools",
    blurb:
      "Filesystem, shell, HTTP, git, docs (PDF/Excel/CSV/JSON/YAML/TOML), networking (DNS/ports/SSL/scraping), system (CPU/memory/PowerShell), security (hashing/JWT/secret-scanning), and dev helpers. Out of the box.",
  },
  {
    icon: Terminal,
    name: "Branded CLI",
    blurb:
      "Pixel-art logo, interactive setup wizard, every command Rich-formatted with consistent vocabulary. Run mcp-anvil to see your daemon state + dashboard URL at a glance.",
  },
  {
    icon: Network,
    name: "MCP router",
    blurb:
      "One bridge entry in your Claude Desktop / Claude Code config wires every daemon-managed tool into the host. Tool catalog refreshes live — no Claude restart for new tools.",
  },
];

// The 64-tool catalog, grouped. Categories are buyer-facing concepts that
// map directly to anvil-builtin's source files.
const TOOL_CATEGORIES = [
  {
    icon: FileText,
    name: "Core filesystem & process",
    count: 7,
    examples: "fs_read · fs_glob · fs_grep · shell_exec · http_fetch · git_status · run_pytest",
  },
  {
    icon: Box,
    name: "Document parsing",
    count: 12,
    examples: "pdf_extract · excel_read · csv_read · json_pretty · json_query (mini-jq) · yaml/toml/ini · markdown_to_text · image_metadata · file_signature",
  },
  {
    icon: Globe,
    name: "Networking & web",
    count: 11,
    examples: "dns_lookup · port_check · common_ports · ssl_cert_info · http_health · header_security_check · web_scrape · web_extract_links · robots_txt",
  },
  {
    icon: Cpu,
    name: "System & processes",
    count: 9,
    examples: "system_info · system_health · env_get (auto-mask secrets) · process_list · powershell_exec · run_command · disk_usage · env_path · which",
  },
  {
    icon: Shield,
    name: "Security & encoding",
    count: 13,
    examples: "base64 · url_encode · hash_text/file · hmac_sign · jwt_decode · find_secrets (AWS/GH/Slack/Stripe/OpenAI patterns) · entropy_check · regex_test · uuid · random_string",
  },
  {
    icon: CircuitBoard,
    name: "Developer workflow",
    count: 12,
    examples: "detect_language · code_count · find_todos · git_log/diff/branch · text_diff · file_diff · json_schema_validate · timestamp_now · fs_stat · fs_tree",
  },
];

const DASHBOARD_TABS = [
  { name: "Servers", body: "Register, start/stop, expand for description + tools + last-error + restart. Defaults are protected from deletion." },
  { name: "Tools", body: "Browse every tool grouped by server. Add custom tools with a one-click scaffold + live reload of the anvil-custom server." },
  { name: "Templates", body: "Portable server bundles. Export a server's config + custom tools + prompts as one JSON file; import elsewhere with target-override + skip/overwrite policies." },
  { name: "Saved Calls", body: "Pinned tool invocations you re-run by name. Useful for the long curl-equivalent you always forget." },
  { name: "Prompts", body: "Saved prompt bodies fetchable by id over the API. Fresh installs ship with four starter prompts to copy from." },
  { name: "History", body: "Every tool call across every server, merged and sorted newest-first. Click for the full request/response." },
  { name: "Events", body: "Live WebSocket stream of server lifecycle and tool-call completions. Watch what an agent is doing in real time." },
  { name: "Help & guides", body: "Hand-written reference: quickstart, troubleshooting, importing existing servers, every supported LLM client, settings, REST API, CLI surface." },
];

const IMPORT_SOURCES = [
  "Claude Desktop  →  claude_desktop_config.json",
  "Claude Code     →  ~/.claude.json + ./.claude/mcp.json",
  "Cursor          →  ~/.cursor/mcp.json",
  "Project-local   →  ./.mcp.json",
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
    blurb: "Adversarial probes ported into the fuzz phase of the audit.",
    href: "https://arxiv.org/abs/2406.13352",
  },
];

const FAQ = [
  {
    q: "Why a daemon? Why not just a CLI like mcp inspector?",
    a: "A daemon hosts every MCP server in one place, so your Claude Desktop, Claude Code, Cursor, and homegrown scripts all talk to the same address. Without it you re-register each server in every client. The dashboard is the visible piece, but the daemon is what makes 'one config entry in Claude Desktop → every tool' work.",
  },
  {
    q: "Can I bring my existing MCP servers?",
    a: "Yes. The Servers tab has an Import existing… button that reads your Claude Desktop / Claude Code / Cursor configs, lists every server it finds, and adds them with one click — env vars and all. stdio servers only for now; HTTP/SSE servers are flagged but not yet hostable.",
  },
  {
    q: "What's actually free vs. paid?",
    a: "Free: the scaffolder (mcp-anvil new) — it's the lead magnet, no license required, forever. Paid: audit, inspect, the daemon's full feature set, the dashboard. A 14-day trial unlocks everything on first run.",
  },
  {
    q: "Can I extend the built-in toolkit?",
    a: "Yes. The Tools tab has + New tool — pick a name, fill in a description, optionally paste Python, and the tool appears in anvil-custom immediately. The dashboard reloads the subprocess for you. Tool files live at ~/.mcp-anvil/tools/custom/.",
  },
  {
    q: "Templates? You mean saved tool calls?",
    a: "Two different concepts. Saved Calls (formerly called Templates) are pinned tool invocations. Templates are now portable server bundles — a single .anvil-template.json wraps a server's config + its custom tools + your prompts. Export from a server card, import on another machine, get the whole workflow back.",
  },
  {
    q: "What's a license, technically?",
    a: "Ed25519-signed JSON. Buyer pastes a base32 blob into mcp-anvil license activate (or the dashboard's setup wizard). The CLI verifies the signature against an embedded public key locally — no network call on the happy path. 30-day offline grace after the weekly revocation check.",
  },
  {
    q: "Source-available or closed binary?",
    a: "Closed binary, distributed via direct download + Homebrew + Scoop + npm wrapper + pipx wrapper. The audit ruleset and templates are inspectable in the bundled package once installed.",
  },
  {
    q: "What about TypeScript? Rust? Go?",
    a: "Python and TypeScript scaffolds ship at v1. Rust and Go are queued. The built-in toolkit and dashboard work the same regardless — they hit any stdio MCP server.",
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
                v0.2.0 · 64 built-in tools · 303 tests
              </div>
              <h1 className="text-balance font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                MCP Anvil —
                <br />
                <span className="text-cyan-400">a local MCP toolbox</span>
                <br />
                that hosts every server.
              </h1>
              <p className="mt-6 mx-auto max-w-2xl text-pretty text-lg text-zinc-400">
                One daemon on localhost. A browser dashboard. 64 tools out of
                the box. Import your existing MCP servers from Claude Desktop,
                Claude Code, and Cursor with one click. Connect Claude /
                ChatGPT / Gemini / anything HTTP through a single entry.
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
                  href="#pillars"
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-5 py-2.5 text-sm font-medium text-zinc-200 hover:border-zinc-700 hover:bg-zinc-900"
                >
                  See what's in the box
                </Link>
              </div>
              <p className="mt-6 text-xs text-zinc-500">
                14-day full-feature trial · no signup · works offline
              </p>
            </div>

            {/*
              Hero visual — the new CLI banner. Replaces the audit-output
              mock since the daemon + dashboard is the bigger story now.
              Pixel-anvil + wordmark + status block, mirrors what a buyer
              sees when they type `mcp-anvil` in their terminal.
            */}
            <div className="mt-14 mx-auto max-w-3xl">
              <div className="rounded-xl border border-zinc-800/70 bg-zinc-950 shadow-2xl shadow-cyan-500/[0.05] overflow-hidden">
                <div className="flex items-center gap-2 border-b border-zinc-800/70 bg-zinc-900/60 px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                  <span className="ml-3 font-mono text-[11px] text-zinc-500">
                    ~ — mcp-anvil
                  </span>
                </div>
                <pre className="px-6 py-5 font-mono text-[12.5px] leading-[1.7] text-zinc-300">
                  <span className="text-cyan-400">▼ mcp-anvil</span>{"\n"}
                  <span className="text-cyan-600">┌──────────────────────────────────────────────────────┐</span>{"\n"}
                  <span className="text-cyan-600">│</span>{"  "}
                  <span className="text-cyan-300">▗▄▄▄▄▄▄▄▄▄▄▄▄▄▄▖</span>{"    "}
                  <span className="font-semibold text-cyan-300">M C P   A N V I L</span>{"        "}
                  <span className="text-cyan-600">│</span>{"\n"}
                  <span className="text-cyan-600">│</span>{"  "}
                  <span className="text-cyan-300">▐ ╲▔▔▔▔▔▔▔▔▔▔╱ ▌</span>{"    "}
                  <span className="text-zinc-400">Build, audit, and orchestrate MCP servers locally.</span>{"  "}
                  <span className="text-cyan-600">│</span>{"\n"}
                  <span className="text-cyan-600">│</span>{"  "}
                  <span className="text-cyan-300">▐  ╲ ▆▆▆▆▆▆ ╱  ▌</span>{"                                              "}
                  <span className="text-cyan-600">│</span>{"\n"}
                  <span className="text-cyan-600">│</span>{"  "}
                  <span className="text-cyan-300">▐   ╲ ▆██▆ ╱   ▌</span>{"    "}
                  <span className="text-zinc-200">v0.2.0  </span>
                  <span className="text-zinc-600">•</span>{"  "}
                  <span className="text-green-400">●</span>
                  <span className="text-zinc-200"> daemon running  </span>
                  <span className="text-cyan-600">│</span>{"\n"}
                  <span className="text-cyan-600">│</span>{"  "}
                  <span className="text-cyan-300">▐    ╲▆▆▆▆╱    ▌</span>{"    "}
                  <span className="text-zinc-500">dashboard:  </span>
                  <span className="underline text-cyan-400">http://127.0.0.1:7820</span>{"  "}
                  <span className="text-cyan-600">│</span>{"\n"}
                  <span className="text-cyan-600">│</span>{"  "}
                  <span className="text-cyan-300">▐     ╲  ╱     ▌</span>{"                                              "}
                  <span className="text-cyan-600">│</span>{"\n"}
                  <span className="text-cyan-600">│</span>{"  "}
                  <span className="text-cyan-300">▐      ╲╱      ▌</span>{"                                              "}
                  <span className="text-cyan-600">│</span>{"\n"}
                  <span className="text-cyan-600">│</span>{"  "}
                  <span className="text-cyan-300">▝▀▀▀▀▀▀▀▀▀▀▀▀▀▀▘</span>{"                                              "}
                  <span className="text-cyan-600">│</span>{"\n"}
                  <span className="text-cyan-600">└──────────────────────────────────────────────────────┘</span>{"\n\n"}
                  <span className="text-cyan-500">── GET STARTED ─────────────────────────────────────────────</span>{"\n"}
                  {"  "}<span className="font-semibold text-cyan-300">mcp-anvil setup</span>{"          "}<span className="text-zinc-300">Interactive first-run wizard</span>{"\n"}
                  {"  "}<span className="font-semibold text-cyan-300">mcp-anvil new &lt;name&gt;</span>{"     "}<span className="text-zinc-300">Scaffold a new MCP server</span>{"\n"}
                  {"  "}<span className="font-semibold text-cyan-300">mcp-anvil daemon start</span>{"   "}<span className="text-zinc-300">Start the daemon + open dashboard</span>{"\n"}
                </pre>
              </div>
              <p className="mt-3 text-center text-xs text-zinc-500">
                The CLI on first run. Branded banner. Live daemon state. One-click dashboard.
              </p>
            </div>
          </Container>
        </section>

        {/* Five pillars — what's in the box */}
        <section id="pillars" className="surface-alt py-20 sm:py-24">
          <Container size="lg">
            <div className="text-center">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400">
                What's in the box
              </span>
              <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Five surfaces. One install.
              </h2>
              <p className="mt-4 mx-auto max-w-xl text-zinc-400">
                <code className="rounded bg-zinc-900 px-1.5 py-0.5 font-mono text-xs text-cyan-300">pip install mcp-anvil</code> and
                you get every piece below.
              </p>
            </div>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PILLARS.map(({ icon: Icon, name, blurb }) => (
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

        {/* Tool catalog — the 64 tools, grouped */}
        <section className="py-20 sm:py-24">
          <Container size="lg">
            <div className="text-center">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400">
                The built-in toolkit
              </span>
              <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                64 tools across six categories.
              </h2>
              <p className="mt-4 mx-auto max-w-2xl text-zinc-400">
                Everything an LLM agent needs to read a codebase, probe an
                endpoint, or decode a blob. Every tool is one async function
                with a JSON schema — call any of them from Claude, the
                dashboard, or curl.
              </p>
            </div>
            <div className="mt-14 grid gap-5 sm:grid-cols-2">
              {TOOL_CATEGORIES.map(({ icon: Icon, name, count, examples }) => (
                <div
                  key={name}
                  className="rounded-xl border border-zinc-800/70 bg-zinc-900/40 p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800/50 bg-zinc-950 text-cyan-400">
                        <Icon className="h-4 w-4" strokeWidth={1.75} />
                      </span>
                      <h3 className="font-serif text-base font-semibold text-zinc-100">
                        {name}
                      </h3>
                    </div>
                    <span className="rounded-md bg-cyan-500/10 px-2 py-0.5 font-mono text-xs font-semibold text-cyan-300">
                      {count}
                    </span>
                  </div>
                  <p className="mt-4 font-mono text-[11.5px] leading-relaxed text-zinc-400">
                    {examples}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-xs text-zinc-500">
              Plus a <code className="rounded bg-zinc-900 px-1 py-0.5 font-mono text-cyan-400">+ New tool</code> form
              in the dashboard. Write Python; reload runs automatically.
            </p>
          </Container>
        </section>

        {/* Import existing servers */}
        <section className="surface-alt py-20 sm:py-24">
          <Container size="lg">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400">
                  Already have MCP servers?
                </span>
                <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                  One-click import from Claude Desktop, Claude Code, Cursor.
                </h2>
                <p className="mt-4 text-zinc-400">
                  Anvil reads your existing client configs and lists every MCP
                  server it finds — name, command, args, env. Click <strong>Add</strong>
                  on any row to register it under anvil. Its tools appear in
                  the dashboard immediately; Claude sees them through the
                  router.
                </p>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {[
                    "stdio servers import end-to-end",
                    "HTTP/SSE servers flagged with a 'not yet supported' badge",
                    "id collision? Override with one tap",
                    "Bundle export ships custom tools + prompts alongside",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-400" strokeWidth={2} />
                      <span className="text-zinc-300">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="rounded-xl border border-zinc-800/70 bg-zinc-950 p-6 shadow-2xl shadow-cyan-500/[0.05]">
                  <div className="flex items-center gap-2 mb-4">
                    <Import className="h-4 w-4 text-cyan-400" />
                    <span className="font-mono text-xs uppercase tracking-widest text-cyan-300">
                      Detected sources
                    </span>
                  </div>
                  <ul className="space-y-2 font-mono text-[12px] text-zinc-400">
                    {IMPORT_SOURCES.map((src) => (
                      <li key={src} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-cyan-400">▶</span>
                        <span>{src}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Dashboard tabs */}
        <section className="py-20 sm:py-24">
          <Container size="lg">
            <div className="text-center">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400">
                The dashboard
              </span>
              <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Eight tabs. Everything anvil can do.
              </h2>
            </div>
            <div className="mt-14 grid gap-4 sm:grid-cols-2">
              {DASHBOARD_TABS.map(({ name, body }) => (
                <div
                  key={name}
                  className="rounded-lg border border-zinc-800/70 bg-zinc-900/30 p-5"
                >
                  <h3 className="font-mono text-sm font-semibold text-cyan-300">
                    {name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Receipts: arXiv sources (audit grounding) */}
        <section className="surface-alt py-20 sm:py-24">
          <Container size="lg">
            <div className="text-center">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400">
                Audit grounded in receipts
              </span>
              <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                The audit rules come from published research.
              </h2>
              <p className="mt-4 mx-auto max-w-xl text-zinc-400">
                Each of the 21 audit rules maps to a specific finding in the
                MCP fault corpus or AgentDojo benchmark. You see the citation
                on every report.
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
        <section className="py-20 sm:py-24">
          <Container size="lg">
            <div className="text-center">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400">
                Pricing
              </span>
              <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                One-time. Yours forever.
              </h2>
              <p className="mt-4 mx-auto max-w-xl text-zinc-400">
                14-day full-feature trial on first launch. After that, activate
                a license or stick with the free scaffolder.
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
                  Daemon + dashboard + all 64 tools + CLI.
                </p>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {[
                    "Full daemon + dashboard",
                    "64 built-in tools, every category",
                    "Import from Claude Desktop / Code / Cursor",
                    "Template bundle export / import",
                    "21-rule audit + live inspect",
                    "1 developer · 1 year of updates",
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
                <p className="mt-2 text-center text-[11px] text-zinc-500">
                  14-day refund, no questions
                </p>
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
                <p className="mt-2 text-center text-[11px] text-zinc-500">
                  14-day refund, no questions
                </p>
              </div>
            </div>
            <p className="mt-8 text-center text-xs text-zinc-500">
              VAT/sales tax handled by Polar.sh. 14-day refund on email request.
            </p>
          </Container>
        </section>

        {/* Stats */}
        <section className="surface-alt py-16">
          <Container size="lg">
            <div className="grid gap-6 sm:grid-cols-4">
              {[
                { value: "64", label: "built-in tools", note: "6 categories, ship by default" },
                { value: "21", label: "audit rules", note: "12 static + 9 runtime" },
                { value: "303", label: "tests", note: "unit + stress + integration" },
                { value: "4", label: "import sources", note: "Claude Desktop / Code / Cursor / local" },
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
        <section className="surface-alt py-20 sm:py-24">
          <Container size="lg">
            <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/[0.06] via-zinc-950 to-zinc-950 p-10 text-center sm:p-14">
              <Gauge className="mx-auto h-8 w-8 text-cyan-400" strokeWidth={1.75} />
              <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                One daemon. One dashboard. Every MCP server.
              </h2>
              <p className="mt-4 mx-auto max-w-xl text-zinc-400">
                Pip-install, run the setup wizard, point Claude at the router.
                14-day free trial. Activate a license when you're convinced.
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
  title: "MCP Anvil — a local MCP toolbox with 64 built-in tools",
  description:
    "Local MCP daemon + browser dashboard + 64 built-in tools. Import servers from Claude Desktop / Code / Cursor with one click. One CLI. $29 personal, $99 team.",
  alternates: { canonical: "/mcp-anvil" },
};
