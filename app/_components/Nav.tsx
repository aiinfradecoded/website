"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Logo } from "./Logo";

// Product links live at the top of the order so the two flagship pages
// (MCP Anvil + AgentForge) are the first thing the buyer scans after the
// brand mark. Demo lives under AgentForge conceptually (the demo IS the
// AgentForge chat surface). Everything else trails after.
const links = [
  { href: "/" as const, label: "Home" },
  { href: "/mcp-anvil" as const, label: "MCP Anvil" },
  { href: "/agentforge" as const, label: "Agent Forge" },
  { href: "/pricing" as const, label: "Pricing" },
  { href: "/demo" as const, label: "Demo" },
  { href: "/changelog" as const, label: "Changelog" },
  { href: "/about" as const, label: "About" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the drawer on route change so it doesn't stick around after navigating.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/40 bg-zinc-950/75 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-sm font-semibold tracking-tight"
        >
          <Logo size={26} />
          <span className="font-serif text-[15px] tracking-[-0.01em]">
            AI Infra Decoded
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 text-sm text-zinc-400 sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-zinc-100 ${
                pathname === link.href ? "text-zinc-100" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/*
            Context-aware top-right CTA. Three states:
              - on /agentforge: "Get Agent Forge" (zinc-white CTA)
              - on /mcp-anvil:  "Get MCP Anvil"  (cyan primary CTA)
              - elsewhere:      "Get MCP Anvil"  (cyan — flagship default)
            Cross-page selling stays disabled — a buyer on a product page
            never sees a button pulling them to the OTHER product.
          */}
          {pathname?.startsWith("/agentforge") ? (
            <Link
              href="/agentforge#pricing"
              className="hidden rounded-lg bg-zinc-100 px-3.5 py-1.5 text-sm font-medium text-zinc-950 transition hover:bg-white sm:inline-flex"
            >
              Get Agent Forge
            </Link>
          ) : (
            <Link
              href={pathname?.startsWith("/mcp-anvil") ? "/mcp-anvil#pricing" : "/mcp-anvil"}
              className="hidden rounded-lg bg-cyan-500 px-3.5 py-1.5 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-400 sm:inline-flex"
            >
              Get MCP Anvil
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800/60 bg-zinc-950 text-zinc-300 transition hover:border-zinc-700 hover:text-zinc-100 sm:hidden"
          >
            {open ? (
              <X className="h-4 w-4" strokeWidth={2.25} />
            ) : (
              <Menu className="h-4 w-4" strokeWidth={2.25} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-zinc-800/40 bg-zinc-950/95 backdrop-blur-xl sm:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  pathname === link.href
                    ? "bg-zinc-900 text-zinc-100"
                    : "text-zinc-300 hover:bg-zinc-900/60 hover:text-zinc-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/mcp-anvil"
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-cyan-500 px-3.5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-400"
            >
              Get MCP Anvil
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
