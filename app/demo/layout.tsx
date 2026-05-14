// Server-side layout for /demo — exports metadata (the page itself is a
// "use client" component and can't export metadata directly). Renders only
// its children so the visual chrome stays in app/demo/page.tsx.
export const metadata = {
  title: "Demo · interactive chat",
  description:
    "Try the AgentForge chat surface — multi-turn streaming, hybrid RAG, tier-routed LLM responses. No signup, runs entirely client-side with scripted answers.",
  alternates: { canonical: "/demo" },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
