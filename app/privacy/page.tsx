import { Container } from "@/app/_components/Container";
import { Footer } from "@/app/_components/Footer";
import { Nav } from "@/app/_components/Nav";

export const metadata = {
  title: "Privacy",
  description: "AI Infra Decoded privacy practices for the demo and customer accounts.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main>
        <Container size="md" className="pt-20 pb-24">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400">
            Privacy
          </span>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            What we collect, why, and how to make it stop.
          </h1>
          <p className="mt-5 max-w-2xl text-zinc-400">
            Last updated 2026-04-15. This page covers aiinfradecoded.com, the
            AgentForge live demo at /dashboard, and customer accounts. The legally
            binding version is the same content, signed by AI Infra Decoded LLC.
          </p>

          <section className="mt-12 space-y-10 text-[15.5px] leading-relaxed text-zinc-300">
            <div>
              <h2 className="font-serif text-2xl font-semibold tracking-tight text-zinc-100">
                Data we collect
              </h2>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <strong className="text-zinc-100">Account.</strong> If you sign up via Clerk,
                  we receive your email and a Clerk user ID. We use these to authenticate
                  your sessions. Clerk's privacy practices apply to the auth handshake.
                </li>
                <li>
                  <strong className="text-zinc-100">Demo conversations.</strong> Messages you
                  send to the live demo are stored in our Postgres so the streaming chat
                  works (multi-turn requires history). We retain demo conversations for 30
                  days, then delete.
                </li>
                <li>
                  <strong className="text-zinc-100">Purchase records.</strong> Stripe and
                  Polar process payments. We store the resulting customer ID and entitlement
                  tier, not card numbers.
                </li>
                <li>
                  <strong className="text-zinc-100">Site analytics.</strong> Aggregate page
                  view counts via privacy-respecting analytics (no fingerprinting). No
                  third-party advertising trackers.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-semibold tracking-tight text-zinc-100">
                What we don't do
              </h2>
              <ul className="mt-4 space-y-2.5">
                <li>We do not sell your data.</li>
                <li>We do not use demo conversations to train any model.</li>
                <li>We do not run third-party advertising trackers.</li>
                <li>We do not share customer email lists.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-semibold tracking-tight text-zinc-100">
                Your rights
              </h2>
              <p className="mt-4">
                Email{" "}
                <a href="mailto:team@aiinfradecoded.com" className="text-cyan-300 hover:text-cyan-200">
                  team@aiinfradecoded.com
                </a>{" "}
                from the address on your account to request export, correction, or deletion
                of your data. We respond within 30 days, typically same-day. EU/UK customers
                have additional rights under GDPR; CA customers under CCPA. We'll honor them
                whether or not you cite them by name.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-semibold tracking-tight text-zinc-100">
                Subprocessors
              </h2>
              <p className="mt-4">
                We use the following third parties to operate the service: Clerk
                (authentication), Stripe (payments US/EU), Polar (payments international),
                Cloudflare (CDN/edge), Hetzner (hosting), Postgres-as-a-service via Neon for
                production data. Each has been selected for sensible default privacy
                practices.
              </p>
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}
