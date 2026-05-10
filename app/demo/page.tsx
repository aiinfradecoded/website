"use client";

import {
  ArrowUpRight,
  CheckCircle2,
  Database,
  GaugeCircle,
  Layers,
  Lock,
  Minus,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Container } from "@/app/_components/Container";
import { Footer } from "@/app/_components/Footer";
import { MessageBubble } from "@/app/_components/MessageBubble";
import { Nav } from "@/app/_components/Nav";
import type { ChatMessage } from "@/app/_lib/types";

const CAPABILITIES = [
  {
    icon: Sparkles,
    title: "Streaming chat with persistence",
    body:
      "Multi-turn conversations over SSE, persisted to your Postgres on every turn. Replayable, auditable, and survives reconnects. Drop-in for support assistants, copilots, or internal tools.",
  },
  {
    icon: Database,
    title: "Hybrid RAG, no third parties",
    body:
      "pgvector cosine + pg_trgm trigram search blended into one query. Documents in, semantic + lexical matches out. No Pinecone bill, no cross-region calls, no extra moving parts.",
  },
  {
    icon: Layers,
    title: "Tier-routed LLM with fallback",
    body:
      "Three tiers (local-small / local-large / frontier) routed through LiteLLM. Frontier outage? Drops to local automatically. Same code path whether you bring API keys or run keyless on Ollama / vLLM.",
  },
  {
    icon: GaugeCircle,
    title: "LLM-judge eval harness",
    body:
      "Golden inputs and a judge-prompt evaluator wired to pytest. CI gate fails the build if your pass-rate drops more than 5%. Confidence to refactor your prompts and ship.",
  },
  {
    icon: ShieldCheck,
    title: "Production auth + billing",
    body:
      "Clerk JWKS verification with cached keys. Polar + Stripe webhooks with idempotent fulfillment and audit logs. Real production patterns, not dev-mode placeholders.",
  },
  {
    icon: Rocket,
    title: "Docker Compose + observability",
    body:
      "Postgres + pgvector + Ollama up with one command. Self-hosted Langfuse traces every LLM call for cost and latency. Your prompts never leave your infra.",
  },
];

const USE_CASES = [
  {
    title: "Indie SaaS founders",
    body:
      "Skip 1-2 weeks of plumbing. Ship your AI product on a foundation that already handles auth, billing, streaming, RAG, and rate limiting.",
  },
  {
    title: "Senior engineers replacing $300+/mo OpenAI bills",
    body:
      "Run the same code path locally on Ollama or vLLM. Same UI, same eval suite, same database — minus the per-token cost.",
  },
  {
    title: "Consultants shipping AI for clients",
    body:
      "Each engagement starts with a vetted, tested base. Commercial license covers unlimited paid client work; no need to rebuild the boring 80% on every project.",
  },
  {
    title: "Teams owning their AI infra",
    body:
      "Source-available, fork-friendly, no telemetry sent back. Audit the entire data flow. Deploy where you want — Hetzner, your own datacenter, or stay on the home box behind Cloudflare Tunnel.",
  },
];

const TIER_DIFF: { label: string; hobby: boolean | string; pro: boolean | string }[] = [
  { label: "Full source code under commercial license", hobby: true, pro: true },
  { label: "Streaming chat + multi-turn persistence", hobby: true, pro: true },
  { label: "Hybrid pgvector + pg_trgm RAG", hobby: true, pro: true },
  { label: "LLM-judge eval harness", hobby: true, pro: true },
  { label: "Docker Compose local stack", hobby: true, pro: true },
  { label: "Self-hosted Langfuse observability", hobby: true, pro: true },
  { label: "Production Clerk JWKS verification", hobby: false, pro: true },
  { label: "Stripe + Polar webhook implementations", hobby: false, pro: true },
  { label: "Per-plan rate limiting middleware", hobby: false, pro: true },
  { label: "Hetzner / Vercel / Fly.io deploy templates", hobby: false, pro: true },
  { label: "24-prompt library (sales, content, eval)", hobby: false, pro: true },
  { label: "Updates duration", hobby: "90 days", pro: "1 year" },
  { label: "Priority email support (24h response)", hobby: false, pro: true },
];

