import { Logo } from "./Logo";

/**
 * Pseudo-screenshot of the MCP Anvil dashboard. Built from HTML/Tailwind
 * rather than a real screenshot so it scales crisply at any resolution
 * and doesn't add image weight.
 *
 * Visual rhyme intentional: the actual dashboard at localhost:7820 looks
 * basically identical — same fonts, same cyan accents, same card layout.
 * If the buyer recognizes this image after installing, it builds trust.
 *
 * Used on the home page hero and the /mcp-anvil hero (paired with
 * CliMockup so the two surfaces are visible side by side).
 */
const SERVERS = [
  { name: "anvil-builtin", state: "READY", count: 64, label: "Built-in tools", isDefault: true },
  { name: "anvil-custom", state: "READY", count: 4, label: "Custom tools", isDefault: true },
  { name: "code-review", state: "READY", count: 7, label: "Imported from Claude Desktop", isDefault: false },
  { name: "neon-db", state: "REGISTERED", count: 0, label: "Imported (HTTP — not supported)", isDefault: false },
];
const TABS = [
  { name: "Servers", count: 4, active: true },
  { name: "Tools", count: 75 },
  { name: "Templates", count: 2 },
  { name: "Saved Calls", count: 6 },
  { name: "Prompts", count: 4 },
  { name: "History", count: 38 },
  { name: "Events", count: 12 },
  { name: "Help & guides", count: null },
];

export function DashboardMockup() {
  return (
    <div className="min-w-0">
      <div className="rounded-xl border border-zinc-800/70 bg-zinc-950 shadow-2xl shadow-cyan-500/[0.06] overflow-hidden">
        <div className="flex items-center gap-2 border-b border-zinc-800/70 bg-zinc-900/60 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          <span className="ml-3 font-mono text-[10.5px] text-zinc-500">
            127.0.0.1:7820 — MCP Anvil Dashboard
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-zinc-800/70 bg-zinc-925 px-3.5 py-2.5">
          <div className="flex items-center gap-2.5">
            <Logo size={22} />
            <span className="font-serif text-[13px] font-semibold text-zinc-100">
              MCP Anvil <span className="text-zinc-500 font-sans font-normal">/ dashboard</span>
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            connected
          </span>
        </div>
        <div className="grid grid-cols-[120px_minmax(0,1fr)] divide-x divide-zinc-800/70 bg-zinc-950">
          <aside className="py-2">
            {TABS.map((t) => (
              <div
                key={t.name}
                className={`flex items-center justify-between px-3 py-1.5 text-[11.5px] ${
                  t.active
                    ? "border-l-2 border-cyan-400 bg-cyan-500/[0.05] text-cyan-300"
                    : "border-l-2 border-transparent text-zinc-400"
                }`}
              >
                <span>{t.name}</span>
                {t.count !== null && (
                  <span
                    className={`rounded-full px-1.5 font-mono text-[9.5px] ${
                      t.active ? "bg-cyan-500/15 text-cyan-300" : "bg-zinc-800 text-zinc-500"
                    }`}
                  >
                    {t.count}
                  </span>
                )}
              </div>
            ))}
          </aside>
          <div className="p-3.5">
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-base font-semibold text-zinc-100">Servers</h3>
              <span className="font-serif text-xs italic text-zinc-500">(4)</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="rounded-md bg-cyan-500 px-2 py-1 text-[10px] font-semibold text-zinc-950">
                + New server
              </span>
              <span className="rounded-md border border-zinc-800 bg-zinc-900 px-2 py-1 text-[10px] text-zinc-300">
                Import existing…
              </span>
            </div>
            <div className="mt-3 space-y-1.5">
              {SERVERS.map((s) => (
                <div
                  key={s.name}
                  className="rounded-md border border-zinc-800/60 bg-zinc-900/40 px-2.5 py-1.5"
                >
                  <div className="flex flex-wrap items-center gap-1.5 text-[10.5px]">
                    <span className="text-zinc-500">›</span>
                    <span className="font-mono font-semibold text-zinc-100">{s.name}</span>
                    <span
                      className={`rounded-full px-1.5 py-px font-mono text-[9px] font-semibold uppercase tracking-wider ${
                        s.state === "READY"
                          ? "bg-emerald-500/15 text-emerald-300"
                          : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {s.state}
                    </span>
                    {s.isDefault && (
                      <span className="rounded-full bg-cyan-500/10 px-1.5 py-px font-mono text-[8.5px] font-semibold uppercase tracking-wider text-cyan-300">
                        default
                      </span>
                    )}
                    <span className="ml-auto text-zinc-500">
                      {s.count} tool{s.count === 1 ? "" : "s"}
                    </span>
                  </div>
                  <div className="mt-0.5 pl-3.5 text-[10px] text-zinc-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-zinc-800/70 bg-zinc-900/40 px-4 py-2 text-[10px] text-zinc-500">
          Live at <span className="font-mono text-cyan-400">127.0.0.1:7820</span> — call any tool from the UI, Claude, or curl.
        </div>
      </div>
    </div>
  );
}
