import { ArrowUpRight, CheckCircle2, Clock, Github, Mail } from "lucide-react";
import Link from "next/link";

import { Container } from "@/app/_components/Container";
import { Footer } from "@/app/_components/Footer";
import { Logo } from "@/app/_components/Logo";
import { Nav } from "@/app/_components/Nav";

import { OrderRef } from "./OrderRef";

export const metadata = {
  title: "Thanks — your AgentForge purchase",
  description:
    "Thanks for purchasing AgentForge. Your GitHub repo invite arrives within 4 hours.",
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero — centered confirmation */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden />
          <Container size="md" className="relative pt-24 pb-12 text-center sm:pt-28">
            <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/[0.08] accent-glow">
              <CheckCircle2 className="h-6 w-6 text-cyan-300" strokeWidth={2.25} />
            </span>
            <h1 className="mt-6 text-balance font-serif text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
              Welcome to AgentForge.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-zinc-400">
              Your purchase went through. Your receipt should already be in your inbox
              from Polar. Here&apos;s what happens next.
            </p>
            <OrderRef />
          </Container>
        </section>

        {/* What happens next */}
        <Container size="md" className="pb-12">
          <ol className="space-y-4">
            {[
              {
                icon: Mail,
                title: "Receipt in your inbox",
                body: "Polar just sent you a receipt and a tax-compliant invoice. If you don't see it, check spam, then ping us at team@aiinfradecoded.com.",
                meta: "Already done",
              },
              {
                icon: Github,
                title: "GitHub repo invite within 4 hours",
                body: "We invite you as a collaborator on the private AgentForge repo, sent to the email on your Polar order. Accept the invite, then `git clone` and you're off.",
                meta: "Within 4 business hours",
              },
              {
                icon: Clock,
                title: "Setup walkthrough",
                body: "The repo's README walks you from `git clone` to a running dashboard in about 90 minutes. If you get stuck, the team email is always the fastest path.",
                meta: "Self-serve",
              },
            ].map(({ icon: Icon, title, body, meta }) => (
              <li
                key={title}
                className="grid gap-4 rounded-xl border border-zinc-800/40 bg-white/[0.012] p-6 sm:grid-cols-[44px_minmax(0,1fr)_auto] sm:items-start"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800/50 bg-zinc-950 text-cyan-400">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-zinc-100">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                    {body}
                  </p>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 sm:pt-2">
                  {meta}
                </span>
              </li>
            ))}
          </ol>
        </Container>

        {/* Support card */}
        <Container size="md" className="pb-20">
          <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/[0.04] via-zinc-950 to-zinc-950 p-8 sm:p-10 accent-glow">
            <div className="flex items-center gap-3">
              <Logo size={28} />
              <span className="font-serif text-lg font-semibold">
                Need anything? Just email.
              </span>
            </div>
            <p className="mt-4 max-w-2xl text-zinc-400">
              We read every message. Setup questions and suggestions for the kit —
              same inbox, same humans on the other end.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="mailto:team@aiinfradecoded.com"
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-white"
              >
                team@aiinfradecoded.com
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link
                href="/changelog"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-800/50 bg-zinc-900/40 px-5 py-3 text-sm font-medium text-zinc-100 transition hover:border-zinc-700 hover:bg-zinc-900"
              >
                See what&apos;s shipped
              </Link>
            </div>
            <p className="mt-6 text-xs text-zinc-500">
              The license file lives at the root of the repo once you accept the invite.
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
