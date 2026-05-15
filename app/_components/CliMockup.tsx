/**
 * Simplified terminal-style mock of the MCP Anvil CLI. Designed to pair
 * with DashboardMockup in a side-by-side hero, so we strip the giant
 * pixel-art logo (lovely in a real terminal at full width, but cramped
 * next to a dashboard preview) and keep only the moves that matter to a
 * buyer scanning at a glance:
 *
 *   - The fact that this IS a CLI (terminal chrome)
 *   - Daemon state on screen at all times (●)
 *   - Live dashboard URL right there to click
 *   - The three commands that get them productive
 *
 * If the buyer recognizes any line after installing, the trust play is
 * done — same job DashboardMockup pulls on the visual side.
 */
export function CliMockup() {
  return (
    <div className="min-w-0">
      <div className="rounded-xl border border-zinc-800/70 bg-zinc-950 shadow-2xl shadow-cyan-500/[0.06] overflow-hidden">
        {/* Terminal chrome */}
        <div className="flex items-center gap-2 border-b border-zinc-800/70 bg-zinc-900/60 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          <span className="ml-3 font-mono text-[10.5px] text-zinc-500">
            ~ — mcp-anvil
          </span>
        </div>

        {/* Banner block */}
        <div className="px-5 py-5 font-mono text-[12px] leading-[1.65]">
          <div className="flex items-center gap-2 text-cyan-300">
            <span className="text-[14px]">▼</span>
            <span className="font-semibold">mcp-anvil</span>
          </div>
          <div className="mt-3 rounded-lg border border-cyan-500/30 bg-cyan-500/[0.03] px-4 py-3.5">
            <div className="font-semibold tracking-[0.18em] text-cyan-300">
              M C P &nbsp; A N V I L
            </div>
            <div className="mt-1 text-[11.5px] text-zinc-400">
              Build, audit, and orchestrate MCP servers locally.
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
              <span className="font-semibold text-zinc-200">v0.2.0</span>
              <span className="text-zinc-600">•</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="text-zinc-200">daemon running</span>
              </span>
            </div>
            <div className="mt-2 text-[11px]">
              <span className="text-zinc-500">dashboard:&nbsp;&nbsp;</span>
              <span className="underline text-cyan-400">http://127.0.0.1:7820</span>
            </div>
          </div>

          {/* Command list */}
          <div className="mt-5">
            <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-widest text-cyan-500">
              <span className="h-px flex-1 bg-cyan-500/30" />
              <span>get started</span>
              <span className="h-px flex-1 bg-cyan-500/30" />
            </div>
            <div className="mt-3 space-y-1.5">
              <CommandRow cmd="mcp-anvil setup" label="Interactive first-run wizard" />
              <CommandRow cmd="mcp-anvil new <name>" label="Scaffold a new MCP server" />
              <CommandRow cmd="mcp-anvil daemon start" label="Start the daemon + open dashboard" />
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800/70 bg-zinc-900/40 px-4 py-2 text-[10px] text-zinc-500">
          One CLI — same data as the dashboard, scriptable from any shell.
        </div>
      </div>
    </div>
  );
}

function CommandRow({ cmd, label }: { cmd: string; label: string }) {
  return (
    <div className="grid grid-cols-[minmax(0,180px)_minmax(0,1fr)] gap-3 text-[11.5px]">
      <span className="font-semibold text-cyan-300">{cmd}</span>
      <span className="text-zinc-400">{label}</span>
    </div>
  );
}
