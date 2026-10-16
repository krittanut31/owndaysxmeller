/**
 * Absolute site URL for metadata (OGP). Tolerates values without a scheme
 * (e.g. "example.vercel.app") or empty strings, and falls back to Vercel's
 * production domain, then localhost.
 */
export function getSiteUrl(): URL {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ];

  for (const raw of candidates) {
    const value = raw?.trim();
    if (!value) continue;
    try {
      return new URL(/^https?:\/\//.test(value) ? value : `https://${value}`);
    } catch {
      // ignore malformed values and try the next candidate
    }
  }
  return new URL("http://localhost:3000");
}
