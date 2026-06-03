import type { Metadata } from "next";

// /claim is reached only from per-token links in welcome emails. The page
// itself is a client component (reads the token via useSearchParams), so it
// can't export page metadata — this server-component layout carries the
// noindex. robots.txt also disallows /claim; this is the page-level signal.
export const metadata: Metadata = {
  title: "Claim your access",
  robots: { index: false, follow: false },
};

export default function ClaimLayout({ children }: { children: React.ReactNode }) {
  return children;
}
