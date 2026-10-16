interface AlliesProps {
  label: string;
  note: string;
  plasticsAlt: string;
  startupsAlt: string;
}

const LOGOS = [
  {
    key: "plastics" as const,
    src: "/aliados/logo-cluster-plasticos.png",
    frame: "h-24 w-auto max-w-[min(100%,16rem)] sm:h-32",
  },
  {
    key: "startups" as const,
    src: "/aliados/logo-cluster-startups.webp",
    frame: "h-12 w-auto max-w-[min(100%,14rem)] sm:h-16",
  },
];

export function Allies({ label, note, plasticsAlt, startupsAlt }: AlliesProps) {
  const alt = { startups: startupsAlt, plastics: plasticsAlt };

  return (
    <section aria-label={label} className="border-b border-[#e2ddd2] bg-white py-10">
      <p className="text-micro px-6 text-center uppercase tracking-wider text-[#3d4f46]">{label}</p>
      <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-8 px-4 sm:gap-x-14 sm:px-6">
        {LOGOS.map((logo) => (
          <li key={logo.key}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo.src} alt={alt[logo.key]} className={`object-contain ${logo.frame}`} />
          </li>
        ))}
      </ul>
      <p className="mx-auto mt-6 max-w-xl px-6 text-center text-small text-[#3d4f46]">{note}</p>
    </section>
  );
}