/**
 * Public preview of the AgentForge streaming chat. Uses scripted, deterministic
 * responses so the demo works without our backend running. The same UI ships
 * inside the kit at /dashboard, where it streams from your own LLM tier.
 */

interface ScriptedReply {
  content: string;
  model: string;
  tier: string;
  /** Total time the response should take to stream in (ms). */
  durationMs: number;
}

const SUGGESTIONS = [
  {
    label: "What is AgentForge?",
    prompt: "What is AgentForge and what does it include?",
  },
  {
    label: "Show me the streaming chat",
    prompt: "Walk me through how the streaming chat works.",
  },
  {
    label: "How does the RAG search work?",
    prompt: "How does the hybrid RAG search work?",
  },
  {
    label: "Why pay $99 / $249?",
    prompt: "Why would I pay $99 or $249 for a boilerplate?",
  },
];

const SCRIPT: Record<string, ScriptedReply> = {
  "what is agentforge and what does it include?": {
    model: "ollama/llama3.1:70b",
    tier: "local-large",
    durationMs: 4200,
    content: `**AgentForge** is a production-grade boilerplate for shipping AI products. One purchase, source-available commercial license.

**What's wired:**

- **Tier-routed LLM** — LiteLLM router with local-small / local-large / frontier tiers and automatic fallback if the frontier provider is down.
- **Multi-turn streaming chat** — \`POST /chat/stream\` over SSE with \`meta\`, \`token\`, \`done\`, and \`error\` events. Persists to Postgres for audit + replay.
- **Hybrid RAG** — pgvector cosine + pg_trgm trigram search blended together. No Pinecone, no Weaviate.
- **LLM-judge eval harness** — golden inputs, persisted runs, pytest CI gate that fails on >5% pass-rate drop.
- **Self-hosted Langfuse** — every LLM call traced for cost + latency. Your prompts never leave your infra.
- **Clerk JWKS auth + Stripe/Polar webhooks** — production-honest, not dev-mode placeholders.

It's the stack a senior dev would build by hand on day one — already built, tested across 360+ tests, and licensed for unlimited internal projects.`,
  },
  "walk me through how the streaming chat works.": {
    model: "ollama/llama3.1:70b",
    tier: "local-large",
    durationMs: 3600,
    content: `Sure. The streaming chat path is one of the highest-leverage features in the kit. Here's the data flow:

\`\`\`
Browser → POST /api/chat/stream  (Next.js route handler)
        → Forward to FastAPI :8000/chat/stream  (Clerk-authed)
        → FastAPI calls litellm.acompletion(stream=True)
        → SSE events: meta → token* → done | error
\`\`\`

**Event types:**

1. \`meta\` — fired once at start. Contains \`conversation_id\`, \`message_id\`, \`model\`, \`tier\`. Browser uses this to render the empty assistant bubble + cursor.
2. \`token\` — fired per chunk. Just \`{delta: "..."}\`. Browser appends to the message body.
3. \`done\` — fired when the model finishes. Includes final \`latency_ms\`. Browser swaps the streaming cursor for the model badge.
4. \`error\` — fired if the model errors mid-stream. Browser shows a red banner without losing partial output.

The persistence layer writes the user message **before** calling the model and the assistant message **after** completion, so every conversation is replayable from the database without relying on the model provider's history.`,
  },
  "how does the hybrid rag search work?": {
    model: "ollama/llama3.1:70b",
    tier: "local-large",
    durationMs: 3200,
    content: `Two retrievers, one query, one ranking pass.

**Step 1 — semantic** (pgvector cosine):

\`\`\`sql
SELECT id, 1 - (embedding <=> $1) AS sim
FROM document_chunks
ORDER BY embedding <=> $1
LIMIT 20;
\`\`\`

**Step 2 — exact** (pg_trgm similarity):

\`\`\`sql
SELECT id, similarity(content, $1) AS sim
FROM document_chunks
WHERE content % $1
ORDER BY sim DESC
LIMIT 20;
\`\`\`

**Step 3 — fuse + rerank.** The two result sets are merged, deduped by chunk id, and the score becomes \`0.6 * vector_sim + 0.4 * trigram_sim\`. The top-k is what gets passed to the LLM as context.

This catches both "what does the customer mean" (semantic) and "they used the exact term \`pg_trgm\`" (lexical) in one shot. It's also one Postgres roundtrip per query — no cross-region call to a vector DB, no monthly Pinecone bill.`,
  },
  "why would i pay $99 or $249 for a boilerplate?": {
    model: "ollama/llama3.1:70b",
    tier: "local-large",
    durationMs: 3000,
    content: `Honest answer: you're paying for time, not lines of code.

**The math:** every senior engineer wires the same six things on day one of an AI project — auth, billing webhooks, streaming chat, RAG, eval harness, observability. Each of those is one to two weeks to do correctly. Six features × 1.5 weeks average × your hourly rate = $4k–$10k of your own time.

**Hobby ($99)** gives you the source code with everything wired and tested. You skip the wiring weeks.

**Pro ($249)** also gives you the production-readiness items — real Clerk JWKS verification, Stripe + Polar webhook implementations, deploy templates, rate limiting, and 1 year of updates on the main branch.

**What you're NOT paying for:** an open-source license. The kit is source-available with a commercial license — you can use it in unlimited paid client work, fold it into a SaaS, modify it however you want. You just can't repackage and resell the unmodified kit itself.`,
  },
};

