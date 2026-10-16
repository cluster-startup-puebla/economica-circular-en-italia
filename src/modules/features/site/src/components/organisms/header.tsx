"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/modules/cores/i18n/src/config/routing";
import { LocaleSwitcher } from "@/modules/cores/i18n/src/components/locale-switcher";
import { ThemeToggle } from "@/modules/cores/theme/src/components/theme-toggle";
import { Logo } from "@/modules/shared/ui/src/components";
import { NAV_ITEMS } from "@/modules/features/site/src/config/navigation";

export function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    const update = () => setCondensed(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <a
        href="#contenido"
        className="fixed left-4 -top-32 z-[60] rounded-full bg-brand-dark px-5 py-3 font-bold text-on-brand focus:top-4"
      >
        {t("skipToContent")}
      </a>

      <header
        className={`sticky top-0 z-50 transition-[padding] duration-300 ease-out motion-reduce:transition-none ${
          condensed
            ? "px-3 pt-[max(0.5rem,env(safe-area-inset-top))] sm:px-4 sm:pt-[max(0.75rem,env(safe-area-inset-top))]"
            : "px-0 pt-[env(safe-area-inset-top)]"
        }`}
      >
        <div
          className={`mx-auto transition-all duration-300 ease-out motion-reduce:transition-none ${
            condensed
              ? "max-w-4xl rounded-full border border-line bg-surface/90 shadow-md backdrop-blur-md"
              : "max-w-none border-b border-line bg-surface/90 backdrop-blur-md"
          }`}
        >
          <div
            className={`flex items-center justify-between gap-2 sm:gap-3 ${
              condensed ? "px-3 py-1.5 sm:px-4" : "container-site py-2"
            }`}
          >
            <Link href="/" aria-label={t("home")} className="flex h-9 min-w-0 flex-1 items-center overflow-hidden sm:h-10 lg:flex-none">
              <Logo title={t("mark")} subtitle={t("markLine")} className="w-full lg:w-auto" />
            </Link>

            <nav className="hidden lg:block" aria-label={t("label")}>
              <ul className="flex items-center gap-5">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={`inline-flex min-h-11 items-center text-small transition ${
                        isActive(item.href) ? "font-semibold text-brand" : "text-ink-secondary hover:text-accent"
                      }`}
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <LocaleSwitcher />
              <ThemeToggle />
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ink lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? t("close") : t("open")}
                onClick={() => setOpen((value) => !value)}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {open ? (
          <nav
            id="mobile-nav"
            className="mx-3 mt-2 max-h-[min(70dvh,32rem)] overflow-y-auto rounded-md border border-line bg-surface shadow-md lg:hidden"
            aria-label={t("label")}
          >
            <ul className="flex flex-col p-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex min-h-11 items-center text-body transition ${
                      isActive(item.href) ? "font-semibold text-brand" : "text-ink-secondary"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </header>
    </>
  );
}
