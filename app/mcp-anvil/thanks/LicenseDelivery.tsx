"use client";

import {
  AlertCircle,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Loader2,
  Terminal,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * Post-purchase license delivery — the dynamic half of /mcp-anvil/thanks.
 *
 * Polls the fulfillment Worker for the buyer's issued license and displays it
 * inline once available. Replaces the old "your key arrives in 4 hours" copy.
 *
 * URL contract: Polar redirects buyers to
 *   https://aiinfradecoded.com/mcp-anvil/thanks?order=<order_id>
 * with the order ID substituted at redirect time. We read `?order=` here and
 * poll GET /api/order/<order_id> every 2s until the Worker returns a record.
 *
 * Three states:
 *   - No ?order param         → generic "thanks" message, suggest checking email
 *   - ?order present, polling → spinner + "issuing your license"
 *   - Record received         → blob(s) + activate commands, click-to-copy
 */

const FULFILLMENT_ORIGIN =
  process.env.NEXT_PUBLIC_FULFILLMENT_ORIGIN ?? "https://fulfillment.aiinfradecoded.com";

// Poll cadence. 2s is responsive without hammering the Worker. We cap total
// polling at 5 minutes — past that, something's wrong and the buyer should
// fall back to email (or contact support).
const POLL_INTERVAL_MS = 2000;
const POLL_TIMEOUT_MS = 5 * 60 * 1000;

interface OrderRecord {
  status: "issued" | "pending_email" | "failed" | "expired";
  tier: "personal" | "team";
  product: "mcp-anvil" | "agent-forge" | "bundle";
  seats: number;
  blob: string;
  blob_secondary: string;
  email: string;
  issued_at: string;
  error: string;
}

export function LicenseDelivery() {
  const [orderId, setOrderId] = useState<string | null>(null);
  const [record, setRecord] = useState<OrderRecord | null>(null);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [fatal, setFatal] = useState<string | null>(null);
  const startedAtRef = useRef<number>(Date.now());

  // Read ?order= from the URL on mount. We do this in an effect (not a
  // top-level useSearchParams() call) so we don't need to wrap the page in a
  // Suspense boundary just for this one read. Slight tradeoff: a microsecond
  // of blank state on first render, indistinguishable to the buyer.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    setOrderId(params.get("order"));
  }, []);

  // Tick the elapsed-time counter so the UI can show "still issuing… (5s)".
  // Only runs while we're actively waiting for the license.
  useEffect(() => {
    if (!orderId || record) return;
    const id = window.setInterval(() => {
      setElapsedSec(Math.floor((Date.now() - startedAtRef.current) / 1000));
    }, 1000);
    return () => window.clearInterval(id);
  }, [orderId, record]);

  // Polling loop. Starts when we have an orderId, stops when we get a record
  // or hit the timeout. setTimeout is preferred over setInterval here so we
  // can guarantee no overlapping fetches if a request takes longer than the
  // poll interval.
  useEffect(() => {
    if (!orderId) return;
    let cancelled = false;
    let timeoutId: number | undefined;

    const poll = async () => {
      if (cancelled) return;
      if (Date.now() - startedAtRef.current > POLL_TIMEOUT_MS) {
        setFatal(
          "Your license is taking longer than usual to issue. " +
            "Check your email — we send the license there too — or reply to your " +
            "Polar receipt and we'll resend by hand."
        );
        return;
      }
      try {
        const r = await fetch(`${FULFILLMENT_ORIGIN}/api/order/${orderId}`);
        if (r.status === 404) {
          // 404 = not issued yet (the contract). Keep polling.
          timeoutId = window.setTimeout(poll, POLL_INTERVAL_MS);
          return;
        }
        if (!r.ok) {
          // 4xx other than 404, or 5xx — try again, but only briefly.
          timeoutId = window.setTimeout(poll, POLL_INTERVAL_MS);
          return;
        }
        const data = (await r.json()) as OrderRecord;
        if (!cancelled) setRecord(data);
      } catch {
        // Network blip — retry. We don't surface this as a user-visible error
        // unless we run out the clock above.
        if (!cancelled) timeoutId = window.setTimeout(poll, POLL_INTERVAL_MS);
      }
    };
    poll();

    return () => {
      cancelled = true;
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [orderId]);

  // -------------------------------------------------------------------------
  // Render — pick the right state's component.
  // -------------------------------------------------------------------------

  if (orderId === null && typeof window !== "undefined") {
    // We've mounted but haven't read the URL yet, OR the URL doesn't have
    // ?order=. Show a generic thanks message; buyer can still grab the
    // license from email.
    return <NoOrderState />;
  }

  if (fatal) {
    return <FatalState message={fatal} />;
  }

  if (!record) {
    return <PendingState elapsedSec={elapsedSec} />;
  }

  if (record.status === "expired") {
    return <ExpiredState />;
  }

  return <IssuedState record={record} />;
}

// ===========================================================================
// State: no ?order= in URL
// ===========================================================================

function NoOrderState() {
  return (
    <div className="mt-12 rounded-xl border border-zinc-800/70 bg-zinc-900/40 p-8 text-center">
      <CheckCircle2 className="mx-auto h-10 w-10 text-green-400" strokeWidth={1.75} />
      <h2 className="mt-4 font-serif text-2xl font-semibold">Thanks for your purchase.</h2>
      <p className="mt-3 text-sm leading-relaxed text-zinc-400">
        We&apos;ve emailed your license key to the address you used at checkout. If
        you don&apos;t see it in a few minutes, check spam, then reply to your Polar
        receipt — we&apos;ll resend within the day.
      </p>
    </div>
  );
}

// ===========================================================================
// State: polling (no record yet)
// ===========================================================================

function PendingState({ elapsedSec }: { elapsedSec: number }) {
  // After ~45s, swap "Usually within 30 seconds" for a calming "still working
  // on it" message. Past 90s, we still show the spinner but hint at the email
  // backup channel.
  let subtext: string;
  if (elapsedSec < 5) {
    subtext = "Verifying your payment…";
  } else if (elapsedSec < 30) {
    subtext = "Issuing your license — usually completes within 30 seconds.";
  } else if (elapsedSec < 90) {
    subtext = `Still working on it (${elapsedSec}s). Stay on this page.`;
  } else {
    subtext = `${elapsedSec}s — taking longer than usual. We're also sending your license by email as a backup.`;
  }

  return (
    <div className="mt-12 rounded-xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/[0.05] via-zinc-900/40 to-zinc-900/40 p-8 text-center">
      <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/15 ring-1 ring-cyan-500/30">
        <Loader2 className="h-6 w-6 animate-spin text-cyan-400" strokeWidth={2} />
      </div>
      <h2 className="mt-5 font-serif text-2xl font-semibold">Issuing your license…</h2>
      <p className="mt-3 text-sm text-zinc-400">{subtext}</p>
      <p className="mt-6 text-xs text-zinc-500">
        Don&apos;t close this tab — your key appears below the moment it&apos;s ready.
      </p>
    </div>
  );
}

// ===========================================================================
// State: fatal (polling exceeded 5 min)
// ===========================================================================

function FatalState({ message }: { message: string }) {
  return (
    <div className="mt-12 rounded-xl border border-amber-500/30 bg-amber-500/[0.05] p-8">
      <AlertCircle className="h-6 w-6 text-amber-400" strokeWidth={1.75} />
      <h2 className="mt-3 font-serif text-xl font-semibold">License issuance is slow today.</h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{message}</p>
      <p className="mt-4 text-sm text-zinc-400">
        Email{" "}
        <a
          href="mailto:hello@aiinfradecoded.com"
          className="text-cyan-400 hover:text-cyan-300"
        >
          hello@aiinfradecoded.com
        </a>{" "}
        with your Polar order ID and we&apos;ll resend by hand within the day.
      </p>
    </div>
  );
}

// ===========================================================================
// State: link expired (order older than the Worker's self-serve window)
// ===========================================================================

function ExpiredState() {
  return (
    <div className="mt-12 rounded-xl border border-zinc-800/70 bg-zinc-900/40 p-8 text-center">
      <Clock className="mx-auto h-10 w-10 text-zinc-400" strokeWidth={1.75} />
      <h2 className="mt-4 font-serif text-2xl font-semibold">This license link has expired.</h2>
      <p className="mt-3 text-sm leading-relaxed text-zinc-400">
        For security, this page only shows your license for a short window after
        purchase. Your license was also emailed to you at checkout — check that
        inbox (and spam). Still stuck? Email{" "}
        <a
          href="mailto:hello@aiinfradecoded.com"
          className="text-cyan-400 hover:text-cyan-300"
        >
          hello@aiinfradecoded.com
        </a>{" "}
        with your Polar order ID and we&apos;ll re-send it.
      </p>
    </div>
  );
}

// ===========================================================================
// State: license issued — show blob(s) + activate commands
// ===========================================================================

function IssuedState({ record }: { record: OrderRecord }) {
  // Branch on product to label + install/activate copy correctly. Bundles get
  // two blobs (Anvil + Forge); single products get one.
  const isBundle = record.product === "bundle";
  const isAnvil = record.product === "mcp-anvil";
  const isForge = record.product === "agent-forge";

  const productLabel = isBundle
    ? "MCP Anvil + Agent Forge bundle"
    : isAnvil
      ? "MCP Anvil"
      : "Agent Forge";

  const tierLabel =
    record.tier === "team"
      ? `Team · ${record.seats} developer seats · 1 year of updates`
      : "Personal · 1 developer · 1 year of updates";

  return (
    <div className="mt-10 space-y-6">
      {/* Success banner */}
      <div className="rounded-xl border border-green-500/30 bg-green-500/[0.05] p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-400" strokeWidth={2} />
          <div>
            <h2 className="font-serif text-xl font-semibold text-zinc-100">
              Your license is ready.
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              <span className="text-zinc-300">{productLabel}</span> · {tierLabel}
            </p>
          </div>
        </div>
      </div>

      {/* License blob(s) */}
      {isBundle ? (
        <>
          <LicenseBlock
            label="MCP Anvil license"
            sublabel="Paste into mcp-anvil license activate"
            blob={record.blob}
          />
          <LicenseBlock
            label="Agent Forge license"
            sublabel="Paste into agent-forge license activate"
            blob={record.blob_secondary}
          />
        </>
      ) : (
        <LicenseBlock
          label={`${productLabel} license`}
          sublabel={`Paste into ${isAnvil ? "mcp-anvil" : "agent-forge"} license activate`}
          blob={record.blob}
        />
      )}

      {/* Quick-start commands */}
      <ActivateCommands
        product={record.product}
        anvilBlob={isBundle || isAnvil ? record.blob : ""}
        forgeBlob={isBundle ? record.blob_secondary : isForge ? record.blob : ""}
      />

      {/* Email confirmation note */}
      <div className="rounded-lg border border-zinc-800/70 bg-zinc-900/30 p-4 text-xs text-zinc-500">
        We also sent your license to{" "}
        <span className="text-zinc-300">{record.email}</span>. If the email
        doesn&apos;t arrive within a few minutes, you can copy your key from this
        page — bookmark this URL to come back later.
      </div>
    </div>
  );
}

// ===========================================================================
// Sub-component: one copyable license block
// ===========================================================================

function LicenseBlock({
  label,
  sublabel,
  blob,
}: {
  label: string;
  sublabel: string;
  blob: string;
}) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(blob);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Older browsers / disabled clipboard perms — silent fail; the user can
      // still triple-click + Cmd/Ctrl-C the blob themselves.
    }
  };

  return (
    <div className="rounded-xl border border-zinc-800/70 bg-zinc-900/40 p-5">
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-zinc-100">{label}</h3>
          <p className="mt-0.5 text-xs text-zinc-500">{sublabel}</p>
        </div>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-950 px-2.5 py-1 text-xs font-medium text-zinc-300 transition hover:border-cyan-500/40 hover:bg-cyan-500/5 hover:text-cyan-300"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" strokeWidth={2} /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="mt-3 max-h-40 overflow-auto rounded-lg border border-zinc-800/70 bg-zinc-950 p-3 font-mono text-[11.5px] leading-relaxed text-zinc-300 break-all whitespace-pre-wrap">
        {blob}
      </pre>
    </div>
  );
}

