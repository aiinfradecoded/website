"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function OrderRefInner() {
  const params = useSearchParams();
  const checkout_id = params.get("checkout_id");
  if (!checkout_id) return null;
  const orderRef = `${checkout_id.slice(0, 8)}…${checkout_id.slice(-6)}`;
  return (
    <p className="mt-3 font-mono text-xs text-zinc-500">Order ref · {orderRef}</p>
  );
}

/**
 * Renders the truncated Polar checkout id from `?checkout_id=...` in the URL.
 * Wrapped in Suspense because `useSearchParams` requires it under static export.
 * Suspends silently — the rest of the /thanks page renders without waiting.
 */
export function OrderRef() {
  return (
    <Suspense fallback={null}>
      <OrderRefInner />
    </Suspense>
  );
}
