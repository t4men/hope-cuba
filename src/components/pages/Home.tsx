import { ArrowRight, BatteryCharging, ClipboardCheck, Droplets, Lightbulb, PackageCheck, Search, ShoppingCart, Snowflake } from "lucide-react";
import { heroImage } from "@/content/media";
import { useT } from "@/i18n";
import { cn } from "@/lib/utils";
import { ProgramCard, SituationGallery, StatusNotice, SupportCTA, type programStyle } from "../site/blocks";
import { Card, LangLink, Section, btn } from "../site/ui";

const stepIcons = [Search, ShoppingCart, PackageCheck, ClipboardCheck];
const featureIcons = [BatteryCharging, Snowflake, Droplets, Lightbulb];

export function HomePage() {
  const t = useT();
  const h = t.home;
  return (
    <>
      <section className="bg-[image:var(--gradient-hero)]">
        <div className="container-page grid items-center gap-10 py-12 md:py-16 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-secondary">{h.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-primary md:text-6xl">{h.h1}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{h.teaser}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SupportCTA />
              <LangLink page="projects" className={btn.outline}>{t.cta.projects}</LangLink>
            </div>
            <p className="mt-8 text-sm font-bold tracking-widest text-accent-foreground/80">{t.claim}</p>
          </div>
          <figure className="relative mx-auto w-full max-w-md lg:max-w-none">
            <img src={heroImage} alt={h.heroAlt} className="aspect-[3/4] w-full rounded-3xl object-cover shadow-soft lg:max-h-[640px]" />
            <figcaption className="absolute bottom-3 right-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-muted-foreground">{h.heroCaption}</figcaption>
          </figure>
        </div>
      </section>

      <Section className="bg-card">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-primary md:text-3xl">{h.missionTitle}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{h.missionText}</p>
            <LangLink page="mission" className="mt-5 inline-flex items-center gap-1 font-bold text-secondary hover:underline">{t.nav.mission} <ArrowRight className="h-4 w-4" /></LangLink>
          </div>
          <StatusNotice />
        </div>
      </Section>

      <Section title={h.programsTitle}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.programs.map((p) => <ProgramCard key={p.key} k={p.key as keyof typeof programStyle} title={p.title} text={p.text} />)}
        </div>
      </Section>

      <Section className="bg-primary text-primary-foreground">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-accent">{h.pilotEyebrow} · {t.status.planned}</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">{h.pilotTitle}</h2>
            <p className="mt-4 text-lg leading-relaxed text-primary-foreground/85">{h.pilotText}</p>
            <LangLink page="solar" className={cn(btn.light, "mt-6")}>{t.cta.learnMore}</LangLink>
          </div>
          <ul className="grid grid-cols-2 gap-4">
            {h.pilotFeatures.map((f, i) => {
              const Icon = featureIcons[i] ?? Lightbulb;
              return (
                <li key={f} className="rounded-2xl bg-primary-foreground/10 p-5">
                  <Icon className="h-7 w-7 text-accent" aria-hidden />
                  <p className="mt-3 font-semibold">{f}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      <Section title={h.situationTitle}>
        <p className="-mt-4 mb-8 max-w-2xl text-muted-foreground">{h.situationText}</p>
        <SituationGallery />
      </Section>

      <Section title={h.howTitle} className="bg-card">
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {h.steps.map((s, i) => {
            const Icon = stepIcons[i] ?? Search;
            return (
              <li key={s.t} className="relative rounded-2xl border border-border p-6">
                <span className="text-4xl font-extrabold text-secondary/25">{i + 1}</span>
                <Icon className="mt-2 h-7 w-7 text-secondary" aria-hidden />
                <h3 className="mt-3 font-extrabold text-primary">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </li>
            );
          })}
        </ol>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-primary md:text-3xl">{h.aboutTitle}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{h.aboutText}</p>
            <LangLink page="about" className="mt-5 inline-flex items-center gap-1 font-bold text-secondary hover:underline">{t.nav.about} <ArrowRight className="h-4 w-4" /></LangLink>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-primary md:text-3xl">{h.helpTitle}</h2>
            <ul className="mt-4 space-y-3">
              {h.helpItems.map((i) => (
                <li key={i.t} className="rounded-xl border border-border bg-card p-4">
                  <p className="font-bold text-primary">{i.t}</p>
                  <p className="text-sm text-muted-foreground">{i.d}</p>
                </li>
              ))}
            </ul>
            <div className="mt-5"><SupportCTA /></div>
          </div>
        </div>
      </Section>

      <Section title={h.transparencyTitle} className="bg-card">
        <div className="grid gap-6 md:grid-cols-3">
          <Card><h3 className="font-extrabold text-secondary">{h.doneTitle}</h3><p className="mt-2 text-sm text-muted-foreground">{h.doneText}</p></Card>
          <Card><h3 className="font-extrabold text-solar">{h.plannedTitle}</h3><p className="mt-2 text-sm text-muted-foreground">{h.plannedText}</p></Card>
          <Card><h3 className="font-extrabold text-primary">{h.reportsTitle}</h3><p className="mt-2 text-sm text-muted-foreground">{h.reportsText}</p></Card>
        </div>
        <LangLink page="transparency" className="mt-6 inline-flex items-center gap-1 font-bold text-secondary hover:underline">{t.nav.transparency} <ArrowRight className="h-4 w-4" /></LangLink>
      </Section>

      <Section title={h.faqTitle}>
        <div className="space-y-3">
          {t.faq.items.slice(0, 3).map((f) => (
            <details key={f.q} className="group rounded-xl border border-border bg-card p-5">
              <summary className="cursor-pointer list-none font-bold text-primary">{f.q}</summary>
              <p className="mt-3 text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
        <LangLink page="faq" className="mt-6 inline-flex items-center gap-1 font-bold text-secondary hover:underline">{h.allFaq} <ArrowRight className="h-4 w-4" /></LangLink>
      </Section>
    </>
  );
}