// ===========================================================================
// Sub-component: activate commands shown after the blobs
// ===========================================================================

function ActivateCommands({
  product,
  anvilBlob,
  forgeBlob,
}: {
  product: "mcp-anvil" | "agent-forge" | "bundle";
  anvilBlob: string;
  forgeBlob: string;
}) {
  const isBundle = product === "bundle";
  // Truncate the blob in the command preview so the code block doesn't get
  // unreadable. The buyer copies the FULL blob from the LicenseBlock above.
  const shortAnvil = anvilBlob ? truncate(anvilBlob) : "";
  const shortForge = forgeBlob ? truncate(forgeBlob) : "";

  return (
    <div className="rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/[0.04] via-zinc-900/40 to-zinc-900/40 p-6">
      <div className="flex items-center gap-2">
        <Terminal className="h-4 w-4 text-cyan-400" strokeWidth={2} />
        <h3 className="font-serif text-base font-semibold">Activate (under 2 minutes)</h3>
      </div>

      <pre className="mt-4 overflow-x-auto rounded-lg border border-zinc-800/70 bg-zinc-950 p-4 font-mono text-[12.5px] leading-relaxed text-zinc-300">
        {isBundle ? (
          <>
            <Comment>{"# 1. Install both packages (Python 3.11+)"}</Comment>
            {"\n"}
            <Prompt /> pipx install mcp-anvil agent-forge
            {"\n\n"}
            <Comment>{"# 2. Activate each license"}</Comment>
            {"\n"}
            <Prompt /> mcp-anvil license activate &quot;{shortAnvil}&quot;
            {"\n"}
            <Prompt /> agent-forge license activate &quot;{shortForge}&quot;
            {"\n\n"}
            <Comment>{"# 3. Try them"}</Comment>
            {"\n"}
            <Prompt /> mcp-anvil new my-first-server
            {"\n"}
            <Prompt /> agent-forge run examples/code-auditor
          </>
        ) : product === "mcp-anvil" ? (
          <>
            <Comment>{"# 1. Install (Python 3.11+)"}</Comment>
            {"\n"}
            <Prompt /> pipx install mcp-anvil
            {"\n\n"}
            <Comment>{"# 2. Activate"}</Comment>
            {"\n"}
            <Prompt /> mcp-anvil license activate &quot;{shortAnvil}&quot;
            {"\n\n"}
            <Comment>{"# 3. Try it"}</Comment>
            {"\n"}
            <Prompt /> mcp-anvil new my-first-server
            {"\n"}
            <Prompt /> cd my-first-server
            {"\n"}
            <Prompt /> mcp-anvil inspect .
          </>
        ) : (
          <>
            <Comment>{"# 1. Install (Python 3.11+)"}</Comment>
            {"\n"}
            <Prompt /> pipx install agent-forge
            {"\n\n"}
            <Comment>{"# 2. Activate"}</Comment>
            {"\n"}
            <Prompt /> agent-forge license activate &quot;{shortForge}&quot;
            {"\n\n"}
            <Comment>{"# 3. Try an example"}</Comment>
            {"\n"}
            <Prompt /> agent-forge run examples/code-auditor
          </>
        )}
      </pre>
      <p className="mt-3 flex items-start gap-2 text-xs text-zinc-500">
        <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
        Replace the truncated key above with the full blob from the box(es)
        further up — click Copy and paste into the activate command.
      </p>
    </div>
  );
}

// Tiny visual helpers for the command block.
function Comment({ children }: { children: React.ReactNode }) {
  return <span className="text-zinc-500">{children}</span>;
}
function Prompt() {
  return <span className="text-cyan-400">$</span>;
}

function truncate(s: string): string {
  if (s.length <= 24) return s;
  return s.slice(0, 8) + "…" + s.slice(-12);
}
