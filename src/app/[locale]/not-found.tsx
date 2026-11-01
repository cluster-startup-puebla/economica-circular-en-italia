import { useTranslations } from "next-intl";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import { showProviders } from "@/modules/cores/site/src/config/features";

export default function NotFound() {
  const t = useTranslations("NotFound");
  const description = t(showProviders ? "description" : "descriptionWithoutProviders");

  return (
    <section className="py-16 sm:py-24">
      <div className="container-site max-w-xl">
        <h1 className="text-h1 font-display text-ink">{t("title")}</h1>
        <p className="text-body-lg mt-4 text-ink-secondary">{description}</p>
        <p className="mt-8">
          <Link href="/" className="btn btn-primary">
            {t("cta")}
          </Link>
        </p>
      </div>
    </section>
  );
}
