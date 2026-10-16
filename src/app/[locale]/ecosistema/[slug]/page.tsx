import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink, Globe, Mail, MapPin, Phone } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getClusterBySlug, getClusters, socialLabel, socialNetwork, toHref } from "@/data/clusters";
import { Link, routing } from "@/modules/cores/i18n/src/config/routing";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";

export function generateStaticParams() {
  return getClusters().map((cluster) => ({ slug: cluster.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const cluster = getClusterBySlug(slug);
  const t = await getTranslations({ locale, namespace: "Ecosystem" });
  if (!cluster) return { title: t("metaTitle") };

  return buildMetadata({
    locale,
    route: `/ecosistema/${cluster.slug}`,
    title: cluster.name,
    description: cluster.legalName || t("metaDescription"),
  });
}

export default async function ClusterPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound();
  setRequestLocale(locale);
  const cluster = getClusterBySlug(slug);
  if (!cluster) notFound();

  const t = await getTranslations("Ecosystem");
  const status = t.raw("status") as Record<string, string>;
  const roles = t.raw("roles") as Record<string, string>;

  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="container-site max-w-4xl">
        <Link href="/ecosistema" className="text-small text-link">
          {t("back")}
        </Link>

        <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-start">
          <div className="flex h-36 w-36 shrink-0 items-center justify-center rounded-md border border-line bg-white p-4">
            {cluster.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={cluster.logo} alt="" className="max-h-full max-w-full object-contain" />
            ) : null}
          </div>
          <div className="min-w-0">
            <p className="badge-brand">{status[cluster.status] ?? cluster.status}</p>
            <h1 className="text-h1 mt-3 font-display text-ink">{cluster.name}</h1>
            <p className="text-body-lg mt-3 text-ink-secondary">{cluster.legalName || t("pending")}</p>
            {cluster.website ? (
              <a
                href={toHref(cluster.website)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-11 max-w-full items-center gap-2 text-small break-all text-link"
              >
                <Globe size={16} aria-hidden />
                {socialLabel(cluster.website)}
                <ExternalLink size={14} aria-hidden />
              </a>
            ) : null}
          </div>
        </div>

        <dl className="mt-12 grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
          <div>
            <dt className="inline-flex items-center gap-2 text-micro uppercase tracking-wide text-ink-muted">
              <MapPin size={14} aria-hidden />
              {t("address")}
            </dt>
            <dd className="mt-2 text-body text-ink">{cluster.address || t("pending")}</dd>
          </div>
          <div>
            <dt className="text-micro uppercase tracking-wide text-ink-muted">{t("legalName")}</dt>
            <dd className="mt-2 text-body text-ink">{cluster.legalName || t("pending")}</dd>
          </div>
        </dl>

        <h2 className="text-micro mt-12 uppercase tracking-wide text-ink-muted">{t("socials")}</h2>
        {cluster.socials.length > 0 ? (
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {cluster.socials.map((social) => (
              <li key={social}>
                <a
                  href={toHref(social)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center text-small break-all text-link"
                >
                  {socialNetwork(social)} · {socialLabel(social)}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-body text-ink-secondary">{t("pending")}</p>
        )}

        <h2 className="text-micro mt-12 uppercase tracking-wide text-ink-muted">{t("contacts")}</h2>
        {cluster.contacts.length > 0 ? (
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {cluster.contacts.map((contact) => (
              <li key={`${contact.role}-${contact.name}`} className="card p-5">
                <p className="text-micro uppercase tracking-wide text-accent">
                  {roles[contact.role] ?? contact.role}
                </p>
                <p className="mt-2 font-display text-h4 text-ink">{contact.name || t("pending")}</p>
                {contact.phone ? (
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="mt-3 flex min-h-11 items-center gap-2 text-small text-link"
                  >
                    <Phone size={14} aria-hidden />
                    {contact.phone}
                  </a>
                ) : null}
                {contact.email ? (
                  <a href={`mailto:${contact.email}`} className="mt-2 flex min-h-11 items-center gap-2 text-small break-all text-link">
                    <Mail size={14} aria-hidden />
                    {contact.email}
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-body text-ink-secondary">{t("pending")}</p>
        )}
      </div>
    </section>
  );
}
