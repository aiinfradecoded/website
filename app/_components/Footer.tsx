import Link from "next/link";

import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-800/40 bg-zinc-950/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
            <Logo size={24} />
            <span className="font-serif text-base tracking-[-0.01em]">AI Infra Decoded</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-400">
            We help senior engineers ship production AI infrastructure. Research,
            tooling, and a flagship boilerplate (AgentForge).
          </p>
          <p className="mt-3 text-xs text-zinc-500">
            Atlanta, GA · est. 2024
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Product
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm text-zinc-300">
            <li><Link href="/" className="hover:text-white">AgentForge</Link></li>
            <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
            <li><Link href="/changelog" className="hover:text-white">Changelog</Link></li>
            <li><Link href="/demo" className="hover:text-white">Live demo</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Company
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm text-zinc-300">
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><a href="https://aiinfradecoded.beehiiv.com" className="hover:text-white">Newsletter</a></li>
            <li><a href="https://www.youtube.com/@aiinfradecoded" className="hover:text-white">YouTube</a></li>
            <li><a href="mailto:team@aiinfradecoded.com" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Resources
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm text-zinc-300">
            <li><a href="mailto:team@aiinfradecoded.com?subject=GitHub%20repo%20access" className="hover:text-white">GitHub <span className="text-zinc-500">(on purchase)</span></a></li>
            <li><Link href="/changelog" className="hover:text-white">Architecture</Link></li>
            <li><Link href="/license" className="hover:text-white">License</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-zinc-800/40">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-6 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} AI Infra Decoded LLC. All rights reserved.</p>
          <p className="text-zinc-600">
            AgentForge is source-available under a commercial license.
          </p>
        </div>
      </div>
    </footer>
  );
}
