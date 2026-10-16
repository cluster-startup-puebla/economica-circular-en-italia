import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { companies } from "@/data/directory";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import type { Locale } from "@/modules/cores/i18n/src/interfaces/i18n.interface";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";
import { DirectoryList } from "@/modules/features/directory/src/directory-list";
import { SectionHeader } from "@/modules/shared/ui/src/components";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Companies" });
  return buildMetadata({
    locale,
    route: "/empresas",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function CompaniesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Companies");

  return (
    <section className="py-16 lg:py-24">
      <div className="container-site">
        <SectionHeader as="h1" eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
        <div className="mt-12">
          <DirectoryList entries={companies} locale={locale as Locale} namespace="Companies" />
        </div>
      </div>
    </section>
  );
}
