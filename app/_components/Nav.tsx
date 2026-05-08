"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Logo } from "./Logo";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.aiinfradecoded.com";

const links = [
  { href: "/about" as const, label: "About" },
  { href: "/pricing" as const, label: "Pricing" },
  { href: "/changelog" as const, label: "Changelog" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/40 bg-zinc-950/75 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 text-sm font-semibold tracking-tight">
          <Logo size={26} />
          <span className="font-serif text-[15px] tracking-[-0.01em]">AI Infra Decoded</span>
        </Link>

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
          <a
            href={`${APP_URL}/sign-in`}
            className="hidden text-sm text-zinc-300 hover:text-zinc-100 sm:inline"
          >
            Sign in
          </a>
          <Link
            href="/pricing"
            className="rounded-lg bg-zinc-100 px-3.5 py-1.5 text-sm font-medium text-zinc-950 transition hover:bg-white"
          >
            Get AgentForge
          </Link>
        </div>
      </div>
    </header>
  );
}
