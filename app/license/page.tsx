import { Container } from "@/app/_components/Container";
import { Footer } from "@/app/_components/Footer";
import { Nav } from "@/app/_components/Nav";

export const metadata = {
  title: "License",
  description: "AgentForge commercial source-available license terms.",
  alternates: { canonical: "/license" },
};

export default function LicensePage() {
  return (
    <>
      <Nav />
      <main>
        <Container size="md" className="pt-20 pb-24">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400">
            Commercial license
          </span>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            AgentForge commercial source-available license.
          </h1>
          <p className="mt-5 max-w-2xl text-zinc-400">
            Plain-English summary below. The binding text lives in
            {" "}
            <a
              href="https://github.com/aiinfradecoded/agentforge-starter/blob/main/LICENSE.md"
              className="text-cyan-300 hover:text-cyan-200"
            >
              LICENSE.md
            </a>
            {" "}
            in the public repo.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              {
                h: "What you can do",
                items: [
                  "Use the source in unlimited internal projects.",
                  "Use the source in unlimited paid client projects.",
                  "Modify, fork, fold into a SaaS you operate.",
                  "Sublicense the modified work as part of your product.",
                ],
              },
              {
                h: "What you can't do",
                items: [
                  "Resell the unmodified kit itself as a competing boilerplate.",
                  "Distribute the source as a public open-source release.",
                  "Remove the AgentForge attribution in source files.",
                  "Use AI Infra Decoded marks to imply endorsement.",
                ],
              },
            ].map((col) => (
              <article
                key={col.h}
                className="rounded-xl border border-zinc-800/50 bg-zinc-900/40 p-6"
              >
                <h2 className="font-serif text-lg font-semibold">{col.h}</h2>
                <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                  {col.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5">
                      <span
                        aria-hidden
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-500"
                      />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <h2 className="mt-14 font-serif text-2xl font-semibold tracking-tight">
            Updates
          </h2>
          <p className="mt-3 max-w-2xl text-zinc-400">
            Updates are included per your tier: Hobby = 90 days of bug fixes,
            Pro = 1 year of updates on the main branch, Team = 1 year of updates.
            Major-version upgrades are a separate purchase at a discount for
            existing customers.
          </p>

          <h2 className="mt-14 font-serif text-2xl font-semibold tracking-tight">
            Liability
          </h2>
          <p className="mt-3 max-w-2xl text-zinc-400">
            Source is provided "as is". AI Infra Decoded LLC is not liable for damages
            arising from your use of the kit. You&apos;re a senior engineer. You&apos;ll review
            the code before deploying it. The full liability limitations are in the
            binding LICENSE.md.
          </p>
        </Container>
      </main>
      <Footer />
    </>
  );
}
