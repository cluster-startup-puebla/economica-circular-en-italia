import type { MetadataRoute } from "next";
import { getClusters } from "@/data/clusters";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { localeUrl } from "@/modules/cores/site/src/config/site";

const ROUTES = [
  "/",
  "/empresas",
  "/ecosistema",
  "/proveedores",
  ...getClusters().map((cluster) => `/ecosistema/${cluster.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    ROUTES.map((route) => ({
      url: localeUrl(locale, route),
      changeFrequency: "weekly" as const,
      priority: route === "/" ? 1 : 0.8,
      alternates: {
        languages: {
          ...Object.fromEntries(routing.locales.map((item) => [item, localeUrl(item, route)])),
          "x-default": localeUrl("es", route),
        },
      },
    })),
  );
}
