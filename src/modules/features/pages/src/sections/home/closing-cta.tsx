import { Button } from "@/modules/shared/ui/src/components";

interface ClosingCtaProps {
  title: string;
  description: string;
  cta: string;
}

export function ClosingCta({ title, description, cta }: ClosingCtaProps) {
  return (
    <section className="py-14 sm:py-20">
      <div className="container-site">
        <div className="rounded-lg bg-navy px-6 py-12 text-on-brand sm:px-12">
          <h2 className="text-h2 max-w-2xl font-display">{title}</h2>
          <p className="text-body-lg mt-4 max-w-2xl text-white/80">{description}</p>
          <div className="mt-8">
            <Button href="/proveedores">{cta}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
