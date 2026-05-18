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
    default: "AI Infra Decoded · MCP Anvil + Agent Forge",
    template: "%s · AI Infra Decoded",
  },
  description:
    "Production AI infrastructure for senior engineers. MCP Anvil — local MCP daemon + dashboard + 64 built-in tools. Agent Forge — source-available agent workbench that wields those tools. Bundle both for $59 personal / $199 team.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://aiinfradecoded.com"),
  openGraph: {
    title: "AI Infra Decoded · MCP Anvil + Agent Forge",
    description:
      "Two products, one philosophy. MCP Anvil hosts every MCP server with 64 built-in tools and a browser dashboard. Agent Forge is the production agent stack behind it.",
    type: "website",
    siteName: "AI Infra Decoded",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Infra Decoded · MCP Anvil + Agent Forge",
    description:
      "MCP Anvil + Agent Forge. Source-available, bring-your-own-keys, no subscriptions.",
  },
};

// JSON-LD Organization schema — tells Google we're a known organization
// with a logo. Required for the logo to appear in search results next to
// our listing. https://developers.google.com/search/docs/appearance/structured-data/logo
//
// We emit three documents in the head:
//   ORG_LD          — the umbrella Organization with both product brands
//   MCP_ANVIL_LD    — SoftwareApplication for MCP Anvil + price offers
//   AGENTFORGE_LD   — SoftwareApplication for Agent Forge
// Search can pick whichever matches the user's query best (a search for
// "MCP Anvil" surfaces the product card directly).
const ORG_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AI Infra Decoded",
  url: "https://aiinfradecoded.com",
  logo: "https://aiinfradecoded.com/logo.png",
  description:
    "Production AI infrastructure for senior engineers. MCP Anvil (local MCP daemon + dashboard) and Agent Forge (source-available agent stack).",
  sameAs: ["https://github.com/aiinfradecoded"],
  brand: [
    { "@type": "Brand", name: "MCP Anvil", url: "https://aiinfradecoded.com/mcp-anvil" },
    { "@type": "Brand", name: "Agent Forge", url: "https://aiinfradecoded.com/agentforge" },
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
  name: "Agent Forge",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Windows, macOS, Linux",
  url: "https://aiinfradecoded.com/agentforge",
  description:
    "Local agent workbench. Define agents in a dashboard, wire them to MCP Anvil's tool catalog, run them as chat endpoints, eval them before deploy. Source-available.",
  offers: [
    { "@type": "Offer", name: "Personal", price: "49", priceCurrency: "USD" },
    { "@type": "Offer", name: "Team", price: "149", priceCurrency: "USD" },
  ],
  publisher: { "@type": "Organization", name: "AI Infra Decoded" },
};

// Bundle SKU — the recommended-purchase path. Schema.org doesn't have a
// "bundle" type for software, so we emit it as a third SoftwareApplication
// with the bundle's combined price + a description that names both
// included products.
const BUNDLE_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MCP Anvil + Agent Forge bundle",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Windows, macOS, Linux",
  url: "https://aiinfradecoded.com/pricing#bundle",
  description:
    "Both MCP Anvil and Agent Forge under one license. Save $19 on the personal bundle or $49 on team.",
  offers: [
    { "@type": "Offer", name: "Bundle Personal", price: "59", priceCurrency: "USD" },
    { "@type": "Offer", name: "Bundle Team", price: "199", priceCurrency: "USD" },
  ],
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
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(BUNDLE_LD) }}
        />
      </head>
      <body className="min-h-screen antialiased">
        {/*
          Site-wide grid background. Lives at the body level so every page
          inherits it without per-page wiring (was previously per-section,
          which left utility pages like /license and /privacy without the
          treatment). Fixed positioning means the grid stays anchored as
          the buyer scrolls — same effect the dashboard uses.

          The mask radial-gradient in globals.css keeps the grid soft +
          centered on the top-middle of the viewport so it never competes
          with text. pointer-events-none + aria-hidden so it doesn't
          interfere with content or screen readers.
        */}
        <div className="pointer-events-none fixed inset-0 -z-10 grid-bg-page" aria-hidden />
        {children}
      </body>
    </html>
  );
}
