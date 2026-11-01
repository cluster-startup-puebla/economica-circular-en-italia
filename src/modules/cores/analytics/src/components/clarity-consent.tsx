"use client";

import { useEffect, useSyncExternalStore } from "react";
import Clarity from "@microsoft/clarity";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/modules/cores/i18n/src/config/routing";

const PROJECT_ID = "z6yiru4xer";
const STORAGE_KEY = "msi-clarity-consent";

type ConsentChoice = "granted" | "denied";
type ConsentSnapshot = "pending" | "unknown" | ConsentChoice;

const listeners = new Set<() => void>();
let current: ConsentChoice | "unknown" | null = null;
let clarityStarted = false;
let lastTrackedKey = "";

function readStored(): ConsentChoice | "unknown" {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value === "granted" || value === "denied") return value;
  } catch {
    return "unknown";
  }
  return "unknown";
}

function getSnapshot(): ConsentSnapshot {
  if (current === null) current = readStored();
  return current;
}

function getServerSnapshot(): ConsentSnapshot {
  return "pending";
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function writeConsent(choice: ConsentChoice) {
  current = choice;
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Private mode can block storage; the in-memory choice still applies this visit.
  }
  listeners.forEach((listener) => listener());
}

function normalizePath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname || "/";
}

function companySlug(pathname: string) {
  const match = pathname.match(/^\/empresas\/([^/]+)$/);
  if (!match?.[1]) return null;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

function startClarity() {
  if (clarityStarted) return;
  Clarity.init(PROJECT_ID);
  Clarity.consentV2({ ad_Storage: "denied", analytics_Storage: "granted" });
  clarityStarted = true;
}

function trackPage(locale: string, pathname: string) {
  const path = normalizePath(pathname);
  const key = `${locale}:${path}`;
  if (lastTrackedKey === key) return;
  lastTrackedKey = key;

  Clarity.setTag("locale", locale);
  Clarity.setTag("path", path);
  Clarity.event("page_view");

  const company = companySlug(path);
  if (!company) return;
  Clarity.setTag("company", company);
  Clarity.event("company_view");
}

export function ClarityConsent() {
  const t = useTranslations("Consent");
  const locale = useLocale();
  const pathname = usePathname();
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (consent !== "granted") return;
    startClarity();
    trackPage(locale, pathname);
  }, [consent, locale, pathname]);

  if (consent !== "unknown") return null;

  return (
    <div
      role="region"
      aria-label={t("label")}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-elevated text-ink shadow-card"
    >
      <div className="container-site flex flex-col gap-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <p className="text-small text-ink-secondary">{t("message")}</p>
        <div className="flex shrink-0 gap-2">
          <button type="button" className="btn btn-secondary min-h-11 px-4 py-2 text-small" onClick={() => writeConsent("denied")}>
            {t("reject")}
          </button>
          <button type="button" className="btn btn-primary min-h-11 px-4 py-2 text-small" onClick={() => writeConsent("granted")}>
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
