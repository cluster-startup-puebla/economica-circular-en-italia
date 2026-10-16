interface BridgeStep {
  title: string;
  description: string;
}

interface BridgeProps {
  eyebrow: string;
  title: string;
  steps: BridgeStep[];
}

export function Bridge({ eyebrow, title, steps }: BridgeProps) {
  return (
    <section className="bg-surface-subtle py-20">
      <div className="container-site">
        <p className="text-micro uppercase tracking-wider text-accent">{eyebrow}</p>
        <h2 className="text-h2 mt-3 max-w-2xl font-display text-ink">{title}</h2>
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="card p-6">
              <p className="text-micro text-accent">0{index + 1}</p>
              <h3 className="text-h4 mt-3 font-display text-ink">{step.title}</h3>
              <p className="mt-3 text-body text-ink-secondary">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
