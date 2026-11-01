interface AlliesProps {
  label: string;
  plasticsAlt: string;
  startupsAlt: string;
}

const LOGOS = [
  {
    key: "plastics",
    src: "/aliados/logo-cluster-plasticos.png",
    href: "https://www.facebook.com/p/Cluster-de-Plasticos-y-Economia-Circular-61571908794064/",
    frame: "h-auto max-h-[4.4rem] w-auto max-w-full sm:h-[6.4rem] sm:max-h-none sm:max-w-[13rem]",
  },
  {
    key: "startups",
    src: "/aliados/logo-cluster-startups.webp",
    href: "https://clusterdestartups.org/",
    frame: "h-auto max-h-[3.25rem] w-auto max-w-full sm:h-[3.5rem] sm:max-h-none sm:max-w-[12rem]",
  },
  {
    key: "comercializadora",
    src: "/aliados/logo-comercializadora.webp",
    alt: "Comercializadora Mexicana de Reciclados",
    href: "https://comere.com.mx/",
    frame: "h-auto max-h-[4.6rem] w-auto max-w-full sm:h-[4.25rem] sm:max-h-none sm:max-w-[9.5rem]",
  },
  {
    key: "comure",
    src: "/aliados/logo-comure.webp",
    alt: "COMURE, Mujeres en el reciclaje",
    href: "https://www.instagram.com/comuremexico/",
    frame: "h-auto max-h-[4.6rem] w-auto max-w-full sm:h-[4.6rem] sm:max-h-none sm:max-w-[8.5rem]",
  },
  {
    key: "conectate",
    src: "/aliados/logo-conectate-emprendedor.webp",
    alt: "Conéctate Emprendedor",
    frame: "h-auto max-h-[2.5rem] w-auto max-w-full sm:h-[3rem] sm:max-h-none sm:max-w-[13rem]",
  },
  {
    key: "capital",
    src: "/aliados/logo-capital-imparable.webp",
    alt: "La Capital Imparable",
    href: "https://www.pueblacapital.gob.mx/",
    frame: "h-auto max-h-[2.25rem] w-auto max-w-full sm:h-[2.55rem] sm:max-h-none sm:max-w-[11.5rem]",
  },
] as const;

export function Allies({ label, plasticsAlt, startupsAlt }: AlliesProps) {
  const translated = { startups: startupsAlt, plastics: plasticsAlt };

  return (
    <section aria-label={label} className="border-b border-line bg-surface py-10">
      <p className="text-micro px-6 text-center uppercase tracking-wider text-ink-secondary">{label}</p>
      <ul className="mx-auto mt-6 grid max-w-md grid-cols-2 items-center justify-items-center gap-x-5 gap-y-7 px-5 sm:flex sm:max-w-none sm:flex-wrap sm:justify-center sm:gap-x-14 sm:gap-y-8 sm:px-6">
        {LOGOS.map((logo) => {
          const alt = "alt" in logo ? logo.alt : translated[logo.key];
          const image = (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logo.src}
              alt={alt}
              className={`object-contain dark:[filter:brightness(0)_invert(1)] ${logo.frame}`}
            />
          );

          return (
            <li key={logo.key} className="flex w-full min-w-0 items-center justify-center sm:w-auto">
              {"href" in logo ? (
                <a
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex max-w-full rounded-sm outline-offset-4 focus-visible:outline-2"
                >
                  {image}
                </a>
              ) : (
                image
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
