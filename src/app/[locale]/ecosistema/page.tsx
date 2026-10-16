import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getClusters } from "@/data/clusters";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";
import { ClusterGrid } from "@/modules/features/ecosystem/src/cluster-grid";
import { MexicoMap } from "@/modules/features/pages/src/sections/home/mexico-map";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Ecosystem" });
  return buildMetadata({
    locale,
    route: "/ecosistema",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function EcosystemPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Ecosystem");
  const clusters = getClusters();

  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="container-site">
        <ClusterGrid
          clusters={clusters}
          aside={<MexicoMap label={t("mapLabel")} tone="light" className="w-full" />}
        >
          <header>
            <p className="text-micro uppercase tracking-wider text-accent">{t("eyebrow")}</p>
            <h1 className="text-h1 mt-3 font-display text-ink">{t("title")}</h1>
            <p className="text-body-lg mt-4 max-w-2xl text-ink-secondary">{t("description")}</p>
          </header>

          <div className="mt-10 flex flex-wrap items-center gap-8">
            <p className="text-micro uppercase tracking-wide text-ink-muted">{t("support")}</p>
            <a href="https://www.puebla.gob.mx/" target="_blank" rel="noopener noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/aliados/logo-gobierno-puebla.svg" alt={t("government")} className="h-12 w-auto" />
            </a>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/aliados/logo-sedetra.png" alt={t("sedetra")} className="h-12 w-auto" />
          </div>
        </ClusterGrid>
      </div>
    </section>
  );
}
