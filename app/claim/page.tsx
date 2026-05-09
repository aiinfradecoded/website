"use client";

import { ArrowUpRight, CheckCircle2, Github, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

import { Container } from "@/app/_components/Container";
import { Footer } from "@/app/_components/Footer";
import { Logo } from "@/app/_components/Logo";
import { Nav } from "@/app/_components/Nav";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ?? "https://api.aiinfradecoded.com";

interface SuccessResponse {
  status: "invited" | "already_collaborator";
  username: string;
  repo_url: string;
}

function ClaimForm() {
  const params = useSearchParams();
  const token = params.get("token");

  const [username, setUsername] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<SuccessResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!token) {
    return (
      <ErrorState
        title="Missing token"
        body="Use the link in your welcome email — it includes the token we need to find your purchase."
      />
    );
  }

  if (success) {
    return <SuccessState data={success} />;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token || submitting) return;
    const trimmed = username.trim();
    if (!trimmed) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/billing/claim`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, github_username: trimmed }),
      });
      const data = (await res.json()) as
        | SuccessResponse
        | { detail: string };

      if (!res.ok) {
        const msg =
          "detail" in data
            ? data.detail
            : `Request failed with status ${res.status}`;
        setError(msg);
        return;
      }

      setSuccess(data as SuccessResponse);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(`Network error: ${msg}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="text-center">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/[0.08] accent-glow">
          <Github className="h-6 w-6 text-cyan-300" strokeWidth={2} />
        </span>
        <h1 className="mt-6 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
          Connect your GitHub
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-pretty text-zinc-400">
          Enter your GitHub username and we&apos;ll send the AgentForge repo
          invite immediately. Takes about 30 seconds.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-10 rounded-2xl border border-zinc-800/40 bg-zinc-950/40 p-6"
      >
        <label
          htmlFor="github_username"
          className="block text-xs font-medium uppercase tracking-widest text-zinc-500"
        >
          GitHub username
        </label>
        <div className="mt-2 flex items-center rounded-lg border border-zinc-800 bg-zinc-950 focus-within:border-cyan-500/40 focus-within:ring-1 focus-within:ring-cyan-500/40">
          <span className="px-3 text-sm text-zinc-500" aria-hidden>
            @
          </span>
          <input
            id="github_username"
            name="github_username"
            type="text"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder="yourname"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={submitting}
            className="flex-1 bg-transparent py-2.5 pr-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none disabled:opacity-50"
            required
            minLength={1}
            maxLength={39}
            pattern="[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}"
          />
        </div>

        <button
          type="submit"
          disabled={submitting || !username.trim()}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-100 px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending invite…
            </>
          ) : (
            <>Send my invite</>
          )}
        </button>

        {error && (
          <div className="mt-4 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
            {error}
          </div>
        )}

        <p className="mt-5 text-xs text-zinc-500">
          We don&apos;t store your GitHub username beyond what&apos;s required
          to send the invite. If your username has a typo, you can re-submit
          this form with the correct one.
        </p>
      </form>
    </div>
  );
}

function SuccessState({ data }: { data: SuccessResponse }) {
  const verb =
    data.status === "already_collaborator" ? "already had" : "just sent";
  return (
    <div className="mx-auto max-w-md text-center">
      <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/[0.08]">
        <CheckCircle2 className="h-6 w-6 text-emerald-300" strokeWidth={2.25} />
      </span>
      <h1 className="mt-6 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
        You&apos;re in.
      </h1>
      <p className="mx-auto mt-4 max-w-sm text-pretty text-zinc-400">
        We {verb} access to <code className="font-mono text-zinc-300">@{data.username}</code>{" "}
        on the AgentForge repo. Check your GitHub notifications inbox for the
        invitation, accept it, and you&apos;re ready to clone.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a
          href={`${data.repo_url}/invitations`}
          className="inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-white"
        >
          Accept invitation
          <ArrowUpRight className="h-4 w-4" />
        </a>
        <a
          href={data.repo_url}
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-800/50 bg-zinc-900/40 px-5 py-3 text-sm font-medium text-zinc-100 transition hover:border-zinc-700 hover:bg-zinc-900"
        >
          Open the repo
        </a>
      </div>
      <p className="mt-8 text-xs text-zinc-500">
        Setup takes about 90 minutes from{" "}
        <code className="font-mono text-zinc-300">git clone</code> to a running
        dashboard.
      </p>
    </div>
  );
}

function ErrorState({ title, body }: { title: string; body: string }) {
  return (
    <div className="mx-auto max-w-md text-center">
      <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-zinc-800/60 bg-zinc-900">
        <Logo size={28} />
      </span>
      <h1 className="mt-6 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      <p className="mx-auto mt-4 max-w-sm text-pretty text-zinc-400">{body}</p>
      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-800/50 bg-zinc-900/40 px-5 py-3 text-sm font-medium text-zinc-100 transition hover:border-zinc-700 hover:bg-zinc-900"
        >
          Back to homepage
        </Link>
      </div>
      <p className="mt-8 text-xs text-zinc-500">
        Stuck? Email{" "}
        <a
          href="mailto:team@aiinfradecoded.com"
          className="text-zinc-300 hover:text-zinc-100"
        >
          team@aiinfradecoded.com
        </a>{" "}
        and we&apos;ll invite you manually.
      </p>
    </div>
  );
}

export default function ClaimPage() {
  return (
    <>
      <Nav />
      <main>
        <Container size="md" className="py-20">
          <Suspense
            fallback={
              <div className="mx-auto max-w-md text-center text-zinc-500">
                Loading…
              </div>
            }
          >
            <ClaimForm />
          </Suspense>
        </Container>
      </main>
      <Footer />
    </>
  );
}
