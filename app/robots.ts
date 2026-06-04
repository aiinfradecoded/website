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
        // Per-token / per-order landing pages. They poll the fulfillment Worker
        // for license blobs and are already noindex+nofollow; keep crawlers out
        // of them entirely. (See PROJECT_STATE.md section 3 — license delivery.)
        disallow: ["/claim", "/thanks", "/mcp-anvil/thanks"],
      },
    ],
    sitemap: "https://aiinfradecoded.com/sitemap.xml",
    host: "https://aiinfradecoded.com",
  };
}
