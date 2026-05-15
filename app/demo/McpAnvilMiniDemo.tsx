"use client";

import {
  CheckCircle2,
  Plus,
  Play,
  Trash2,
  Wrench,
  X,
  Loader2,
} from "lucide-react";
import { useState } from "react";

/**
 * Interactive MCP Anvil mini-demo. Mirrors the real product:
 * a list of registered tools on the left, a tool detail + run pane
 * on the right, and a "+ New tool" form that adds a custom tool the
 * user can immediately call.
 *
 * Everything is client-side — no backend, no network. Tool calls
 * return scripted/computed responses so the buyer can poke at it
 * the same way they would the live dashboard at 127.0.0.1:7820.
 *
 * The five seed tools cover the most visible categories of the real
 * 64-tool catalog (filesystem, security, networking, encoding, dev)
 * so the buyer sees the breadth in 60 seconds of clicking.
 */

type ToolInputSpec = {
  name: string;
  label: string;
  type: "text" | "number" | "select";
  defaultValue: string;
  options?: string[];
  placeholder?: string;
};

type Tool = {
  name: string;
  category: string;
  blurb: string;
  inputs: ToolInputSpec[];
  /** Pure function that returns the scripted response object. */
  run: (args: Record<string, string>) => Record<string, unknown>;
  /** True when the user added this tool via the + New tool form. */
  custom?: boolean;
};

// Seed tools that mirror the real anvil-builtin catalog. Each one's
// response shape is hand-crafted to look like the real tool's output.
const SEED_TOOLS: Tool[] = [
  {
    name: "fs_read",
    category: "Filesystem",
    blurb: "Read a file's contents. Returns text + metadata.",
    inputs: [
      { name: "path", label: "path", type: "text", defaultValue: "./README.md", placeholder: "./path/to/file" },
      { name: "max_lines", label: "max_lines", type: "number", defaultValue: "5" },
    ],
    run: ({ path, max_lines }) => ({
      path,
      content:
        "# My Project\n\nA short description.\n\n## Installation\n\n```bash\npip install my-project\n```",
      lines_returned: parseInt(max_lines || "5", 10),
      truncated: false,
      size_bytes: 1247,
    }),
  },
  {
    name: "hash_text",
    category: "Security",
    blurb: "Hash a string. Supported: md5, sha1, sha256, sha512, blake2b.",
    inputs: [
      { name: "text", label: "text", type: "text", defaultValue: "hello world", placeholder: "What to hash" },
      {
        name: "algorithm",
        label: "algorithm",
        type: "select",
        defaultValue: "sha256",
        options: ["md5", "sha1", "sha256", "sha512", "blake2b"],
      },
    ],
    run: ({ text, algorithm }) => {
      // Real hashing via Web Crypto. text → SHA-256 (or fallback string for md5/sha1).
      // For the demo we'll use a deterministic hash-ish for simplicity.
      const fakeHashes: Record<string, string> = {
        md5: simpleHash(text, 32),
        sha1: simpleHash(text, 40),
        sha256: simpleHash(text, 64),
        sha512: simpleHash(text, 128),
        blake2b: simpleHash(text, 128),
      };
      return {
        algorithm,
        hex: fakeHashes[algorithm] || simpleHash(text, 64),
        input_bytes: new TextEncoder().encode(text).length,
      };
    },
  },
  {
    name: "url_parse",
    category: "Networking",
    blurb: "Decompose a URL into scheme, host, port, path, query, fragment.",
    inputs: [
      {
        name: "url",
        label: "url",
        type: "text",
        defaultValue: "https://example.com:8080/path?x=1&y=2#section",
      },
    ],
    run: ({ url }) => {
      try {
        const u = new URL(url);
        const query: Record<string, string> = {};
        u.searchParams.forEach((v, k) => {
          query[k] = v;
        });
        return {
          scheme: u.protocol.replace(":", ""),
          host: u.hostname,
          port: u.port ? parseInt(u.port, 10) : null,
          path: u.pathname,
          query,
          fragment: u.hash.replace("#", ""),
          url,
        };
      } catch (e) {
        return { error: "invalid URL" };
      }
    },
  },
  {
    name: "base64_encode",
    category: "Encoding",
    blurb: "UTF-8 → base64. Returns the encoded string.",
    inputs: [
      { name: "text", label: "text", type: "text", defaultValue: "Hello, MCP Anvil!" },
    ],
    run: ({ text }) => ({
      encoded: typeof btoa !== "undefined" ? btoa(unescape(encodeURIComponent(text))) : "",
      input_bytes: new TextEncoder().encode(text).length,
    }),
  },
  {
    name: "find_todos",
    category: "Dev workflow",
    blurb: "Scan a codebase for TODO / FIXME / XXX / HACK / BUG comments.",
    inputs: [
      { name: "root", label: "root", type: "text", defaultValue: "./src" },
      {
        name: "kinds",
        label: "kinds",
        type: "select",
        defaultValue: "all",
        options: ["all", "TODO", "FIXME", "HACK", "BUG"],
      },
    ],
    run: ({ root, kinds }) => ({
      findings: [
        { path: "src/api/auth.py", line: 47, kind: "TODO", comment: "rotate the session key on logout" },
        { path: "src/api/auth.py", line: 112, kind: "FIXME", comment: "race condition under concurrent token refresh" },
        { path: "src/storage/cache.ts", line: 23, kind: "HACK", comment: "in-memory cache; replace with Redis before prod" },
        { path: "src/billing/webhook.py", line: 89, kind: "TODO", comment: "idempotency key — drop duplicate Stripe events" },
      ].filter((f) => kinds === "all" || f.kind === kinds),
      count: 4,
      truncated: false,
    }),
  },
];

