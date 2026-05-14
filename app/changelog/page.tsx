import { Container } from "@/app/_components/Container";
import { Footer } from "@/app/_components/Footer";
import { Nav } from "@/app/_components/Nav";

export const metadata = {
  title: "Changelog",
  description: "Release notes for AI Infra Decoded products — MCP Anvil + AgentForge.",
};

interface Release {
  // Product tag drives the colored chip + filtering. New entries should
  // be added at the top of the list (newest first).
  product: "MCP Anvil" | "AgentForge";
  version: string;
  date: string;
  tone: "release" | "patch";
  title: string;
  body: string;
  items: string[];
}

const RELEASES: Release[] = [
  {
    product: "MCP Anvil",
    version: "v0.2.0",
    date: "2026-05-14",
    tone: "release",
    title: "Platform: daemon + dashboard + 64 built-in tools",
    body:
      "The CLI grew into a local platform. A long-lived daemon hosts every MCP server you register, a browser dashboard runs on 127.0.0.1:7820, and the built-in toolkit jumped from 7 to 64 tools. One-click import from Claude Desktop / Claude Code / Cursor configs.",
    items: [
      "Long-lived daemon on 127.0.0.1:7820 with REST + WebSocket API",
      "Browser dashboard — Servers, Tools, Templates, Saved Calls, Prompts, History, Events, Help",
      "64 built-in tools across 6 categories: filesystem, docs (PDF/Excel/CSV/JSON/YAML), networking (DNS/ports/SSL/scraping), system (CPU/mem/PowerShell), security (hash/JWT/secret-scan), dev workflow",
      "Import existing MCP servers from Claude Desktop / Claude Code / Cursor / .mcp.json (stdio only; HTTP/SSE flagged)",
      "Portable template bundles — export server + custom tools + prompts as one .anvil-template.json",
      "+ New tool form in the dashboard: scaffold Python, hot-reload anvil-custom server",
      "Default-server protection: anvil-builtin + anvil-custom can't be deleted; self-healing command paths after env moves",
      "Branded CLI: pixel-art logo, interactive setup wizard, dashboard URL displayed everywhere",
      "303 tests — unit + stress + concurrency + failure-mode coverage",
      "Help & guides tab with full reference: connection guides for Claude / OpenAI / Gemini, every Settings field, REST API, CLI surface",
    ],
  },
  {
    product: "AgentForge",
    version: "v1.0.0",
    date: "2026-04-15",
    tone: "release",
    title: "Initial release",
    body:
      "AgentForge ships v1 with the full production-grade stack: tier-routed LLM, multi-turn streaming, hybrid RAG, eval harness, billing webhooks, and 360+ tests across the suite.",
    items: [
      "FastAPI 0.115 backend with SQLAlchemy 2 + asyncpg",
      "Next.js 15 App Router frontend with Tailwind 4 + Clerk",
      "LiteLLM tier router (local-small / local-large / frontier) with frontier fallback",
      "Multi-turn streaming chat over SSE, persisted to Postgres",
      "Hybrid pgvector + pg_trgm document search",
      "LLM-judge eval harness with golden inputs and CI gate",
      "Stripe + Polar webhook scaffolding with HMAC verification",
      "Per-plan rate limiting via Postgres",
      "Self-hosted Langfuse observability included in docker-compose",
    ],
  },
  {
    product: "AgentForge",
    version: "v0.9.0",
    date: "2026-03-22",
    tone: "release",
    title: "Beta: eval harness + rate limiting",
    body:
      "Final beta before v1. Added the LLM-judge eval harness with CI gate, per-plan rate limiting middleware, and finished the auth flow with Clerk JWKS verification.",
    items: [
      "Eval harness scaffolded with LLM-judge pattern",
      "pytest CI gate (>5% pass-rate drop fails the build)",
      "Per-plan rate limiting middleware",
      "Clerk JWKS verification with 24h key cache",
      "Stripe + Polar billing webhooks (HMAC verified)",
    ],
  },
  {
    product: "AgentForge",
    version: "v0.8.0",
    date: "2026-03-01",
    tone: "release",
    title: "Beta: hybrid RAG + observability",
    body:
      "Added the hybrid pgvector + pg_trgm document search and self-hosted Langfuse tracing across every LiteLLM call.",
    items: [
      "Hybrid pgvector + pg_trgm search",
      "Document upload + Ollama embedding pipeline",
      "Self-hosted Langfuse in docker-compose",
      "Cost + latency tracing on every LLM call",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden />
          <Container size="md" className="relative pt-20 pb-12">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400">
              Release history
            </span>
            <h1 className="mt-3 text-balance font-serif text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              Changelog
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-lg text-zinc-400">
              Every shipped release across AI Infra Decoded products — MCP Anvil
              and AgentForge. Patches and minor updates are included with the
              original purchase per your tier's update window.
            </p>
          </Container>
        </section>

        <Container size="md" className="pb-24">
          <ol className="relative border-l border-zinc-800 pl-8">
            {RELEASES.map((r, i) => (
              <li key={r.version} className={i === 0 ? "" : "mt-12"}>
                <span
                  className={`absolute -left-[7px] flex h-3.5 w-3.5 items-center justify-center rounded-full border ${
                    r.tone === "release"
                      ? "border-cyan-400 bg-cyan-500/30"
                      : "border-zinc-700 bg-zinc-900"
                  }`}
                  aria-hidden
                />
                <div className="flex flex-wrap items-baseline gap-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${
                      r.product === "MCP Anvil"
                        ? "border border-cyan-500/40 bg-cyan-500/10 text-cyan-300"
                        : "border border-zinc-700 bg-zinc-900 text-zinc-400"
                    }`}
                  >
                    {r.product}
                  </span>
                  <span className="font-serif text-2xl font-semibold tracking-tight">
                    {r.version}
                  </span>
                  <span className="font-mono text-xs text-zinc-500">{r.date}</span>
                </div>
                <h2 className="mt-2 font-serif text-lg text-zinc-100">{r.title}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
                  {r.body}
                </p>
                <ul className="mt-4 grid gap-2 text-sm text-zinc-300 sm:grid-cols-2">
                  {r.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        aria-hidden
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/80"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <p className="mt-12 text-xs text-zinc-500">
            For older history (alpha / pre-public), see the public Git tags in the repo.
          </p>
        </Container>
      </main>
      <Footer />
    </>
  );
}
