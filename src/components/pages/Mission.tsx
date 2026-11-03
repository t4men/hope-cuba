import { missionGraphic } from "@/content/media";
import { useLang, useT } from "@/i18n";
import { ProgramCard, SituationGallery, type programStyle } from "../site/blocks";
import { PageHeader, Section } from "../site/ui";

export function MissionPage() {
  const t = useT();
  const lang = useLang();
  const g = missionGraphic[lang];
  return (
    <>
      <PageHeader eyebrow={t.claim} title={t.missionPage.title} intro={t.missionPage.text} />
      <Section title={t.missionPage.pillarsTitle}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.programs.map((p) => <ProgramCard key={p.key} k={p.key as keyof typeof programStyle} title={p.title} text={p.text} />)}
        </div>
      </Section>
      {g && (
        <Section title={t.missionPage.graphicTitle} className="bg-card">
          <picture>
            {g.compact && <source media="(max-width: 640px)" srcSet={g.compact} />}
            <img src={g.full} alt={t.missionPage.graphicAlt} loading="lazy" className="mx-auto w-full max-w-xl rounded-2xl shadow-soft" />
          </picture>
        </Section>
      )}
      <Section title={t.home.situationTitle}>
        <p className="-mt-4 mb-8 max-w-2xl text-muted-foreground">{t.home.situationText}</p>
        <SituationGallery />
      </Section>
    </>
  );
}
