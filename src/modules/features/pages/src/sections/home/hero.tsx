import { Button } from "@/modules/shared/ui/src/components";

interface HeroProps {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
}

export function Hero({ eyebrow, title, description, primaryCta, secondaryCta }: HeroProps) {
  return (
    <section className="relative isolate bg-white text-[#1a1a1a]">
      <div className="relative">
        <img
          src="/hero/landscape.webp"
          srcSet="/hero/landscape.webp 1024w, /hero/landscape-1920.webp 1920w"
          sizes="100vw"
          alt=""
          width={1024}
          height={572}
          fetchPriority="high"
          decoding="async"
          className="h-[17.5rem] w-full object-cover object-[78%_42%] sm:h-[22rem] md:h-auto md:object-fill"
        />
        <HeroLip className="absolute inset-x-0 -bottom-px h-12 w-full md:hidden" />
        <HeroMask className="pointer-events-none absolute inset-0 hidden h-full w-full xl:block" />
      </div>

      <div className="relative z-10 px-6 pt-6 pb-12 sm:px-10 sm:pt-8 sm:pb-14 md:pt-10 xl:absolute xl:bottom-[7%] xl:left-0 xl:w-[min(26rem,31%)] xl:px-12 xl:pt-0 xl:pb-0 2xl:bottom-[8%] 2xl:w-[min(32rem,34%)] 2xl:px-16">
        <p className="text-micro font-medium tracking-[0.16em] text-[#4a433c] uppercase">{eyebrow}</p>
        <h1 className="mt-3 max-w-[14ch] font-display text-[2.35rem] leading-[0.94] font-bold tracking-[-0.03em] text-balance text-[#1a1a1a] [font-stretch:96%] sm:mt-4 sm:text-[2.75rem] md:max-w-[16ch] md:text-[3.15rem] xl:max-w-none xl:text-[clamp(1.9rem,2.45vw,3.15rem)]">
          {title}
        </h1>
        <p className="mt-4 max-w-[38ch] text-[0.98rem] leading-relaxed text-[#3d4f46] sm:mt-5 sm:text-body md:max-w-[46ch] xl:mt-4 xl:max-w-[34ch] xl:text-[0.95rem] 2xl:text-body">
          {description}
        </p>
        <div className="mt-6 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap sm:mt-8 xl:mt-5">
          <Button href="/empresas">{primaryCta}</Button>
          <Button href="/ecosistema" variant="secondary">
            {secondaryCta}
          </Button>
        </div>
      </div>
    </section>
  );
}

function HeroMask({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1024 572" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M0 0 H170 C198 48 192 130 216 198 C238 258 274 304 344 334 C430 362 528 350 578 396 C608 424 536 428 492 456 C462 482 488 524 468 572 H0 Z"
        fill="#ffffff"
      />
    </svg>
  );
}

function HeroLip({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 48" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 26 C72 8 148 40 214 18 C286 0 338 30 400 14 L400 48 L0 48 Z" fill="#ffffff" />
    </svg>
  );
}
