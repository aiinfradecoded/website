import { CheckCircle2, Clock, Mail, Terminal } from "lucide-react";
import Link from "next/link";

import { Container } from "@/app/_components/Container";
import { Footer } from "@/app/_components/Footer";
import { Nav } from "@/app/_components/Nav";

/**
 * Post-purchase success page. Polar redirects buyers here after a paid order.
 *
 * For the first cohort (until the Polar webhook -> Cloudflare Worker
 * automation ships in Phase 2), licenses are issued by Nick by hand within
 * ~1 hour. The copy below sets that expectation honestly — "an actual human
 * is sending your key" reads better than fake automation that lags.
 */
export default function ThanksPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="surface-hero py-20 sm:py-28">
          <Container size="md">
            <div className="text-center">
              <div className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500/15 text-green-400 ring-1 ring-green-500/30">
                <CheckCircle2 className="h-7 w-7" strokeWidth={2} />
              </div>
              <h1 className="text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Thanks for buying MCP Anvil.
              </h1>
              <p className="mt-4 text-pretty text-lg text-zinc-400">
                Your payment cleared. Your license key is on its way.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {/* What's happening now */}
              <div className="rounded-xl border border-zinc-800/70 bg-zinc-900/40 p-6">
                <Clock className="h-5 w-5 text-cyan-400" strokeWidth={1.75} />
                <h3 className="mt-3 text-sm font-semibold text-zinc-100">
                  Within the next hour
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  We&apos;ll send your activation key to the email you used at
                  checkout. The first cohort gets keys issued by hand — that&apos;s
                  by design.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800/70 bg-zinc-900/40 p-6">
                <Mail className="h-5 w-5 text-cyan-400" strokeWidth={1.75} />
                <h3 className="mt-3 text-sm font-semibold text-zinc-100">
                  Check spam too
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  Email comes from{" "}
                  <code className="rounded bg-zinc-950 px-1.5 py-0.5 text-xs text-cyan-400">
                    hello@aiinfradecoded.com
                  </code>
                  . If nothing lands in 2 hours, reply to your Polar receipt and
                  we&apos;ll resend.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800/70 bg-zinc-900/40 p-6">
                <Terminal className="h-5 w-5 text-cyan-400" strokeWidth={1.75} />
                <h3 className="mt-3 text-sm font-semibold text-zinc-100">
                  While you wait
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  Install now and start the 14-day trial. Your license will
                  unlock when activated.
                </p>
              </div>
            </div>

            {/* Install instructions */}
            <div className="mt-12 rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/[0.04] via-zinc-900/40 to-zinc-900/40 p-6 sm:p-8">
              <h2 className="font-serif text-xl font-semibold">
                Quick start
              </h2>
              <p className="mt-2 text-sm text-zinc-400">
                These three commands get you from zero to a working,
                audited MCP server in under five minutes.
              </p>
              <pre className="mt-5 overflow-x-auto rounded-lg border border-zinc-800/70 bg-zinc-950 p-5 font-mono text-[13px] leading-relaxed text-zinc-300">
                <span className="text-zinc-500"># 1. Install (Python 3.11+)</span>
                {"\n"}
                <span className="text-cyan-400">$</span> pipx install mcp-anvil
                {"\n\n"}
                <span className="text-zinc-500"># 2. Once your key arrives by email</span>
                {"\n"}
                <span className="text-cyan-400">$</span> mcp-anvil license activate &quot;&lt;your-key&gt;&quot;
                {"\n\n"}
                <span className="text-zinc-500"># 3. Try it</span>
                {"\n"}
                <span className="text-cyan-400">$</span> mcp-anvil new my-first-server
                {"\n"}
                <span className="text-cyan-400">$</span> cd my-first-server
                {"\n"}
                <span className="text-cyan-400">$</span> mcp-anvil inspect .
              </pre>
            </div>

            {/* Footer call-to-action */}
            <div className="mt-12 text-center text-sm text-zinc-500">
              <p>
                Need help? Reply to your Polar receipt or email{" "}
                <a
                  href="mailto:hello@aiinfradecoded.com"
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  hello@aiinfradecoded.com
                </a>{" "}
                — the person who built this reads every message.
              </p>
              <p className="mt-3">
                <Link href="/mcp-anvil" className="text-zinc-400 hover:text-zinc-100">
                  ← Back to MCP Anvil
                </Link>
              </p>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

export const metadata = {
  title: "Thanks — MCP Anvil",
  description: "Your MCP Anvil purchase was successful. Your activation key is on its way.",
  // No-index this page: nothing useful for Google to crawl, and it shouldn't
  // appear in search results above the main /mcp-anvil page.
  robots: { index: false, follow: false },
};
