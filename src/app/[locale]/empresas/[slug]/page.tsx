import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { COMPANY_INDUSTRIES, companies, getCompany } from "@/data/companies";
import { Link, routing } from "@/modules/cores/i18n/src/config/routing";
import type { Locale } from "@/modules/cores/i18n/src/interfaces/i18n.interface";
import { companyOgImage } from "@/modules/cores/site/src/config/site";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";

export function generateStaticParams() {
  return companies.map((company) => ({ slug: company.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const company = getCompany(slug);
  const t = await getTranslations({ locale, namespace: "Companies" });
  if (!company) return { title: t("metaTitle") };

  return buildMetadata({
    locale,
    route: `/empresas/${company.slug}`,
    title: company.name,
    description: company.summary[locale as Locale] ?? company.summary.es,
    image: companyOgImage(company.slug),
  });
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound();
  setRequestLocale(locale);
  const company = getCompany(slug);
  if (!company) notFound();

  const t = await getTranslations("Companies");
  const lang = locale as Locale;

  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="container-site max-w-4xl">
        <Link href="/empresas" className="text-small text-link">
          {t("back")}
        </Link>

        <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-start">
          <div className="relative flex h-36 w-36 shrink-0 items-center justify-center rounded-md border border-line bg-white p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={company.logo}
              alt=""
              className={`max-h-full max-w-full object-contain ${company.logoDark ? "logo-dark" : ""}`}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={company.cluster.logo} alt={company.cluster.name[lang]} className="absolute right-2 bottom-2 h-5 w-auto max-w-20 object-contain" />
          </div>
          <div className="min-w-0">
            <ul className="flex flex-wrap gap-1.5">
              {company.industries.map((id) => (
                <li key={id} className="badge-brand">
                  {COMPANY_INDUSTRIES[id][lang]}
                </li>
              ))}
            </ul>
            <h1 className="text-h1 mt-3 font-display text-ink">{company.name}</h1>
            <p className="mt-3 inline-flex items-center gap-2 text-small text-ink-muted">
              <MapPin size={14} aria-hidden />
              {company.region[lang]}
            </p>
            <p className="text-body-lg mt-4 text-ink-secondary">{company.summary[lang]}</p>
          </div>
        </div>

        <div className="mt-12 grid gap-10 border-t border-line pt-8">
          <div>
            <h2 className="text-micro uppercase tracking-wide text-ink-muted">{t("problem")}</h2>
            <p className="mt-3 text-body text-ink-secondary">{company.problem[lang]}</p>
          </div>
          <div>
            <h2 className="text-micro uppercase tracking-wide text-ink-muted">{t("solution")}</h2>
            <p className="mt-3 text-body text-ink-secondary">{company.solution[lang]}</p>
          </div>
        </div>

        {company.products?.length ? (
          <section className="card mt-12 p-6">
            <h2 className="text-micro uppercase tracking-wider text-ink-muted">
              {t(company.slug === "uep" ? "schools" : "products")}
            </h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {company.products.map((product) => {
                const picture = product.image ?? product.logo;
                const card = (
                  <>
                    {picture ? (
                      <div className="aspect-square overflow-hidden rounded-sm border border-line bg-white">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={picture} alt="" loading="lazy" className="h-full w-full object-contain" />
                      </div>
                    ) : null}
                    <div>
                      <h3 className="text-body font-semibold text-ink">{product.name}</h3>
                      <p className="mt-1 text-small text-ink-secondary">{product.summary[lang]}</p>
                    </div>
                  </>
                );
                const className = "flex h-full flex-col gap-3 rounded-md border border-line bg-surface p-4";
                return (
                  <li key={product.slug}>
                    {product.website ? (
                      <a
                        href={product.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${className} transition-colors hover:border-brand`}
                      >
                        {card}
                      </a>
                    ) : (
                      <div className={className}>{card}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        <h2 className="text-micro mt-12 uppercase tracking-wide text-ink-muted">{t("contact")}</h2>
        <div className="card mt-4 p-5">
          {company.contact.person ? (
            <p className="font-display text-h4 text-ink">
              {company.contact.person}
              {company.contact.role ? <span className="ml-2 text-small text-ink-muted">{company.contact.role}</span> : null}
            </p>
          ) : null}
          <ul className="mt-3 space-y-2">
            {company.contact.website ? (
              <li>
                <a href={company.contact.website} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-small break-all text-link">
                  <Globe size={14} aria-hidden />
                  {t("website")}
                </a>
              </li>
            ) : null}
            {company.contact.email ? (
              <li>
                <a href={`mailto:${company.contact.email}`} className="inline-flex min-h-11 items-center gap-2 text-small break-all text-link">
                  <Mail size={14} aria-hidden />
                  {company.contact.email}
                </a>
              </li>
            ) : null}
            {company.contact.phone ? (
              <li>
                <a href={`tel:${company.contact.phone.replace(/\s/g, "")}`} className="inline-flex min-h-11 items-center gap-2 text-small text-link">
                  <Phone size={14} aria-hidden />
                  {company.contact.phone}
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </section>
  );
}
