import { Button } from "@/modules/shared/ui/src/components";
import { MexicoMap } from "./mexico-map";

interface HeroProps {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  mapLabel: string;
}

export function Hero({ eyebrow, title, description, primaryCta, secondaryCta, mapLabel }: HeroProps) {
  return (
    <section className="hero-dark">
      <div className="container-site grid items-center gap-12 py-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] lg:py-28">
        <div>
          <p className="text-micro uppercase tracking-wider text-brand-light">{eyebrow}</p>
          <h1 className="text-display mt-4 max-w-4xl font-display text-white">{title}</h1>
          <p className="text-body-lg mt-6 max-w-2xl text-white/80">{description}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/empresas">{primaryCta}</Button>
            <Button href="/ecosistema" variant="secondary">
              {secondaryCta}
            </Button>
          </div>
        </div>
        <MexicoMap label={mapLabel} />
      </div>
    </section>
  );
}