const FALLBACK: ScriptedReply = {
  model: "ollama/llama3.1:70b",
  tier: "local-large",
  durationMs: 2400,
  content: `This is the **public preview** — questions answered here come from a small scripted set so the demo works without the full backend running.

In the live app at \`/dashboard\`, this would route to the LiteLLM tier router (\`local-large\` tier by default) and stream back over SSE in real time. The full conversation gets persisted to Postgres for audit and replay.

Want to ask one of the demo questions? Try:

- "What is AgentForge?"
- "Show me the streaming chat"
- "How does the RAG search work?"
- "Why pay $99 / $249?"

Or [grab AgentForge](/pricing) and run it against your own LLM.`,
};

function pickReply(prompt: string): ScriptedReply {
  return SCRIPT[prompt.trim().toLowerCase()] ?? FALLBACK;
}

export default function DemoPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  async function sendPrompt(prompt: string) {
    if (isStreaming || !prompt.trim()) return;
    setInput("");
    setIsStreaming(true);

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: prompt,
    };

    const reply = pickReply(prompt);
    const startTime = Date.now();
    const assistantId = `a-${Date.now()}`;
    const assistantMsg: ChatMessage = {
      id: assistantId,
      role: "assistant",
      content: "",
      model: reply.model,
      tier: reply.tier,
      streaming: true,
    };

    setMessages((m) => [...m, userMsg, assistantMsg]);

    const chunks = chunkText(reply.content, 4);
    const chunkInterval = Math.max(20, reply.durationMs / chunks.length);

    let accumulated = "";
    for (const chunk of chunks) {
      await new Promise((resolve) => setTimeout(resolve, chunkInterval));
      accumulated += chunk;
      setMessages((m) =>
        m.map((msg) =>
          msg.id === assistantId
            ? { ...msg, content: accumulated }
            : msg,
        ),
      );
    }

    setMessages((m) =>
      m.map((msg) =>
        msg.id === assistantId
          ? {
              ...msg,
              streaming: false,
              latencyMs: Date.now() - startTime,
            }
          : msg,
      ),
    );
    setIsStreaming(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    void sendPrompt(input);
  }

  return (
    <>
      <Nav />
      <main>
        <Container size="md" className="pt-12 pb-6">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400">
            Public preview
          </span>
          <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Try the streaming chat.
          </h1>
          <p className="mt-3 max-w-2xl text-zinc-400">
            This is the same UI shipped in <code className="font-mono text-zinc-300">/dashboard</code>{" "}
            after sign-up in the kit. Responses here come from a scripted set so the preview works without our
            backend running. The real version streams from your own LLM tier (local Ollama or a frontier provider).
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-zinc-800/50 bg-zinc-900/40 px-3 py-1 text-xs text-zinc-400">
            <Lock className="h-3 w-3" />
            <span>No sign-up required for this preview</span>
          </div>
        </Container>

        <Container size="md" className="pb-12">
          <div className="overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-950/40">
            <div className="flex items-center justify-between border-b border-zinc-800/50 bg-zinc-900/40 px-5 py-3">
              <div className="flex items-center gap-2 text-sm text-zinc-300">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                AgentForge demo
              </div>
              <div className="hidden items-center gap-3 text-xs text-zinc-500 sm:flex">
                <span className="font-mono">tier: local-large</span>
                <span aria-hidden>·</span>
                <span className="font-mono">model: llama3.1:70b</span>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="h-[460px] overflow-y-auto px-5 py-6"
            >
              {messages.length === 0 ? (
                <EmptyState onPick={(prompt) => void sendPrompt(prompt)} />
              ) : (
                <div className="space-y-4">
                  {messages.map((m) => (
                    <MessageBubble key={m.id} message={m} />
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex items-end gap-2 border-t border-zinc-800/50 bg-zinc-900/30 px-3 py-3"
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void sendPrompt(input);
                  }
                }}
                placeholder='Ask anything — try "What is AgentForge?"'
                rows={1}
                disabled={isStreaming}
                className="flex-1 resize-none rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:border-cyan-500/40 focus:outline-none focus:ring-1 focus:ring-cyan-500/40 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isStreaming || !input.trim()}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-950 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

          <p className="mt-4 text-xs text-zinc-500">
            What you&apos;re seeing: streaming token rendering, markdown + code highlighting, model badge with latency timestamp.
            The full <code className="font-mono text-zinc-300">/dashboard</code> in the kit adds: persistent
            conversation history (sidebar), multi-turn context, document upload + hybrid RAG search,
            and Clerk-authenticated sessions.
          </p>
        </Container>

        {/* What the kit actually does */}
        <Container size="md" className="pb-12">
          <div className="text-center">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400">
              What you get
            </span>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              Six production patterns, wired once.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-pretty text-zinc-400">
              The streaming chat above is one slice. Here&apos;s everything that ships in
              the kit — the same code we run in our own production.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {CAPABILITIES.map(({ icon: Icon, title, body }) => (
              <article
                key={title}
                className="rounded-xl border border-zinc-800/50 bg-zinc-950/40 p-6"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800/50 bg-zinc-900 text-cyan-400">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 font-serif text-lg font-semibold text-zinc-100">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{body}</p>
              </article>
            ))}
          </div>
        </Container>

        {/* Who this is for */}
        <Container size="md" className="pb-12">
          <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-8 sm:p-10">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-cyan-400" strokeWidth={1.75} />
              <h2 className="font-serif text-2xl font-semibold tracking-tight">
                Who this is for
              </h2>
            </div>
            <p className="mt-3 max-w-2xl text-zinc-400">
              AgentForge is built for senior engineers who&apos;d rather skip the boilerplate
              and start shipping. If you&apos;ve already spent a week wiring auth, streaming,
              or webhook signatures by hand, you know the value of getting it right once.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {USE_CASES.map((u) => (
                <div key={u.title} className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400"
                    strokeWidth={2}
                  />
                  <div>
                    <h3 className="font-serif text-base font-semibold text-zinc-100">
                      {u.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-400">{u.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>

        {/* Hobby vs Pro — the real differences */}
        <Container size="md" className="pb-20">
          <div className="text-center">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400">
              Hobby vs Pro
            </span>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              What the extra <span className="text-cyan-300">$150</span> buys you.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-pretty text-zinc-400">
              Both tiers ship the full source code. Pro adds the production-readiness
              layer you&apos;d otherwise spend two weeks building yourself, plus the
              prompt library and a year of updates.
            </p>
          </div>
          <div className="mt-10 overflow-hidden rounded-xl border border-zinc-800/50">
            <table className="w-full text-sm">
              <thead className="bg-zinc-900/60 text-zinc-400">
                <tr>
                  <th className="px-5 py-3 text-left font-medium">Feature</th>
                  <th className="px-5 py-3 text-center font-medium">
                    Hobby <span className="font-mono text-zinc-500">· $99</span>
                  </th>
                  <th className="px-5 py-3 text-center font-medium text-cyan-300">
                    Pro <span className="font-mono text-cyan-500">· $249</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {TIER_DIFF.map((row) => (
                  <tr key={row.label} className="text-zinc-300">
                    <td className="px-5 py-3">{row.label}</td>
                    <Cell value={row.hobby} />
                    <Cell value={row.pro} accent />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-center text-xs text-zinc-500">
            Both tiers include a one-time purchase under our source-available commercial
            license — no subscription, no per-seat fees, no API keys of ours in the loop.
          </p>
        </Container>

        <Container size="md" className="pb-20">
          <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 via-zinc-950 to-zinc-950 p-8 sm:p-10">
            <h2 className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
              See enough? Grab the source.
            </h2>
            <p className="mt-3 max-w-2xl text-zinc-400">
              This UI ships in the kit. Wire it to your LLM tier in 90 minutes, deploy it to your
              own infra, and own the source.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-5 py-3 text-sm font-medium text-zinc-950 hover:bg-white"
              >
                See pricing
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-5 py-3 text-sm font-medium text-zinc-100 hover:border-zinc-700 hover:bg-zinc-900"
              >
                About AI Infra Decoded
              </Link>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

function EmptyState({ onPick }: { onPick: (prompt: string) => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="rounded-full border border-zinc-800 bg-zinc-900/60 p-3">
        <Sparkles className="h-5 w-5 text-cyan-400" />
      </div>
      <h3 className="mt-4 font-serif text-lg text-zinc-100">
        Ask the demo a question
      </h3>
      <p className="mt-1 max-w-sm text-sm text-zinc-500">
        Pick one to see streaming, markdown, and code rendering — or type your own.
      </p>
      <div className="mt-6 grid w-full max-w-md gap-2 sm:grid-cols-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s.label}
            onClick={() => onPick(s.prompt)}
            className="rounded-lg border border-zinc-800/50 bg-zinc-900/40 px-3 py-2 text-left text-sm text-zinc-300 transition hover:border-cyan-500/30 hover:bg-zinc-900/70 hover:text-zinc-100"
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Cell({ value, accent }: { value: boolean | string; accent?: boolean }) {
  if (typeof value === "string") {
    return (
      <td
        className={`px-5 py-3 text-center text-xs ${
          accent ? "text-cyan-300" : "text-zinc-300"
        }`}
      >
        {value}
      </td>
    );
  }
  return (
    <td className="px-5 py-3 text-center">
      {value ? (
        <CheckCircle2
          className={`mx-auto h-4 w-4 ${accent ? "text-cyan-400" : "text-zinc-300"}`}
          strokeWidth={2.5}
        />
      ) : (
        <Minus className="mx-auto h-4 w-4 text-zinc-700" strokeWidth={2.5} />
      )}
    </td>
  );
}

/** Split a long response into roughly N-char chunks, preserving word boundaries */
function chunkText(text: string, approxChunkSize: number): string[] {
  const chunks: string[] = [];
  let i = 0;
  while (i < text.length) {
    let end = Math.min(i + approxChunkSize, text.length);
    while (end < text.length && !/[\s\n]/.test(text[end])) end++;
    chunks.push(text.slice(i, end + 1));
    i = end + 1;
  }
  return chunks;
}
