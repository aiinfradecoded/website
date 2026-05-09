/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export — site has no server actions, no API routes, no middleware,
  // no dynamic SSR. Renders fully at build time and serves as static HTML/CSS/JS
  // from Cloudflare Workers Static Assets. /demo is "use client" with scripted
  // responses, so it works fine in a static bundle.
  output: "export",
  // Static export requires explicit /trailing/slash/ behavior to be set; the
  // default works for our nested routes. Leaving as-is.
  images: {
    // next/image needs a configured loader for static export. We don't use
    // next/image anywhere yet, but this future-proofs it without breaking the build.
    unoptimized: true,
  },
};

export default nextConfig;
