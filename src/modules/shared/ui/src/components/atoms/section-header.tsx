interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  as?: "h1" | "h2";
}

export function SectionHeader({ eyebrow, title, description, as: Tag = "h2" }: SectionHeaderProps) {
  return (
    <header className="max-w-2xl">
      {eyebrow ? <p className="text-micro uppercase tracking-wider text-accent">{eyebrow}</p> : null}
      <Tag className={`font-display text-ink ${Tag === "h1" ? "text-h1" : "text-h2"} ${eyebrow ? "mt-3" : ""}`}>
        {title}
      </Tag>
      {description ? <p className="text-body-lg mt-4 text-ink-secondary">{description}</p> : null}
    </header>
  );
}
