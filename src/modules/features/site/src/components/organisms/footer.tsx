import { getTranslations } from "next-intl/server";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import { Logo } from "@/modules/shared/ui/src/components";
import { NAV_ITEMS } from "@/modules/features/site/src/config/navigation";

export async function Footer() {
  const t = await getTranslations("Footer");
  const nav = await getTranslations("Nav");

  return (
    <footer className="mt-24 border-t border-line bg-surface-subtle py-16">
      <div className="container-site grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <div>
          <Link href="/" className="inline-flex h-10" aria-label={nav("home")}>
            <Logo title={nav("mark")} subtitle={nav("markLine")} />
          </Link>
          <p className="mt-4 max-w-sm text-small text-ink-secondary">{t("tagline")}</p>
        </div>

        <div>
          <p className="text-micro uppercase tracking-wide text-ink-muted">{t("links")}</p>
          <ul className="mt-3 space-y-2 text-small">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-link">
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-site mt-12 border-t border-line pt-10 text-center">
        <p className="text-micro uppercase tracking-wider text-accent">{t("missionLabel")}</p>
        <p className="mt-2 font-display text-body-lg text-ink">{t("missionName")}</p>
      </div>

      <div className="container-site mt-8 text-center">
        <p className="text-micro text-ink-muted">
          © {new Date().getFullYear()} {t("name")}
        </p>
      </div>
    </footer>
  );
}
