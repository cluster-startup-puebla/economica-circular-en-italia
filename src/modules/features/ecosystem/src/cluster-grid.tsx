"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import { CLUSTER_GROUP_ORDER, type ClusterWithSlug } from "@/data/clusters";

interface ClusterGridProps {
  clusters: ClusterWithSlug[];
  aside?: ReactNode;
  children?: ReactNode;
}

function ClusterCard({ cluster, statusLabel }: { cluster: ClusterWithSlug; statusLabel: string }) {
  const t = useTranslations("Ecosystem");

  return (
    <Link href={`/ecosistema/${cluster.slug}`} className="card flex h-full flex-col overflow-hidden">
      <div className="flex h-36 items-center justify-center border-b border-line bg-white p-5">
        {cluster.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cluster.logo} alt="" className="max-h-full max-w-full object-contain" />
        ) : (
          <span className="font-display text-h2 text-brand">{cluster.name.charAt(0)}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="badge-brand self-start">{statusLabel}</p>
        <h3 className="mt-2 font-display text-small font-semibold leading-snug text-ink">{cluster.name}</h3>
        <p className="mt-2 line-clamp-2 text-small text-ink-secondary">{cluster.legalName}</p>
        <p className="mt-4 text-small text-ink-muted">{cluster.address || t("puebla")}</p>
        <span className="mt-auto pt-4 text-small text-link">{t("view")}</span>
      </div>
    </Link>
  );
}

export function ClusterGrid({ clusters, aside, children }: ClusterGridProps) {
  const t = useTranslations("Ecosystem");
  const status = t.raw("status") as Record<string, string>;
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("es");
    if (!needle) return clusters;
    return clusters.filter((cluster) =>
      [cluster.name, cluster.legalName, cluster.address].join(" ").toLocaleLowerCase("es").includes(needle),
    );
  }, [clusters, query]);

  return (
    <div>
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-x-10">
        <div>
          {children}
          <label className="mt-12 block max-w-xl">
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
        </div>
        {aside ? <div className="mx-auto w-full max-w-md lg:mr-16 lg:ml-0 lg:w-[26rem]">{aside}</div> : null}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 text-body text-ink-secondary">{t("empty")}</p>
      ) : (
        <div className="mt-12 space-y-16">
          {CLUSTER_GROUP_ORDER.map((group) => {
            const items = filtered.filter((cluster) => cluster.group === group);
            if (items.length === 0) return null;
            return (
              <section key={group} aria-labelledby={`grupo-${group}`}>
                <h2 id={`grupo-${group}`} className="text-h2 font-display text-ink">
                  {t(`groups.${group}.title`)}
                </h2>
                <p className="mt-3 max-w-2xl text-body text-ink-secondary">{t(`groups.${group}.description`)}</p>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {items.map((cluster) => (
                    <li key={cluster.id}>
                      <ClusterCard cluster={cluster} statusLabel={status[cluster.status] ?? cluster.status} />
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
