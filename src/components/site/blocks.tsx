import { Check, Copy, HeartHandshake, Info, Share2, Stethoscope, Sun, UtensilsCrossed, Sprout } from "lucide-react";
import { useState } from "react";
import { organizationStatus } from "@/app/organization-status";
import { situationMedia } from "@/content/media";
import { useT } from "@/i18n";
import { cn } from "@/lib/utils";
import { LangLink } from "./ui";

export const programStyle = {
  relief: { Icon: UtensilsCrossed, bar: "bg-relief", text: "text-relief", page: "projects" as const },
  solar: { Icon: Sun, bar: "bg-solar", text: "text-solar", page: "solar" as const },
  health: { Icon: Stethoscope, bar: "bg-health", text: "text-health", page: "projects" as const },
  future: { Icon: Sprout, bar: "bg-future", text: "text-future", page: "projects" as const },
};

export function ProgramCard({ k, title, text }: { k: keyof typeof programStyle; title: string; text: string }) {
  const t = useT();
  const s = programStyle[k];
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      <div className={cn("h-2", s.bar)} />
      <div className="flex flex-1 flex-col p-6">
        <s.Icon className={cn("h-9 w-9", s.text)} aria-hidden />
        <h3 className="mt-4 text-lg font-extrabold text-primary">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
        <LangLink page={s.page} className={cn("mt-5 text-sm font-bold underline-offset-4 hover:underline", s.text)}>
          {t.cta.learnMore} →
        </LangLink>
      </div>
    </article>
  );
}

export function StatusNotice({ className }: { className?: string }) {
  const t = useT();
  if (organizationStatus.isRegistered && organizationStatus.taxRecognitionConfirmed) return null;
  return (
    <div role="note" className={cn("flex gap-3 rounded-2xl border border-border bg-muted p-5 text-sm text-foreground", className)}>
      <Info className="h-5 w-5 shrink-0 text-primary" aria-hidden />
      <div>
        {!organizationStatus.isRegistered && <p className="font-semibold">{t.status.prelaunch}</p>}
        {!organizationStatus.taxRecognitionConfirmed && <p className="mt-1 text-muted-foreground">{t.status.receipts}</p>}
      </div>
    </div>
  );
}

export function SupportCTA() {
  const t = useT();
  return (
    <LangLink page="donate" className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-bold text-secondary-foreground hover:bg-secondary/90">
      <HeartHandshake className="h-4 w-4" aria-hidden />
      {organizationStatus.donationsEnabled ? t.cta.helpNow : t.cta.offerSupport}
    </LangLink>
  );
}

export function ShareBlock() {
  const t = useT();
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ url, title: document.title }); } catch { /* cancelled */ }
      return;
    }
    await copy();
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="font-bold text-primary">{t.share.title}</span>
      <button type="button" onClick={share} className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-4 py-2 text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground">
        <Share2 className="h-4 w-4" aria-hidden /> {t.share.share}
      </button>
      <button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-full border-2 border-border px-4 py-2 text-sm font-bold text-foreground hover:border-primary">
        {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
        <span aria-live="polite">{copied ? t.share.copied : t.share.copy}</span>
      </button>
    </div>
  );
}

export function SituationGallery() {
  const t = useT();
  return (
    <div className={cn("grid gap-6", t.situation.length > 2 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:mx-auto lg:max-w-3xl")}>
      {t.situation.map((s) => (
        <a key={s.asset} href={situationMedia[s.asset]} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          <img src={situationMedia[s.asset]} alt={s.alt} loading="lazy" className="aspect-[9/16] w-full object-cover transition-transform group-hover:scale-[1.02]" />
        </a>
      ))}
    </div>
  );
}
