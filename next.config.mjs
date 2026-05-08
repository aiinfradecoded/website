/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // typedRoutes was on in v0.x; we're turning it off for v1 because Clerk
  // catch-all routes ([[...sign-in]]) don't register as known routes and
  // every Link to them needs an `as Route` cast. Cost > benefit for now.
  env: {
    NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000",
  },
};

export default nextConfig;