// Faux deterministic hash so the demo can show a plausible-looking digest
// without pulling in crypto-js. SHA-2 it is not; that's fine — the demo's
// job is to show the UX, not crypto correctness.
function simpleHash(text: string, length: number): string {
  let h = 5381;
  for (let i = 0; i < text.length; i++) {
    h = ((h << 5) + h) ^ text.charCodeAt(i);
  }
  const seed = (h >>> 0).toString(16);
  let out = "";
  while (out.length < length) {
    out += seed;
  }
  return out.slice(0, length);
}

export function McpAnvilMiniDemo() {
  const [tools, setTools] = useState<Tool[]>(SEED_TOOLS);
  const [selectedName, setSelectedName] = useState<string>(SEED_TOOLS[0].name);
  const [args, setArgs] = useState<Record<string, string>>(() =>
    Object.fromEntries(SEED_TOOLS[0].inputs.map((i) => [i.name, i.defaultValue])),
  );
  const [output, setOutput] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [showNewToolForm, setShowNewToolForm] = useState(false);

  const selected = tools.find((t) => t.name === selectedName) ?? tools[0];

  const selectTool = (name: string) => {
    const t = tools.find((x) => x.name === name);
    if (!t) return;
    setSelectedName(name);
    setArgs(Object.fromEntries(t.inputs.map((i) => [i.name, i.defaultValue])));
    setOutput(null);
  };

  const handleRun = async () => {
    setRunning(true);
    setOutput(null);
    // Small delay so the loading spinner is visible — sells the "real
    // tool call" feel without actually waiting on anything.
    await new Promise((r) => setTimeout(r, 280));
    try {
      const result = selected.run(args);
      setOutput(JSON.stringify(result, null, 2));
    } catch (e) {
      setOutput(JSON.stringify({ error: String(e) }, null, 2));
    }
    setRunning(false);
  };

  const handleDelete = (name: string) => {
    const t = tools.find((x) => x.name === name);
    if (!t?.custom) return; // only custom tools deletable
    const next = tools.filter((x) => x.name !== name);
    setTools(next);
    if (selectedName === name) {
      selectTool(next[0]?.name ?? "");
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-950/40">
      <header className="flex items-center justify-between border-b border-zinc-800/50 bg-zinc-900/40 px-5 py-3">
        <div className="flex items-center gap-2 text-sm text-zinc-300">
          <Wrench className="h-4 w-4 text-cyan-400" />
          MCP Anvil mini-demo
        </div>
        <span className="hidden text-xs text-zinc-500 sm:inline">
          {tools.length} tool{tools.length === 1 ? "" : "s"} · client-side · no backend
        </span>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[200px_minmax(0,1fr)]">
        {/* Tool list */}
        <aside className="border-b border-zinc-800/50 bg-zinc-925/40 lg:border-b-0 lg:border-r">
          <button
            type="button"
            onClick={() => setShowNewToolForm(true)}
            className="flex w-full items-center justify-between gap-2 border-b border-zinc-800/50 px-4 py-2.5 text-left text-[12px] font-semibold text-cyan-300 transition hover:bg-cyan-500/[0.04]"
          >
            <span>+ New tool</span>
            <Plus className="h-3.5 w-3.5" />
          </button>
          <ul className="py-1">
            {tools.map((t) => {
              const active = t.name === selectedName;
              return (
                <li key={t.name}>
                  <button
                    type="button"
                    onClick={() => selectTool(t.name)}
                    className={`group flex w-full flex-col gap-0.5 border-l-2 px-4 py-2 text-left text-[12px] transition ${
                      active
                        ? "border-cyan-400 bg-cyan-500/[0.05] text-cyan-200"
                        : "border-transparent text-zinc-400 hover:bg-zinc-900/40 hover:text-zinc-200"
                    }`}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="font-mono font-semibold">{t.name}</span>
                      {t.custom && (
                        <span className="rounded-full bg-cyan-500/10 px-1.5 py-px text-[9px] uppercase tracking-wider text-cyan-300">
                          yours
                        </span>
                      )}
                    </span>
                    <span className="text-[10.5px] text-zinc-500">{t.category}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Detail + run pane */}
        <section className="bg-zinc-950/40 p-5">
          {selected && (
            <>
              <div className="flex flex-wrap items-baseline gap-3">
                <h3 className="font-mono text-base font-semibold text-zinc-100">
                  {selected.name}
                </h3>
                <span className="rounded-full bg-zinc-900 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                  {selected.category}
                </span>
                {selected.custom && (
                  <button
                    type="button"
                    onClick={() => handleDelete(selected.name)}
                    className="ml-auto inline-flex items-center gap-1 text-[11px] text-zinc-500 transition hover:text-red-400"
                  >
                    <Trash2 className="h-3 w-3" />
                    Delete
                  </button>
                )}
              </div>
              <p className="mt-2 text-sm text-zinc-400">{selected.blurb}</p>

              <div className="mt-5 space-y-3">
                {selected.inputs.map((input) => (
                  <div key={input.name} className="flex flex-col gap-1.5">
                    <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
                      <span className="font-mono">{input.label}</span>
                    </label>
                    {input.type === "select" ? (
                      <select
                        value={args[input.name] ?? input.defaultValue}
                        onChange={(e) =>
                          setArgs({ ...args, [input.name]: e.target.value })
                        }
                        className="rounded-md border border-zinc-800 bg-zinc-925 px-3 py-2 font-mono text-[12.5px] text-zinc-200 focus:border-cyan-500 focus:outline-none"
                      >
                        {input.options?.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={input.type}
                        value={args[input.name] ?? input.defaultValue}
                        onChange={(e) =>
                          setArgs({ ...args, [input.name]: e.target.value })
                        }
                        placeholder={input.placeholder}
                        className="rounded-md border border-zinc-800 bg-zinc-925 px-3 py-2 font-mono text-[12.5px] text-zinc-200 placeholder:text-zinc-600 focus:border-cyan-500 focus:outline-none"
                      />
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleRun}
                disabled={running}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-400 disabled:opacity-60"
              >
                {running ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                {running ? "Running…" : "Run tool"}
              </button>

              {output && (
                <div className="mt-5 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
                  <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-925 px-3 py-2 text-[11px] text-zinc-400">
                    <span className="font-mono">response · application/json</span>
                    <span className="inline-flex items-center gap-1.5 text-emerald-300">
                      <CheckCircle2 className="h-3 w-3" />
                      200 ok
                    </span>
                  </div>
                  <pre className="overflow-x-auto px-4 py-3 font-mono text-[12px] leading-relaxed text-zinc-200">
                    {output}
                  </pre>
                </div>
              )}
            </>
          )}
        </section>
      </div>

      {/* + New tool modal */}
      {showNewToolForm && (
        <NewToolModal
          existingNames={tools.map((t) => t.name)}
          onCancel={() => setShowNewToolForm(false)}
          onCreate={(tool) => {
            setTools([tool, ...tools]);
            setSelectedName(tool.name);
            setArgs(Object.fromEntries(tool.inputs.map((i) => [i.name, i.defaultValue])));
            setOutput(null);
            setShowNewToolForm(false);
          }}
        />
      )}

      <footer className="border-t border-zinc-800/50 bg-zinc-925/40 px-5 py-2.5 text-[11px] text-zinc-500">
        This is the dashboard's <span className="font-mono text-cyan-400">+ New tool</span> form on a smaller scale. The real version writes a Python file to <span className="font-mono text-zinc-400">~/.mcp-anvil/tools/custom/</span> and hot-reloads <span className="font-mono text-cyan-400">anvil-custom</span> so Claude sees it on the next message.
      </footer>
    </div>
  );
}

function NewToolModal({
  existingNames,
  onCancel,
  onCreate,
}: {
  existingNames: string[];
  onCancel: () => void;
  onCreate: (tool: Tool) => void;
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Custom");
  const [blurb, setBlurb] = useState("");
  const [returnValue, setReturnValue] = useState('{"status": "ok"}');
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const slug = name.trim().toLowerCase().replace(/[^a-z0-9_]+/g, "_");
    if (!slug) {
      setError("Name is required.");
      return;
    }
    if (existingNames.includes(slug)) {
      setError(`A tool named "${slug}" already exists.`);
      return;
    }
    let parsedReturn: Record<string, unknown> = {};
    try {
      parsedReturn = JSON.parse(returnValue.trim() || "{}");
    } catch (e) {
      setError("Return value must be valid JSON.");
      return;
    }
    onCreate({
      name: slug,
      category: category.trim() || "Custom",
      blurb: blurb.trim() || `Custom tool ${slug}.`,
      inputs: [
        { name: "input", label: "input", type: "text", defaultValue: "" },
      ],
      run: () => parsedReturn,
      custom: true,
    });
  };

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-950/85 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-cyan-500/30 bg-zinc-925 shadow-2xl shadow-cyan-500/[0.08]">
        <header className="flex items-center justify-between border-b border-zinc-800/70 bg-zinc-900 px-5 py-3">
          <span className="font-serif text-sm font-semibold text-zinc-100">
            + New tool
          </span>
          <button
            type="button"
            onClick={onCancel}
            className="text-zinc-500 transition hover:text-zinc-300"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </header>
        <div className="space-y-3.5 px-5 py-4">
          <Field label="name" hint="lowercase, [a-z0-9_]">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="my_tool"
              className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 font-mono text-[12.5px] text-zinc-200 placeholder:text-zinc-600 focus:border-cyan-500 focus:outline-none"
            />
          </Field>
          <Field label="category" hint="freeform label">
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Custom"
              className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 font-mono text-[12.5px] text-zinc-200 focus:border-cyan-500 focus:outline-none"
            />
          </Field>
          <Field label="description">
            <input
              value={blurb}
              onChange={(e) => setBlurb(e.target.value)}
              placeholder="What this tool does, in one sentence."
              className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-[13px] text-zinc-200 placeholder:text-zinc-600 focus:border-cyan-500 focus:outline-none"
            />
          </Field>
          <Field label="return JSON" hint="what the tool returns when called">
            <textarea
              value={returnValue}
              onChange={(e) => setReturnValue(e.target.value)}
              rows={4}
              className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 font-mono text-[12px] text-zinc-200 focus:border-cyan-500 focus:outline-none"
            />
          </Field>
          {error && (
            <p className="rounded-md bg-red-500/10 px-3 py-1.5 text-xs text-red-300">
              {error}
            </p>
          )}
          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-md border border-zinc-800 bg-zinc-925 px-3 py-1.5 text-xs text-zinc-300 transition hover:bg-zinc-900"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-md bg-cyan-500 px-4 py-1.5 text-xs font-semibold text-zinc-950 transition hover:bg-cyan-400"
            >
              Create + reload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="flex items-baseline gap-2">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
          {label}
        </span>
        {hint && <span className="text-[10.5px] text-zinc-500">{hint}</span>}
      </label>
      {children}
    </div>
  );
}
