import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { pathFor, type PageKey } from "@/app/routes-map";
import { useLang } from "@/i18n";
import { cn } from "@/lib/utils";

export function LangLink({
  page,
  children,
  className,
  onClick,
}: {
  page?: PageKey | "solar";
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const lang = useLang();
  return (
    <Link to={pathFor(lang, page) as string} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-colors";
export const btn = {
  primary: cn(btnBase, "bg-primary text-primary-foreground hover:bg-primary/90"),
  green: cn(btnBase, "bg-secondary text-secondary-foreground hover:bg-secondary/90"),
  outline: cn(btnBase, "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"),
  light: cn(btnBase, "border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"),
};

export function PageHeader({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: string }) {
  return (
    <header className="border-b border-border bg-[image:var(--gradient-hero)]">
      <div className="container-page py-14 md:py-20">
        {eyebrow && <p className="mb-3 text-sm font-bold uppercase tracking-wider text-secondary">{eyebrow}</p>}
        <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight text-primary md:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{intro}</p>}
      </div>
    </header>
  );
}

export function Section({ title, children, className, id }: { title?: string; children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={cn("py-14 md:py-20", className)}>
      <div className="container-page">
        {title && <h2 className="mb-8 text-2xl font-extrabold tracking-tight text-primary md:text-3xl">{title}</h2>}
        {children}
      </div>
    </section>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-2xl border border-border bg-card p-6 shadow-soft", className)}>{children}</div>;
}
