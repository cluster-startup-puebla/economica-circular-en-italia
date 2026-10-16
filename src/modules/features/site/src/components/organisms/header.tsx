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
          condensed ? "px-3 pt-2 sm:px-4 sm:pt-3" : "px-0 pt-0"
        }`}
      >
        <div
          className={`mx-auto transition-all duration-300 ease-out motion-reduce:transition-none ${
            condensed
              ? "max-w-4xl rounded-full border border-line bg-surface/90 shadow-md backdrop-blur-md"
              : "max-w-none border-b border-line bg-surface/90 backdrop-blur-md"
          }`}
        >
          <div className={`container-site flex items-center justify-between gap-4 ${condensed ? "py-2" : "py-3"}`}>
            <Link href="/" aria-label={t("home")} className="h-9 min-w-0 sm:h-10">
              <Logo title={t("mark")} subtitle={t("markLine")} className="max-w-[12rem] sm:max-w-none" />
            </Link>

            <nav className="hidden lg:block" aria-label={t("label")}>
              <ul className="flex items-center gap-5">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={`text-small transition ${
                        isActive(item.href) ? "font-semibold text-brand" : "text-ink-secondary hover:text-accent"
                      }`}
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <LocaleSwitcher />
              <ThemeToggle />
              <button
                type="button"
                className="rounded-sm border border-line p-2 text-ink lg:hidden"
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
            className="mx-3 mt-2 rounded-md border border-line bg-surface shadow-md lg:hidden"
            aria-label={t("label")}
          >
            <ul className="flex flex-col p-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block py-3 text-body transition ${
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
