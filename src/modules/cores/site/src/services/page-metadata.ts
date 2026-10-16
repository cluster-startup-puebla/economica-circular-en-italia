import type { Metadata } from "next";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import type { Locale } from "@/modules/cores/i18n/src/interfaces/i18n.interface";
import { OG_LOCALE, SITE_NAME, localeUrl } from "@/modules/cores/site/src/config/site";

interface BuildMetadataProps {
  locale: string;
  route: string;
  title: string;
  description: string;
  keywords?: string[];
}

export function buildMetadata({
  locale,
  route,
  title,
  description,
  keywords,
}: BuildMetadataProps): Metadata {
  const url = localeUrl(locale, route);
  const languages = Object.fromEntries(routing.locales.map((item) => [item, localeUrl(item, route)]));
  const current = routing.locales.includes(locale as Locale) ? (locale as Locale) : "es";

  return {
    title: route === "/" ? { absolute: title } : title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: {
      canonical: url,
      languages: { ...languages, "x-default": localeUrl("es", route) },
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: SITE_NAME,
      locale: OG_LOCALE[current],
      alternateLocale: routing.locales.filter((item) => item !== current).map((item) => OG_LOCALE[item]),
    },
  };
}
