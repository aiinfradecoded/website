import { Container } from "@/app/_components/Container";
import { Footer } from "@/app/_components/Footer";
import { Nav } from "@/app/_components/Nav";

export const metadata = {
  title: "Changelog",
  description: "AgentForge release notes. What shipped, when, and why.",
};

interface Release {
  version: string;
  date: string;
  tone: "release" | "patch";
  title: string;
  body: string;
  items: string[];
}

const RELEASES: Release[] = [
  {
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
              Every shipped release of AgentForge. Patches and minor updates included
              with the original purchase per your tier's update window.
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
