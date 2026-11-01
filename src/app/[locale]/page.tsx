import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { showProviders } from "@/modules/cores/site/src/config/features";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";
import { Allies } from "@/modules/features/pages/src/sections/home/allies";
import { Bridge } from "@/modules/features/pages/src/sections/home/bridge";
import { ClosingCta } from "@/modules/features/pages/src/sections/home/closing-cta";
import { Hero } from "@/modules/features/pages/src/sections/home/hero";
import { Paths, type PathChapter } from "@/modules/features/pages/src/sections/home/paths";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });
  return buildMetadata({
    locale,
    route: "/",
    title: t("metaTitle"),
    description: t(showProviders ? "metaDescription" : "metaDescriptionWithoutProviders"),
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");
  const chapters = (t.raw("paths.chapters") as PathChapter[]).filter(
    (chapter) => showProviders || chapter.href !== "/proveedores",
  );
  const steps = (t.raw("bridge.steps") as { title: string; description: string; role?: string }[]).filter(
    (step) => showProviders || step.role !== "providers",
  );

  return (
    <>
      <Hero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t(showProviders ? "hero.description" : "hero.descriptionWithoutProviders")}
        primaryCta={t("hero.primaryCta")}
        secondaryCta={t("hero.secondaryCta")}
      />
      <Allies
        label={t("allies.label")}
        plasticsAlt={t("allies.plastics")}
        startupsAlt={t("allies.startups")}
      />
      <Paths
        eyebrow={t("paths.eyebrow")}
        title={t(showProviders ? "paths.title" : "paths.titleWithoutProviders")}
        intro={t(showProviders ? "paths.intro" : "paths.introWithoutProviders")}
        chapters={chapters}
      />
      <Bridge
        eyebrow={t("bridge.eyebrow")}
        title={t("bridge.title")}
        lead={t(showProviders ? "bridge.lead" : "bridge.leadWithoutProviders")}
        steps={steps}
      />
      {showProviders ? (
        <ClosingCta title={t("closing.title")} description={t("closing.description")} cta={t("closing.cta")} />
      ) : null}
    </>
  );
}
