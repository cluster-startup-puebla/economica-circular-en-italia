"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import type { DirectoryEntry } from "@/data/directory";
import type { Locale } from "@/modules/cores/i18n/src/interfaces/i18n.interface";

interface DirectoryListProps {
  entries: DirectoryEntry[];
  locale: Locale;
  namespace: "Companies" | "Providers";
}

export function DirectoryList({ entries, locale, namespace }: DirectoryListProps) {
  const t = useTranslations(namespace);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase(locale);
    if (!needle) return entries;
    return entries.filter((entry) => {
      const haystack = [entry.name, entry.sector[locale], entry.place[locale], entry.summary[locale]]
        .join(" ")
        .toLocaleLowerCase(locale);
      return haystack.includes(needle);
    });
  }, [entries, locale, query]);

  return (
    <div>
      <label className="block max-w-xl">
        <span className="sr-only">{t("search")}</span>
        <input
          className="input"
          type="search"
          value={query}
          placeholder={t("search")}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>

      <p className="mt-4 text-small text-ink-muted">{t("count", { count: filtered.length })}</p>

      {filtered.length === 0 ? (
        <p className="mt-8 text-body text-ink-secondary">{t("empty")}</p>
      ) : (
        <ul className="mt-6 grid gap-4">
          {filtered.map((entry) => (
            <li key={entry.slug} className="card p-6">
              <p className="badge-brand">{t("example")}</p>
              <h2 className="text-h4 mt-3 font-display text-ink">{entry.name}</h2>
              <p className="mt-2 text-small text-ink-muted">
                {entry.sector[locale]} · {entry.place[locale]}
              </p>
              <p className="mt-3 text-body text-ink-secondary">{entry.summary[locale]}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
