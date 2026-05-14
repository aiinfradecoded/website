import "./globals.css";
import "highlight.js/styles/github-dark.css";
import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono, Source_Serif_4 } from "next/font/google";

const sans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "AI Infra Decoded · MCP Anvil + AgentForge",
    template: "%s · AI Infra Decoded",
  },
  description:
    "Production AI infrastructure for senior engineers. MCP Anvil — a local MCP daemon + dashboard + 64 built-in tools. AgentForge — source-available agent stack with FastAPI + Next.js + pgvector. Both run on your infra, both work with your API keys.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://aiinfradecoded.com"),
  openGraph: {
    title: "AI Infra Decoded · MCP Anvil + AgentForge",
    description:
      "Two products, one philosophy. MCP Anvil hosts every MCP server with 64 built-in tools and a browser dashboard. AgentForge is the production agent stack behind it.",
    type: "website",
    siteName: "AI Infra Decoded",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Infra Decoded · MCP Anvil + AgentForge",
    description:
      "MCP Anvil + AgentForge. Source-available, bring-your-own-keys, no subscriptions.",
  },
};

// JSON-LD Organization schema — tells Google we're a known organization
// with a logo. Required for the logo to appear in search results next to
// our listing. https://developers.google.com/search/docs/appearance/structured-data/logo
//
// We emit three documents in the head:
//   ORG_LD          — the umbrella Organization with both product brands
//   MCP_ANVIL_LD    — SoftwareApplication for MCP Anvil + price offers
//   AGENTFORGE_LD   — SoftwareApplication for AgentForge
// Search can pick whichever matches the user's query best (a search for
// "MCP Anvil" surfaces the product card directly).
const ORG_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AI Infra Decoded",
  url: "https://aiinfradecoded.com",
  logo: "https://aiinfradecoded.com/logo.png",
  description:
    "Production AI infrastructure for senior engineers. MCP Anvil (local MCP daemon + dashboard) and AgentForge (source-available agent stack).",
  sameAs: ["https://github.com/aiinfradecoded"],
  brand: [
    { "@type": "Brand", name: "MCP Anvil", url: "https://aiinfradecoded.com/mcp-anvil" },
    { "@type": "Brand", name: "AgentForge", url: "https://aiinfradecoded.com/agentforge" },
  ],
};

const MCP_ANVIL_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MCP Anvil",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Windows, macOS, Linux",
  url: "https://aiinfradecoded.com/mcp-anvil",
  description:
    "A local MCP daemon and browser dashboard with 64 built-in tools. Import existing MCP servers from Claude Desktop / Claude Code / Cursor with one click. Connect Claude / OpenAI / Gemini through a single MCP router entry.",
  offers: [
    { "@type": "Offer", name: "Personal", price: "29", priceCurrency: "USD" },
    { "@type": "Offer", name: "Team", price: "99", priceCurrency: "USD" },
  ],
  publisher: { "@type": "Organization", name: "AI Infra Decoded" },
};

const AGENTFORGE_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AgentForge",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Windows, macOS, Linux",
  url: "https://aiinfradecoded.com/agentforge",
  description:
    "Source-available production-grade agent boilerplate. FastAPI + Next.js 15 + pgvector. Tier-routed LLM, multi-turn streaming, hybrid RAG, eval harness with CI gate, observability, billing.",
  publisher: { "@type": "Organization", name: "AI Infra Decoded" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_LD) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(MCP_ANVIL_LD) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(AGENTFORGE_LD) }}
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
