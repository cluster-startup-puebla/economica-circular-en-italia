import { Link } from "@/modules/cores/i18n/src/config/routing";

interface PathCard {
  href: string;
  title: string;
  description: string;
  link: string;
}

interface PathsProps {
  eyebrow: string;
  title: string;
  cards: PathCard[];
}

export function Paths({ eyebrow, title, cards }: PathsProps) {
  return (
    <section className="py-20">
      <div className="container-site">
        <p className="text-micro uppercase tracking-wider text-accent">{eyebrow}</p>
        <h2 className="text-h2 mt-3 font-display text-ink">{title}</h2>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <li key={card.href}>
              <Link href={card.href} className="card flex h-full flex-col p-6 no-underline transition hover:-translate-y-0.5">
                <h3 className="text-h4 font-display text-ink">{card.title}</h3>
                <p className="mt-3 flex-1 text-body text-ink-secondary">{card.description}</p>
                <span className="mt-6 text-small text-link">{card.link}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
