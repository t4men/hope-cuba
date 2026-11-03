import { CheckCircle2, MapPin } from "lucide-react";
import { projects } from "@/content/projects";
import { heroImage } from "@/content/media";
import { useLang, useT } from "@/i18n";
import { cn } from "@/lib/utils";
import { ShareBlock, StatusNotice, SupportCTA, programStyle } from "../site/blocks";
import { Card, LangLink, PageHeader, Section } from "../site/ui";

export function ProjectsPage() {
  const t = useT();
  const lang = useLang();
  return (
    <>
      <PageHeader title={t.projectsPage.title} intro={t.projectsPage.intro} />
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p) => {
            const prog = t.programs.find((x) => x.key === p.category)!;
            const s = programStyle[p.category];
            return (
              <article key={p.category} className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
                <div className={cn("h-2", s.bar)} />
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3">
                    <s.Icon className={cn("h-9 w-9", s.text)} aria-hidden />
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">{t.projectsPage.phase}: {t.status.planned}</span>
                  </div>
                  <h2 className="mt-4 text-xl font-extrabold text-primary">{prog.title}</h2>
                  <p className="mt-2 text-muted-foreground">{prog.text}</p>
                  <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-foreground"><MapPin className="h-4 w-4 text-secondary" />{t.projectsPage.region}: {p.region[lang]}</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {p.category === "solar" && <LangLink page="solar" className={cn("text-sm font-bold underline-offset-4 hover:underline", s.text)}>{t.cta.learnMore} →</LangLink>}
                    <LangLink page="donate" className="text-sm font-bold text-primary underline-offset-4 hover:underline">{t.cta.offerSupport} →</LangLink>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Section>
    </>
  );
}

export function SolarPage() {
  const t = useT();
  const lang = useLang();
  const s = t.solar;
  const fmt = new Intl.NumberFormat(lang === "en" ? "en-IE" : lang, { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  return (
    <>
      <PageHeader eyebrow={s.eyebrow} title={t.programs[1].title} intro={t.programs[1].text} />
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <Card><h2 className="text-lg font-extrabold text-solar">{s.statusTitle}: {t.status.planned}</h2><p className="mt-2 text-muted-foreground">{s.statusText}</p></Card>
            <Card><h2 className="text-lg font-extrabold text-primary">{s.situationTitle}</h2><p className="mt-2 text-muted-foreground">{s.situationText}</p></Card>
            <Card><h2 className="text-lg font-extrabold text-primary">{s.locationTitle}</h2><p className="mt-2 text-muted-foreground">{s.locationText}</p></Card>
          </div>
          <figure>
            <img src={heroImage} alt={t.home.heroAlt} loading="lazy" className="w-full rounded-2xl object-cover shadow-soft" />
            <figcaption className="mt-2 text-xs text-muted-foreground">{t.home.heroCaption}</figcaption>
          </figure>
        </div>
      </Section>
      <Section title={s.featuresTitle} className="bg-card">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {s.features.map((f) => (
            <li key={f} className="flex gap-3 rounded-xl border border-border p-4"><CheckCircle2 className="h-5 w-5 shrink-0 text-secondary" aria-hidden /><span>{f}</span></li>
          ))}
        </ul>
        <p className="mt-6 rounded-xl bg-muted p-4 text-sm text-muted-foreground">{s.note}</p>
      </Section>
      <Section title={s.logicTitle}>
        <ol className="grid gap-4 md:grid-cols-5">
          {s.logic.map((l, i) => (
            <li key={l} className="rounded-xl border border-border bg-card p-4">
              <span className="text-2xl font-extrabold text-solar">{i + 1}</span>
              <p className="mt-1 font-semibold text-primary">{l}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section title={s.milestonesTitle} className="bg-card">
        <p className="-mt-4 mb-6 max-w-2xl text-sm text-muted-foreground">{s.milestonesNote}</p>
        <div className="grid gap-6 md:grid-cols-3">
          {s.milestones.map((m) => (
            <Card key={m.amount}>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{s.target}</p>
              <p className="mt-1 text-3xl font-extrabold text-primary">{fmt.format(m.amount)}</p>
              <p className="mt-3 text-muted-foreground">{m.text}</p>
              <p className="mt-3 text-xs italic text-muted-foreground">– {s.subjectTo}</p>
            </Card>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-6">
          <StatusNotice />
          <div className="flex flex-wrap items-center justify-between gap-4">
            <SupportCTA />
            <ShareBlock />
          </div>
        </div>
      </Section>
    </>
  );
}
