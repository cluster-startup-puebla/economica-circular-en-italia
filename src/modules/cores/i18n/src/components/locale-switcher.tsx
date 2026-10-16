"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { routing, usePathname, useRouter } from "@/modules/cores/i18n/src/config/routing";
import type { Locale } from "@/modules/cores/i18n/src/interfaces/i18n.interface";

const LOCALE_LABEL: Record<Locale, string> = {
  es: "Español",
  en: "English",
  it: "Italiano",
};

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Nav");

  function switchTo(next: Locale) {
    router.replace(pathname, { locale: next });
  }

  return (
    <>
      <LocaleMenu locale={locale} label={t("language")} onSelect={switchTo} />
      <LocalePills locale={locale} label={t("language")} onSelect={switchTo} />
    </>
  );
}

function LocalePills({
  locale,
  label,
  onSelect,
}: {
  locale: Locale;
  label: string;
  onSelect: (next: Locale) => void;
}) {
  return (
    <div
      className="hidden items-center gap-1 rounded-full border border-line px-1 py-0.5 text-micro sm:flex"
      role="group"
      aria-label={label}
    >
      <Languages size={14} className="text-ink-muted" aria-hidden="true" />
      {routing.locales.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onSelect(item)}
          aria-current={item === locale ? "true" : undefined}
          className={`inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full px-2.5 uppercase transition ${
            item === locale ? "bg-accent font-semibold text-on-accent" : "text-ink-secondary hover:text-ink"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

function LocaleMenu({
  locale,
  label,
  onSelect,
}: {
  locale: Locale;
  label: string;
  onSelect: (next: Locale) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative sm:hidden">
      <button
        type="button"
        className="inline-flex h-11 items-center gap-1 rounded-full border border-line px-3 text-micro font-semibold text-ink uppercase"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {locale}
        <ChevronDown size={14} aria-hidden className={`transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <ul
          role="listbox"
          aria-label={label}
          className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-md border border-line bg-surface shadow-md"
        >
          {routing.locales.map((item) => {
            const selected = item === locale;
            return (
              <li key={item} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className={`flex min-h-11 w-full items-center justify-between gap-3 px-3 text-left text-small ${
                    selected ? "bg-surface-subtle font-semibold text-brand" : "text-ink"
                  }`}
                  onClick={() => {
                    setOpen(false);
                    if (!selected) onSelect(item);
                  }}
                >
                  <span>{LOCALE_LABEL[item]}</span>
                  <span className="text-micro uppercase text-ink-muted">{item}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
