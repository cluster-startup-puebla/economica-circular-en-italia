import { Button } from "@/modules/shared/ui/src/components";

/**
 * Swap for the illustration when it arrives, e.g. "/hero/landscape.webp".
 * The scene stays full-bleed; the white panel and the stippled rim are vectors on top.
 */
const HERO_BACKGROUND_SRC: string | null = null;

interface HeroProps {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
}

export function Hero({ eyebrow, title, description, primaryCta, secondaryCta }: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-[#fffcf7] text-[#1a1a1a]">
      <div className="relative h-[20rem] sm:h-[24rem] lg:absolute lg:inset-0 lg:h-auto" aria-hidden="true">
        <HeroScene />
        <HeroLip className="absolute inset-x-0 -bottom-px h-20 w-full lg:hidden" />
      </div>

      <HeroPanel className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block" />

      <div className="relative z-10 lg:flex lg:min-h-[48rem] lg:items-end xl:min-h-[52rem]">
        <div className="w-full max-w-[26rem] px-6 pt-8 pb-14 sm:px-10 sm:pb-16 lg:max-w-[28rem] lg:px-16 lg:pt-[16rem] lg:pb-20 xl:max-w-[34rem]">
          <p className="text-micro font-medium tracking-[0.16em] text-[#4a433c] uppercase">{eyebrow}</p>
          <h1 className="mt-4 max-w-[11ch] font-display text-[clamp(2.5rem,4.8vw,4.6rem)] leading-[0.92] font-bold tracking-[-0.035em] text-[#1a1a1a] [font-stretch:96%]">
            {title}
          </h1>
          <p className="mt-6 max-w-[38ch] text-body leading-relaxed text-[#3d4f46]">{description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/empresas">{primaryCta}</Button>
            <Button href="/ecosistema" variant="secondary">
              {secondaryCta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroScene() {
  if (HERO_BACKGROUND_SRC) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={HERO_BACKGROUND_SRC}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[72%_center]"
      />
    );
  }

  return (
    <div className="absolute inset-0 bg-[#f6d2c8]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#f8ddd4_0%,#efc9d2_34%,#d9c3b6_68%,#c5d0ae_100%)]" />
      <div className="absolute top-[8%] -right-[6%] h-[34%] w-[78%] rounded-[40%] bg-[#6a5a84]" />
      <div className="absolute top-[22%] right-[-8%] h-[28%] w-[64%] rounded-[46%] bg-[#7d6b96]" />
      <div className="absolute top-[36%] -right-[4%] h-[40%] w-[72%] rounded-[42%] bg-[#2f6a45]" />
      <div className="absolute right-[2%] bottom-[6%] h-[34%] w-[46%] rounded-[38%] bg-[#8fbf4a]" />
      <div className="absolute right-[18%] bottom-0 h-[22%] w-[16%] rounded-t-[40%] bg-[#5c4e78]" />
      <div className="absolute right-[30%] bottom-0 h-[16%] w-[12%] rounded-t-[40%] bg-[#6a5a86]" />
    </div>
  );
}

function HeroPanel({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <filter id="hero-stipple" x="-35%" y="-35%" width="170%" height="170%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="4" result="noise" />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.15 0 0 0 -0.25"
            result="speck"
          />
          <feComposite in="SourceGraphic" in2="speck" operator="in" />
        </filter>
      </defs>
      <path
        d="M0 248 C150 210 280 36 490 108 C690 176 840 48 868 250 C900 470 1020 610 900 900"
        fill="none"
        stroke="#c9c0d6"
        strokeWidth="78"
        strokeLinecap="round"
      />
      <path
        d="M0 248 C150 210 280 36 490 108 C690 176 840 48 868 250 C900 470 1020 610 900 900"
        fill="none"
        stroke="#b7adc4"
        strokeWidth="96"
        strokeLinecap="round"
        filter="url(#hero-stipple)"
      />
      <path d="M0 248 C150 210 280 36 490 108 C690 176 840 48 868 250 C900 470 1020 610 900 900 L0 900 Z" fill="#fffcf7" />
    </svg>
  );
}

function HeroLip({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 80" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <filter id="hero-lip-stipple" x="-20%" y="-80%" width="140%" height="260%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="2" result="noise" />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.1 0 0 0 -0.2"
            result="speck"
          />
          <feComposite in="SourceGraphic" in2="speck" operator="in" />
        </filter>
      </defs>
      <path
        d="M0 34 C70 6 130 62 200 28 C270 0 330 46 400 18"
        fill="none"
        stroke="#c9c0d6"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <path
        d="M0 34 C70 6 130 62 200 28 C270 0 330 46 400 18"
        fill="none"
        stroke="#b7adc4"
        strokeWidth="22"
        strokeLinecap="round"
        filter="url(#hero-lip-stipple)"
      />
      <path d="M0 34 C70 6 130 62 200 28 C270 0 330 46 400 18 L400 80 L0 80 Z" fill="#fffcf7" />
    </svg>
  );
}
