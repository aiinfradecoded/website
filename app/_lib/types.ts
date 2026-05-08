export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system" | "tool";
  content: string;
  model?: string | null;
  tier?: string | null;
  latencyMs?: number;
  /** True while assistant tokens are still arriving via SSE. */
  streaming?: boolean;
  error?: string;
}
