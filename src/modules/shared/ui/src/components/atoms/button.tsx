import { Link } from "@/modules/cores/i18n/src/config/routing";

type Variant = "primary" | "secondary";

const VARIANTS: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
};

interface ButtonProps {
  variant?: Variant;
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function Button({ variant = "primary", href, children, className = "" }: ButtonProps) {
  return (
    <Link href={href} className={`btn ${VARIANTS[variant]} ${className}`}>
      {children}
    </Link>
  );
}
