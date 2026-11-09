import { FileText, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { contactData, organizationStatus } from "@/app/organization-status";
import { LANGS, type Lang } from "@/app/routes-map";
import { statutes } from "@/content/statutes";
import { useLang, useT } from "@/i18n";
import { cn } from "@/lib/utils";
import { ShareBlock, StatusNotice } from "../site/blocks";
import { Card, LangLink, PageHeader, Section, btn } from "../site/ui";

function ContactButtons() {
  const t = useT();
  return (
    <div className="flex flex-wrap gap-3">
      <a href={contactData.phoneHref} className={btn.primary}><Phone className="h-4 w-4" />{t.cta.call}</a>
      <a href={`mailto:${contactData.email}`} className={btn.outline}><Mail className="h-4 w-4" />{t.cta.email}</a>
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return <ul className="mt-3 list-disc space-y-1 pl-5 text-muted-foreground">{items.map((i) => <li key={i}>{i}</li>)}</ul>;
}

export { DonatePage } from "../donate/DonatePage";

export function InvolvedPage() {
  const t = useT();
  return (
    <>
      <PageHeader title={t.involved.title} intro={t.involved.intro} />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.involved.cards.map((c) => <Card key={c.t}><h2 className="font-extrabold text-primary">{c.t}</h2><p className="mt-2 text-sm text-muted-foreground">{c.d}</p></Card>)}
        </div>
        <p className="mt-8 text-muted-foreground">{t.involved.formNote}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4"><ContactButtons /><ShareBlock /></div>
      </Section>
    </>
  );
}

export function AboutPage() {
  const t = useT();
  const a = t.about;
  return (
    <>
      <PageHeader title={a.title} intro={a.story} />
      <Section title={a.teamTitle}>
        <p className="-mt-4 mb-6 text-muted-foreground">{a.teamNote}</p>
        <div className="grid gap-6 md:grid-cols-3">
          {a.team.map((m) => <Card key={m.name}><p className="text-lg font-extrabold text-primary">{m.name}</p><p className="text-sm text-muted-foreground">{m.role}</p></Card>)}
        </div>
      </Section>
      <Section className="bg-card">
        <div className="grid gap-6 md:grid-cols-2">
          {[[a.csfTitle, a.csf], [a.principlesTitle, a.principles], [a.scopeTitle, a.scope], [a.statusTitle, a.statusText]].map(([h, p]) => (
            <div key={h}><h2 className="text-xl font-extrabold text-primary">{h}</h2><p className="mt-2 text-muted-foreground">{p}</p></div>
          ))}
        </div>
      </Section>
    </>
  );
}

export function TransparencyPage() {
  const t = useT();
  const x = t.transparency;
  return (
    <>
      <PageHeader title={x.title} />
      <Section>
        <h2 className="mb-4 text-xl font-extrabold text-primary">{x.statusTitle}</h2>
        <StatusNotice />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card><h2 className="text-lg font-extrabold text-primary">{x.docsTitle}</h2><p className="mt-2 text-muted-foreground">{x.docsText}</p><LangLink page="statutes" className={cn(btn.green, "mt-4")}>{x.docsLink}</LangLink></Card>
          <Card><h2 className="text-lg font-extrabold text-primary">{x.fundsTitle}</h2><List items={x.funds} /></Card>
          <Card><h2 className="text-lg font-extrabold text-primary">{x.protectionTitle}</h2><p className="mt-2 text-muted-foreground">{x.protection}</p></Card>
          <Card><h2 className="text-lg font-extrabold text-primary">{x.reportsTitle}</h2><p className="mt-2 text-muted-foreground">{x.reports}</p></Card>
        </div>
      </Section>
    </>
  );
}

const langLabel: Record<Lang, string> = { de: "Deutsch", en: "English", es: "Español" };

export function StatutesPage() {
  const t = useT();
  const lang = useLang();
  const [doc, setDoc] = useState<"statutes" | "rules" | "finance">("statutes");
  const [v, setV] = useState<Lang>(lang);
  const s = statutes[v];
  const st = t.statutes;
  return (
    <>
      <PageHeader title={st.title} intro={st.intro} />
      <Section>
        <div role="tablist" className="mb-8 flex flex-wrap gap-2">
          {(["statutes", "rules", "finance"] as const).map((k) => (
            <button key={k} role="tab" aria-selected={doc === k} onClick={() => setDoc(k)}
              className={cn("rounded-full px-5 py-2.5 text-sm font-bold", doc === k ? "bg-primary text-primary-foreground" : "border border-border bg-card text-foreground hover:border-primary")}>
              {st.docs[k]}
            </button>
          ))}
        </div>
        {doc !== "statutes" ? (
          <Card><h2 className="text-xl font-extrabold text-primary">{st.docs[doc]}</h2><p className="mt-2 text-muted-foreground">{st.comingSoon}</p></Card>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
            <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">{st.versionLabel}</p>
                <div className="flex flex-wrap gap-2">
                  {LANGS.map((l) => (
                    <button key={l} onClick={() => setV(l)} aria-pressed={v === l} lang={l}
                      className={cn("rounded-full px-3 py-1.5 text-sm font-bold", v === l ? "bg-secondary text-secondary-foreground" : "border border-border bg-card")}>{langLabel[l]}</button>
                  ))}
                </div>
              </div>
              <a href={s.pdfUrl} target="_blank" rel="noopener noreferrer" className={cn(btn.outline, "w-full")}><FileText className="h-4 w-4" />{st.download}</a>
              <nav aria-label={st.toc} className="hidden lg:block">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">{st.toc}</p>
                <ul className="space-y-1 text-sm">{s.sections.map((sec, i) => <li key={i}><a href={`#p${i + 1}`} className="text-muted-foreground hover:text-primary">{sec.title}</a></li>)}</ul>
              </nav>
            </aside>
            <article lang={v} className="rounded-2xl border border-border bg-card p-6 shadow-soft md:p-10">
              <p className="text-xs font-bold uppercase tracking-wider text-secondary">{st.draft}</p>
              <h2 className="mt-2 text-2xl font-extrabold text-primary md:text-3xl">{s.heading}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{s.subtitle}</p>
              <p className="mt-3 text-sm text-muted-foreground">{s.header}</p>
              <p className="mt-4 rounded-xl bg-muted p-4 text-sm font-semibold">{s.disclaimer ?? st.binding}</p>
              {s.sections.map((sec, i) => (
                <section key={i} id={`p${i + 1}`} className="mt-8 scroll-mt-24">
                  <h3 className="text-lg font-extrabold text-primary">{sec.title}</h3>
                  {sec.paras.map((p) => <p key={p} className="mt-2 leading-relaxed">{p}</p>)}
                  {sec.list && <ul className="mt-2 space-y-1 pl-5">{sec.list.map((l) => <li key={l}>{l}</li>)}</ul>}
                  {sec.after?.map((p) => <p key={p} className="mt-2 leading-relaxed">{p}</p>)}
                </section>
              ))}
            </article>
          </div>
        )}
      </Section>
    </>
  );
}

export function FaqPage() {
  const t = useT();
  return (
    <>
      <PageHeader title={t.faq.title} />
      <Section>
        <div className="space-y-3">
          {t.faq.items.map((f, i) => (
            <details key={f.q} className="rounded-xl border border-border bg-card p-5">
              <summary className="cursor-pointer font-bold text-primary">{f.q}</summary>
              <p className="mt-3 text-muted-foreground">{i === 5 && organizationStatus.taxRecognitionConfirmed ? t.faq.taxConfirmed : f.a}</p>
            </details>
          ))}
        </div>
      </Section>
    </>
  );
}

export function ContactPage() {
  const t = useT();
  const c = t.contact;
  return (
    <>
      <PageHeader title={c.title} intro={c.intro} />
      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          <Card><MapPin className="h-6 w-6 text-secondary" /><h2 className="mt-3 font-extrabold text-primary">{c.address}</h2><p className="mt-1 text-muted-foreground">{organizationStatus.preRegistrationName}<br />{contactData.street}<br />{contactData.city}</p></Card>
          <Card><Phone className="h-6 w-6 text-secondary" /><h2 className="mt-3 font-extrabold text-primary">{c.phone}</h2><a href={contactData.phoneHref} className="mt-1 block font-semibold hover:underline">{contactData.phoneDisplay}</a></Card>
          <Card><Mail className="h-6 w-6 text-secondary" /><h2 className="mt-3 font-extrabold text-primary">{c.email}</h2><a href={`mailto:${contactData.email}`} className="mt-1 block font-semibold break-all hover:underline">{contactData.email}</a></Card>
        </div>
        <Card className="mt-8"><h2 className="font-extrabold text-primary">{c.formTitle}</h2><p className="mt-2 text-muted-foreground">{c.formDisabled}</p><div className="mt-4"><ContactButtons /></div></Card>
      </Section>
    </>
  );
}

export function LegalPage() {
  const t = useT();
  const l = t.legal;
  return (
    <>
      <PageHeader title={l.title} intro={l.draftNote} />
      <Section>
        <div className="max-w-2xl space-y-6">
          <div><h2 className="font-extrabold text-primary">{l.provider}</h2><p className="mt-2 text-muted-foreground">{organizationStatus.preRegistrationName}<br />{contactData.street}<br />{contactData.city}</p><p className="mt-2 text-muted-foreground">{l.status}</p></div>
          <div><h2 className="font-extrabold text-primary">{t.contact.title}</h2><p className="mt-2 text-muted-foreground">{t.contact.phone}: {contactData.phoneDisplay}<br />{t.contact.email}: {contactData.email}</p></div>
          <div><h2 className="font-extrabold text-primary">{l.responsible}</h2><p className="mt-2 text-muted-foreground">{l.responsibleName}, {contactData.street}, {contactData.city}</p></div>
        </div>
      </Section>
    </>
  );
}

export function PrivacyPage() {
  const t = useT();
  return (
    <>
      <PageHeader title={t.privacy.title} intro={t.privacy.draftNote} />
      <Section>
        <div className="max-w-2xl space-y-6">
          {t.privacy.sections.map((s) => <div key={s.t}><h2 className="font-extrabold text-primary">{s.t}</h2><p className="mt-2 text-muted-foreground">{s.d}</p></div>)}
        </div>
      </Section>
    </>
  );
}

export function NotFoundPage() {
  const t = useT();
  return (
    <Section>
      <div className="py-16 text-center">
        <p className="text-7xl font-extrabold text-secondary">404</p>
        <h1 className="mt-4 text-2xl font-extrabold text-primary">{t.notFound.title}</h1>
        <p className="mt-2 text-muted-foreground">{t.notFound.text}</p>
        <LangLink className={cn(btn.primary, "mt-6")}>{t.notFound.back}</LangLink>
      </div>
    </Section>
  );
}
