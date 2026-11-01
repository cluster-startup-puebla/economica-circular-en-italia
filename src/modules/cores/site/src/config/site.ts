import type { Locale } from "@/modules/cores/i18n/src/interfaces/i18n.interface";

export const SITE_NAME = "México Sustentable en Italia";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const OG_LOCALE: Record<Locale, string> = {
  es: "es_MX",
  en: "en_US",
  it: "it_IT",
};

/** Desktop hero. Used as the share image on every page. */
export const OG_IMAGE = {
  url: "/hero/landscape-1920.webp",
  width: 1920,
  height: 1073,
  type: "image/webp",
  alt: SITE_NAME,
} as const;

/** Absolute localized URL with the trailing slash `trailingSlash: true` expects. */
export function localeUrl(locale: string, route = "/") {
  const bare = route === "/" || route === "" ? "" : route.replace(/\/$/, "");
  const path = bare.startsWith("/") || bare === "" ? bare : `/${bare}`;
  return `${SITE_URL}/${locale}${path}/`;
}
