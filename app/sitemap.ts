import type { MetadataRoute } from "next";

// Required for Next.js static export (output: "export" in next.config.mjs).
export const dynamic = "force-static";

const SITE = "https://aiinfradecoded.com";

/**
 * Static export-friendly sitemap. Generated at build time, served as
 * /sitemap.xml. Submit this URL in Google Search Console → Sitemaps.
 *
 * /claim is excluded — it's a per-token landing page reached from welcome
 * emails, not something we want Google to index.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/pricing", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/demo", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/changelog", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/license", priority: 0.5, changeFrequency: "yearly" as const },
    { path: "/privacy", priority: 0.5, changeFrequency: "yearly" as const },
    { path: "/thanks", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return pages.map((p) => ({
    url: `${SITE}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
