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
    default: "AI Infra Decoded · Production-grade AI infrastructure for senior engineers",
    template: "%s · AI Infra Decoded",
  },
  description:
    "Production AI infrastructure for senior engineers. Source-available boilerplate (AgentForge) with FastAPI + Next.js 15 + pgvector. Bring your own API keys (Anthropic, OpenAI, Gemini) or run it keyless on Ollama or vLLM. You own the source, no subscriptions.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://aiinfradecoded.com"),
  openGraph: {
    title: "AI Infra Decoded",
    description:
      "Production AI infrastructure for senior engineers. Source-available boilerplate (AgentForge) that works with your API keys, also runs keyless on Ollama or vLLM, no subscriptions.",
    type: "website",
    siteName: "AI Infra Decoded",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Infra Decoded",
    description: "Production AI infrastructure. Bring-your-own-keys, source-available, no subscriptions.",
  },
};

// JSON-LD Organization schema — tells Google we're a known organization
// with a logo. Required for the logo to appear in search results next to
// our listing. https://developers.google.com/search/docs/appearance/structured-data/logo
const ORG_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AI Infra Decoded",
  alternateName: "AgentForge",
  url: "https://aiinfradecoded.com",
  logo: "https://aiinfradecoded.com/logo.png",
  description:
    "Production AI infrastructure for senior engineers. Source-available boilerplate (AgentForge) with FastAPI + Next.js 15 + pgvector.",
  sameAs: [
    "https://github.com/aiinfradecoded",
  ],
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
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
