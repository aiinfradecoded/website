/**
 * Static terminal mockup for the landing-page hero. Mimics the actual chat-stream
 * SSE output so visitors see what the kit produces.
 *
 * No live state — pure visual. Animation comes from CSS keyframes (fade-in + blink).
 */

interface Line {
  prompt?: string;
  out?: string;
  meta?: string;
  delay: number;
}

const SCRIPT: Line[] = [
  { prompt: "$ curl -X POST localhost:8000/chat/stream -d '{\"message\":\"explain pgvector hybrid search\"}'", delay: 0 },
  { meta: "event: meta\ndata: {\"conversation_id\": \"5b3ca4...\"}", delay: 200 },
  { meta: "event: token\ndata: {\"content\": \"Hybrid\"}", delay: 400 },
  { meta: "event: token\ndata: {\"content\": \" search\"}", delay: 500 },
  { meta: "event: token\ndata: {\"content\": \" combines\"}", delay: 600 },
  { meta: "event: token\ndata: {\"content\": \" cosine\"}", delay: 700 },
  { meta: "event: token\ndata: {\"content\": \" similarity\"}", delay: 800 },
  { meta: "event: token\ndata: {\"content\": \" with\"}", delay: 900 },
  { meta: "event: token\ndata: {\"content\": \" trigram\"}", delay: 1000 },
  { meta: "event: token\ndata: {\"content\": \" matching...\"}", delay: 1100 },
  { meta: "event: done\ndata: {\"model\":\"qwen2.5-coder:32b\",\"latency_ms\":847}", delay: 1500 },
];

export function TerminalMock() {
  return (
    <div className="relative">
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-cyan-400/20 via-transparent to-cyan-400/5 blur-md" aria-hidden />
      <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/95 shadow-2xl">
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/60 px-4 py-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" aria-hidden />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" aria-hidden />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" aria-hidden />
          </div>
          <span className="font-mono text-[11px] text-zinc-500">~/agentforge</span>
          <span className="w-12" aria-hidden />
        </div>

        {/* Body */}
        <pre className="font-mono text-[12.5px] leading-relaxed p-4 overflow-x-auto text-zinc-200 max-h-[420px]">
          {SCRIPT.map((line, i) => {
            const styles = "animate-fade-in-up opacity-0";
            const animationDelay = { animationDelay: `${line.delay}ms`, animationFillMode: "forwards" as const };

            if (line.prompt) {
              return (
                <span key={i} className={`block text-zinc-300 ${styles}`} style={animationDelay}>
                  <span className="text-cyan-400">{line.prompt}</span>
                  {"\n"}
                </span>
              );
            }
            if (line.meta) {
              const lines = line.meta.split("\n");
              return (
                <span key={i} className={`block text-zinc-400 ${styles}`} style={animationDelay}>
                  {lines.map((l, j) => (
                    <span key={j} className={l.startsWith("event:") ? "text-purple-400" : "text-zinc-300"}>
                      {l}
                      {"\n"}
                    </span>
                  ))}
                </span>
              );
            }
            return null;
          })}
          <span
            className="inline-block w-2 h-4 bg-cyan-400 animate-blink align-middle ml-0.5"
            style={{ animationDelay: "1700ms" }}
            aria-hidden
          />
        </pre>
      </div>
    </div>
  );
}
