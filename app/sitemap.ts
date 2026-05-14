import type { MetadataRoute } from "next";

// Required for Next.js static export (output: "export" in next.config.mjs).
export const dynamic = "force-static";

const SITE = "https://aiinfradecoded.com";

/**
 * Static export-friendly sitemap. Generated at build time, served as
 * /sitemap.xml. Submit this URL in Google Search Console → Sitemaps.
 *
 * Priority hierarchy:
 *   1.00  home (products gateway)
 *   0.95  /mcp-anvil (flagship product)
 *   0.90  /agentforge (secondary product)
 *   0.85  /pricing, /demo (high-intent conversion paths)
 *   0.70  /changelog
 *   0.60  /about
 *   0.50  /license, /privacy
 *
 * Excluded from sitemap (intentionally — they carry noindex meta):
 *   /thanks, /mcp-anvil/thanks  — per-purchase confirmation pages
 *   /claim                       — per-token landing page from welcome emails
 *
 * Including /thanks here previously triggered Search Console's
 * "Excluded by 'noindex' tag" warning. The page's noindex meta is correct;
 * the fix is to drop it from the sitemap so Google doesn't expect to index
 * it in the first place.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/mcp-anvil", priority: 0.95, changeFrequency: "weekly" as const },
    { path: "/agentforge", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/pricing", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/demo", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/changelog", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/license", priority: 0.5, changeFrequency: "yearly" as const },
    { path: "/privacy", priority: 0.5, changeFrequency: "yearly" as const },
  ];

  return pages.map((p) => ({
    url: `${SITE}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
