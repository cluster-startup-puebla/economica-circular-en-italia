"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { COMPANY_INDUSTRIES, type Company } from "@/data/companies";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import type { Locale } from "@/modules/cores/i18n/src/interfaces/i18n.interface";

interface CompanyListProps {
  companies: readonly Company[];
  locale: Locale;
}

export function CompanyList({ companies, locale }: CompanyListProps) {
  const t = useTranslations("Companies");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase(locale);
    if (!needle) return companies;
    return companies.filter((company) => {
      const industries = company.industries.map((id) => COMPANY_INDUSTRIES[id][locale]).join(" ");
      const haystack = [company.name, company.summary[locale], company.region[locale], industries]
        .join(" ")
        .toLocaleLowerCase(locale);
      return haystack.includes(needle);
    });
  }, [companies, locale, query]);

  return (
    <div>
      <input
        type="search"
        value={query}
        placeholder={t("search")}
        aria-label={t("search")}
        onChange={(event) => setQuery(event.target.value)}
        className="input w-full max-w-xl"
      />

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-body text-ink-secondary">{t("empty")}</p>
      ) : (
        <div className="mt-8 divide-y divide-line">
          {filtered.map((company) => (
            <Link
              key={company.slug}
              href={`/empresas/${company.slug}`}
              className="group flex items-center gap-3 rounded-md px-2 py-3 transition-colors hover:bg-surface-subtle active:bg-surface-subtle sm:gap-4 sm:px-4"
            >
              <span className="flex h-10 w-16 shrink-0 items-center justify-center sm:h-[53px] sm:w-[122px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={company.logo}
                  alt=""
                  className={`max-h-full max-w-full object-contain ${company.logoDark ? "logo-dark" : ""}`}
                />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <h2 className="max-w-full font-display text-body-lg text-ink group-hover:text-brand">{company.name}</h2>
                  <span className="text-micro text-ink-muted">{company.region[locale]}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={company.cluster.logo}
                    alt={company.cluster.name[locale]}
                    className="h-5 w-auto max-w-28 object-contain"
                  />
                </div>
                <p className="mt-0.5 line-clamp-1 text-small text-ink-secondary">{company.summary[locale]}</p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {company.industries.map((id) => (
                    <li key={id} className="badge-brand">
                      {COMPANY_INDUSTRIES[id][locale]}
                    </li>
                  ))}
                </ul>
              </div>
              <span className="hidden shrink-0 text-small text-link opacity-0 transition-opacity group-hover:opacity-100 sm:inline">
                {t("view")} →
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
