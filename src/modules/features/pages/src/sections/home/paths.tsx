import { Button } from "@/modules/shared/ui/src/components";

interface PathPoint {
  title: string;
  description: string;
}

export interface PathChapter {
  href: string;
  kicker: string;
  title: string;
  description: string;
  link: string;
  points: PathPoint[];
}

interface PathsProps {
  eyebrow: string;
  title: string;
  intro: string;
  chapters: PathChapter[];
}

export function Paths({ eyebrow, title, intro, chapters }: PathsProps) {
  return (
    <section className="py-14 sm:py-20">
      <div className="container-site">
        <p className="text-micro uppercase tracking-wider text-accent">{eyebrow}</p>
        <h2 className="text-h2 mt-3 max-w-3xl font-display text-ink">{title}</h2>
        <p className="text-body-lg mt-4 max-w-2xl text-ink-secondary">{intro}</p>
        <div className="mt-10 flex flex-col gap-12 sm:mt-14 sm:gap-16">
          {chapters.map((chapter) => (
            <article
              key={chapter.href}
              className="grid items-start gap-8 border-t border-line pt-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16"
            >
              <div>
                <p className="text-micro uppercase tracking-wider text-accent">{chapter.kicker}</p>
                <h3 className="text-h3 mt-3 font-display text-ink">{chapter.title}</h3>
                <p className="mt-4 max-w-xl text-body text-ink-secondary">{chapter.description}</p>
                <div className="mt-8">
                  <Button href={chapter.href} variant="secondary">
                    {chapter.link}
                  </Button>
                </div>
              </div>
              <ul className="grid gap-3">
                {chapter.points.map((point) => (
                  <li key={point.title} className="card p-5">
                    <h4 className="font-display text-body-lg text-ink">{point.title}</h4>
                    <p className="mt-2 text-small text-ink-secondary">{point.description}</p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
