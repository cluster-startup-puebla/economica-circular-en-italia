"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { routing, usePathname, useRouter } from "@/modules/cores/i18n/src/config/routing";
import type { Locale } from "@/modules/cores/i18n/src/interfaces/i18n.interface";

const LOCALE_LABEL: Record<Locale, string> = {
  es: "Español",
  en: "English",
  it: "Italiano",
};

const LOCALE_CODE: Record<Locale, string> = {
  es: "MX",
  en: "EN",
  it: "IT",
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
      {routing.locales.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onSelect(item)}
          aria-current={item === locale ? "true" : undefined}
          className={`inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-full px-2.5 uppercase transition ${
            item === locale ? "bg-accent font-semibold text-on-accent" : "text-ink-secondary hover:text-ink"
          }`}
        >
          <Flag locale={item} />
          {LOCALE_CODE[item]}
        </button>
      ))}
    </div>
  );
}

function Flag({ locale }: { locale: Locale }) {
  const rawId = useId().replace(/:/g, "");

  return (
    <span className="inline-flex h-3.5 w-5 shrink-0 overflow-hidden rounded-[2px] ring-1 ring-black/15" aria-hidden="true">
      {locale === "es" ? <MexicoFlag /> : locale === "it" ? <ItalyFlag /> : <UkFlag clipId={rawId} />}
    </span>
  );
}

function MexicoFlag() {
  return (
    <svg viewBox="0 0 21 14" className="h-full w-full">
      <rect width="7" height="14" fill="#006847" />
      <rect x="7" width="7" height="14" fill="#ffffff" />
      <rect x="14" width="7" height="14" fill="#ce1126" />
      <circle cx="10.5" cy="7" r="1.7" fill="#c4a35a" />
    </svg>
  );
}

function ItalyFlag() {
  return (
    <svg viewBox="0 0 21 14" className="h-full w-full">
      <rect width="7" height="14" fill="#009246" />
      <rect x="7" width="7" height="14" fill="#ffffff" />
      <rect x="14" width="7" height="14" fill="#ce2b37" />
    </svg>
  );
}

function UkFlag({ clipId }: { clipId: string }) {
  return (
    <svg viewBox="0 0 60 30" className="h-full w-full">
      <defs>
        <clipPath id={clipId}>
          <rect width="60" height="30" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect width="60" height="30" fill="#012169" />
        <path d="M0 0 L60 30 M60 0 L0 30" stroke="#ffffff" strokeWidth="8" />
        <path d="M0 0 L60 30 M60 0 L0 30" stroke="#c8102e" strokeWidth="4" />
        <path d="M30 0 V30 M0 15 H60" stroke="#ffffff" strokeWidth="14" />
        <path d="M30 0 V30 M0 15 H60" stroke="#c8102e" strokeWidth="8" />
      </g>
    </svg>
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
        <Flag locale={locale} />
        {LOCALE_CODE[locale]}
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
                  <span className="inline-flex items-center gap-2">
                    <Flag locale={item} />
                    <span>{LOCALE_LABEL[item]}</span>
                  </span>
                  <span className="text-micro uppercase text-ink-muted">{LOCALE_CODE[item]}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
