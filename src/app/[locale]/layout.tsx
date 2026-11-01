import type { Metadata, Viewport } from "next";
import { Archivo, Raleway } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import type { Locale } from "@/modules/cores/i18n/src/interfaces/i18n.interface";
import { showProviders } from "@/modules/cores/site/src/config/features";
import { OG_IMAGE, OG_LOCALE, SITE_NAME, SITE_URL } from "@/modules/cores/site/src/config/site";
import { Footer } from "@/modules/features/site/src/components/organisms/footer";
import { Header } from "@/modules/features/site/src/components/organisms/header";
import { ClarityConsent } from "@/modules/cores/analytics/src/components/clarity-consent";
import { DocumentScripts } from "./document-scripts";
import "../globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  weight: "variable",
  axes: ["wdth"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });
  const current = routing.locales.includes(locale as Locale) ? (locale as Locale) : "es";
  const description = t(showProviders ? "metaDescription" : "metaDescriptionWithoutProviders");

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("metaTitle"),
      template: `%s · ${SITE_NAME}`,
    },
    description,
    applicationName: SITE_NAME,
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: OG_LOCALE[current],
      title: t("metaTitle"),
      description,
      images: [{ ...OG_IMAGE, alt: t("metaTitle") }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description,
      images: [{ ...OG_IMAGE, alt: t("metaTitle") }],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      data-theme="light"
      className={`${archivo.variable} ${raleway.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-surface font-body text-ink">
        <div className="page-frame flex min-h-full flex-1 flex-col">
          <DocumentScripts />
          <NextIntlClientProvider messages={messages}>
            <Header showProviders={showProviders} />
            <main id="contenido" className="flex-1">
              {children}
            </main>
            <Footer />
            <ClarityConsent />
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
