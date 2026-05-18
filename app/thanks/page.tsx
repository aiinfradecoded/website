import Link from "next/link";

import { Container } from "@/app/_components/Container";
import { Footer } from "@/app/_components/Footer";
import { Nav } from "@/app/_components/Nav";

import { LicenseDelivery } from "../mcp-anvil/thanks/LicenseDelivery";

/**
 * Product-agnostic post-purchase URL. Same polling component as
 * `/mcp-anvil/thanks` — Polar's success URL currently uses the longer path
 * for legacy reasons, but `/thanks` is the canonical short alias going
 * forward. Either URL works because the polling endpoint identifies the
 * product from the KV record, not from the URL.
 */
export default function ThanksPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden />
          <Container size="md" className="relative py-16 sm:py-20">
            <div className="text-center">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400">
                Payment confirmed
              </span>
              <h1 className="mt-3 text-balance font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                Thanks for buying.
              </h1>
              <p className="mt-4 text-pretty text-lg text-zinc-400">
                Your license is being issued now. It appears below within a few
                seconds.
              </p>
            </div>

            <LicenseDelivery />

            <div className="mt-14 text-center text-sm text-zinc-500">
              <p>
                Need help? Email{" "}
                <a
                  href="mailto:hello@aiinfradecoded.com"
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  hello@aiinfradecoded.com
                </a>{" "}
                with your Polar order ID.
              </p>
              <p className="mt-3">
                <Link
                  href="/"
                  className="text-zinc-400 hover:text-zinc-100"
                >
                  ← Back to AI Infra Decoded
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
  title: "Thanks",
  description: "Your purchase was successful. Your license is being issued.",
  robots: { index: false, follow: false },
};
