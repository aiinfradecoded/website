import { ArrowUpRight, MapPin, Calendar, Mail } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";

import { Container } from "@/app/_components/Container";
import { Footer } from "@/app/_components/Footer";
import { Logo } from "@/app/_components/Logo";
import { Nav } from "@/app/_components/Nav";

export const metadata = {
  title: "About",
  description:
    "AI Infra Decoded is a small Atlanta-based team shipping production AI infrastructure. MCP Anvil for MCP server tooling, AgentForge for production agent stacks.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero — centered, editorial */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden />
          <Container size="md" className="relative pt-24 pb-14 text-center sm:pt-28">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400">
              About AI Infra Decoded
            </span>
            <h1 className="mt-4 text-balance font-serif text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              Production AI infrastructure, built with care.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-zinc-400">
              AI Infra Decoded is a small Atlanta team shipping production-grade AI
              infrastructure for senior engineers. Research, tooling, and a flagship
              boilerplate (AgentForge), designed to plug into the API keys you already
              have, or run keyless on your own hardware via Ollama or vLLM.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-2 text-sm text-zinc-400">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-cyan-400" /> Established 2024
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-cyan-400" /> Atlanta, GA · USA
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Mail className="h-4 w-4 text-cyan-400" />
                <a href="mailto:team@aiinfradecoded.com" className="hover:text-zinc-100">
                  team@aiinfradecoded.com
                </a>
              </span>
            </div>
          </Container>
        </section>

        {/* Team note */}
        <Container size="md" className="pb-20">
          <article className="rounded-2xl border border-zinc-800/50 bg-zinc-900/40 p-8 sm:p-12">
            <div className="flex items-center gap-4">
              <span aria-hidden>
                <Logo size={42} />
              </span>
              <div>
                <div className="font-serif text-lg font-semibold">A note from the team</div>
                <div className="text-sm text-zinc-500">AI Infra Decoded · Atlanta, GA</div>
              </div>
            </div>
            <div className="mt-7 space-y-5 text-[15.5px] leading-relaxed text-zinc-300">
              <p>
                Every AI side-project we shipped started the same way. Stitch Stripe
                webhooks together from one blog post. Pull RAG from a second. Find an
                eval harness on someone's gist. Wire observability from a fourth source.
                Then pray nothing broke at 2 AM.
              </p>
              <p>
                Every starter kit promised to short-circuit this. None of them really did.
                Half left the production-critical pieces marked "coming soon." The other
                half bundled too much and worked at none of it.
              </p>
              <p>
                So we sat down and built the foundation we&apos;d been hacking together
                for years. Tightly scoped. Deeply tested. Honest about what's in and
                what isn't.
              </p>
              <p>
                On inference, you pick the path. AgentForge ships ready to use the API
                keys you already have, whether that's Anthropic, OpenAI, or Gemini. The
                bill goes from your provider straight to you, and our keys are never in
                the loop. If you&apos;d rather skip API keys entirely, the same code path
                runs keyless against <strong>Ollama</strong> or <strong>vLLM</strong> on
                your own hardware. Your call.
              </p>
              <p>
                AgentForge is the kit we wish we&apos;d had when we started. 360+ tests,
                months of iteration, no roadmap-as-a-feature. The newsletter and YouTube
                are where we publish the research behind every decision.
              </p>
              <p>
                If you&apos;re a senior engineer who&apos;d rather build your product
                than rewire your dependencies, this is for you. The team email is up
                there. Every message gets read.
              </p>
              <p className="pt-2 text-zinc-500">— The AI Infra Decoded team</p>
            </div>
          </article>
        </Container>

        {/* Editorial standards */}
        <Container size="md" className="pb-20">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400">
            How we operate
          </span>
          <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Editorial standards.
          </h2>
          <p className="mt-4 max-w-2xl text-zinc-400">
            We write a lot of public material: newsletter, YouTube, docs. These are
            the rules we hold ourselves to.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                h: "Honest scope",
                b:
                  "Every product page lists what's included AND what's deliberately not. No 'coming soon' as a feature.",
              },
              {
                h: "Real benchmarks",
                b:
                  "Numbers we publish are reproducible from the public repo. Eval pass rates, latency, cost. Show your work.",
              },
              {
                h: "No paid placement",
                b:
                  "We don't accept sponsored mentions in product reviews or boilerplate comparisons. Affiliate disclosure on every link.",
              },
            ].map((x) => (
              <article
                key={x.h}
                className="rounded-xl border border-zinc-800/50 bg-zinc-950/40 p-6"
              >
                <h3 className="font-serif text-lg font-semibold text-zinc-100">{x.h}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{x.b}</p>
              </article>
            ))}
          </div>
        </Container>

        {/* What we ship */}
        <Container size="md" className="pb-20">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400">
            Surfaces
          </span>
          <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            What we publish.
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                h: "AgentForge",
                tag: "Product",
                b:
                  "The flagship boilerplate. FastAPI + Next.js 15 + LiteLLM + pgvector. One purchase, source-available commercial license.",
                href: "/pricing",
                external: false,
              },
              {
                h: "Newsletter",
                tag: "Weekly",
                b:
                  "Production AI infrastructure essays. What we learned, what we'd build differently, what we ripped out. Free.",
                href: "https://aiinfradecoded.beehiiv.com",
                external: true,
              },
              {
                h: "YouTube",
                tag: "Long-form",
                b:
                  "Deep-dive documentary-style breakdowns of stack decisions in real shipped products. Long enough to actually answer the why.",
                href: "https://www.youtube.com/@aiinfradecoded",
                external: true,
              },
            ].map((x) => (
              <article
                key={x.h}
                className="flex flex-col rounded-xl border border-zinc-800/50 bg-zinc-950/40 p-6"
              >
                <span className="text-[11px] font-semibold uppercase tracking-widest text-cyan-400">
                  {x.tag}
                </span>
                <h3 className="mt-2 font-serif text-xl font-semibold text-zinc-100">
                  {x.h}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">{x.b}</p>
                {x.external ? (
                  <a
                    href={x.href}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-zinc-100 hover:text-cyan-300"
                  >
                    Visit <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <Link
                    href={x.href as Route}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-zinc-100 hover:text-cyan-300"
                  >
                    Visit <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </article>
            ))}
          </ul>
        </Container>

        {/* Press / contact CTA */}
        <Container size="sm" className="pb-24">
          <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 via-zinc-950 to-zinc-950 p-10 text-center accent-glow">
            <h2 className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
              Press, partnerships, or a question?
            </h2>
            <p className="mt-3 text-zinc-400">
              Email goes straight to me. Median reply time is under one business day.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href="mailto:team@aiinfradecoded.com"
                className="rounded-lg bg-zinc-100 px-5 py-3 text-sm font-medium text-zinc-950 hover:bg-white"
              >
                team@aiinfradecoded.com
              </a>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
