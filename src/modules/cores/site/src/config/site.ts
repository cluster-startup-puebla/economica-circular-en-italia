import type { Locale } from "@/modules/cores/i18n/src/interfaces/i18n.interface";

export const SITE_NAME = "México Sustentable en Italia";

function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (explicit) return explicit;

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (production) return `https://${production}`;

  const deployment = process.env.VERCEL_URL;
  if (deployment) return `https://${deployment}`;

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

export const OG_LOCALE: Record<Locale, string> = {
  es: "es_MX",
  en: "en_US",
  it: "it_IT",
};

/** Share image. JPEG, because WhatsApp does not preview WebP. */
export const OG_IMAGE = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: SITE_NAME,
} as const;

/** Absolute localized URL with the trailing slash `trailingSlash: true` expects. */
export function localeUrl(locale: string, route = "/") {
  const bare = route === "/" || route === "" ? "" : route.replace(/\/$/, "");
  const path = bare.startsWith("/") || bare === "" ? bare : `/${bare}`;
  return `${SITE_URL}/${locale}${path}/`;
}
