import type { MetadataRoute } from "next";

// Required for Next.js static export (output: "export" in next.config.mjs).
export const dynamic = "force-static";

/**
 * Generated at build time, served as /robots.txt. Tells search engines where
 * to find the sitemap and which paths are off-limits.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /claim is a per-token landing page; no value in indexing it.
        disallow: "/claim",
      },
    ],
    sitemap: "https://aiinfradecoded.com/sitemap.xml",
    host: "https://aiinfradecoded.com",
  };
}
