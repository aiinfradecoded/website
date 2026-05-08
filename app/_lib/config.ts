// Public marketing site config. NEXT_PUBLIC_* vars are baked at build time.

/** Where the buyer-facing AgentForge app is deployed. Points at the dashboard + demo. */
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.aiinfradecoded.com";

/** Convenience targets used by CTAs across landing/pricing pages. */
export const APP_DEMO_URL = `${APP_URL}/demo`;
export const APP_DASHBOARD_URL = `${APP_URL}/dashboard`;
export const APP_SIGN_IN_URL = `${APP_URL}/sign-in`;
