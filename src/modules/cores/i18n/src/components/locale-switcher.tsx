"use client";

import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { routing, usePathname, useRouter } from "@/modules/cores/i18n/src/config/routing";
import type { Locale } from "@/modules/cores/i18n/src/interfaces/i18n.interface";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Nav");

  function switchTo(next: Locale) {
    router.replace(pathname, { locale: next });
  }

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-line px-1 py-0.5 text-micro"
      role="group"
      aria-label={t("language")}
    >
      <Languages size={14} className="text-ink-muted" aria-hidden="true" />
      {routing.locales.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => switchTo(item)}
          aria-current={item === locale ? "true" : undefined}
          className={`inline-flex min-h-6 min-w-6 shrink-0 items-center justify-center rounded-full px-2 uppercase transition ${
            item === locale ? "bg-accent font-semibold text-on-accent" : "text-ink-secondary hover:text-ink"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
