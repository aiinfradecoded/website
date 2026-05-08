"use client";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

import type { ChatMessage } from "@/app/_lib/types";

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[82%] text-sm leading-relaxed ${
          isUser
            ? "rounded-2xl rounded-br-md bg-zinc-100 px-4 py-2.5 text-zinc-950"
            : "rounded-2xl rounded-bl-md border border-zinc-800/80 bg-zinc-900/40 px-4 py-3 text-zinc-100"
        }`}
      >
        {isUser ? (
          <span className="whitespace-pre-wrap">{message.content}</span>
        ) : (
          <>
            {message.content && (
              <div className="markdown">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            )}
            {message.streaming && message.content && <Cursor />}
            {message.streaming && !message.content && (
              <span className="text-zinc-500">
                <Cursor />
              </span>
            )}
            {message.error && (
              <div className="mt-2 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs text-red-300">
                {message.error}
              </div>
            )}
            {!message.streaming && message.model && (
              <div className="mt-2.5 flex items-center gap-1.5 border-t border-zinc-800/60 pt-2 text-[11px] text-zinc-500">
                <span className="font-mono">{message.model.split("/").slice(-1)[0]}</span>
                {typeof message.latencyMs === "number" && (
                  <>
                    <span aria-hidden>·</span>
                    <span>{message.latencyMs}ms</span>
                  </>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Cursor() {
  return (
    <span className="ml-0.5 inline-block h-3.5 w-[2px] bg-cyan-400 align-middle animate-blink" />
  );
}
