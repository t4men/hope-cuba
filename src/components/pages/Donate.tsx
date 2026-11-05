import { ArrowDown, ArrowUpRight, Bitcoin, BookOpen, Building2, HandHeart, HeartHandshake, Languages, Laptop, Mail, Megaphone, MessageCircle, ShieldCheck, Stethoscope, Users } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { anyPaymentLive, bankLive, bitcoinLive, campaign, contactData, isRegistered, liveCampaigns, organization, payment, receiptsLive, silentLive, verifiedProgress } from "@/app/organization-status";
import { donationHeroImage, reliefImages } from "@/content/media";
import { useLang, useT } from "@/i18n";
import { ShareBlock } from "../site/blocks";
import { CopyButton } from "../site/CopyButton";
import { Section } from "../site/ui";

export const supportEmail = (subject: string) => `mailto:${contactData.email}?subject=${encodeURIComponent(subject)}`;
const icons = [MessageCircle, BookOpen, Laptop, Megaphone, HeartHandshake, Languages, Stethoscope, ShieldCheck];

function EmailAction({ subject, children }: { subject: string; children: React.ReactNode }) {
  return <Button asChild variant="secondary" className="h-auto min-h-11 whitespace-normal py-3 text-center"><a href={supportEmail(subject)}><Mail />{children}</a></Button>;
}

export function VolunteerOpportunities() {
  const d = useT().donate;
  return <>
    <p className="mb-8 max-w-4xl leading-relaxed text-muted-foreground">{d.volunteerIntro}</p>
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {d.opportunities.map((o, i) => {
        const Icon = icons[i] ?? HandHeart;
        return <article key={o.t} className="flex flex-col rounded-lg border border-border bg-card p-5">
          <Icon className="h-7 w-7 text-secondary" aria-hidden />
          <h3 className="mt-4 font-bold text-primary">{o.t}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{o.d}</p>
          <div className="mt-5"><EmailAction subject={o.t}>{d.help}</EmailAction></div>
        </article>;
      })}
    </div>
    <p className="mt-6 text-sm text-muted-foreground">{d.contactNote}</p>
  </>;
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div className="flex items-start justify-between gap-3 border-b border-border py-3"><div className="min-w-0"><dt className="text-xs text-muted-foreground">{label}</dt><dd className="mt-1 break-all font-semibold">{value}</dd></div><CopyButton value={value} /></div>;
}

export function DonatePage() {
  const t = useT();
  const d = t.donate;
  const lang = useLang();
  const money = new Intl.NumberFormat(lang === "en" ? "en-IE" : lang, { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  const date = (value: string) => new Intl.DateTimeFormat(lang, { dateStyle: "medium", timeZone: "UTC" }).format(new Date(value));
  const live = anyPaymentLive();
  const progress = verifiedProgress();
  const campaigns = liveCampaigns();
  const legal = isRegistered() ? d.registered : organization.legalStatus === "association_unregistered" ? d.unregistered : d.status;
  return <>
    <header className="relative isolate overflow-hidden bg-primary text-primary-foreground">
      <img src={donationHeroImage} alt={d.heroAlt} className="absolute inset-0 -z-20 h-full w-full object-cover object-center" fetchPriority="high" />
      <div className="donation-photo-shade absolute inset-0 -z-10" />
      <div className="container-page py-12 md:py-16">
        <p className="mb-4 text-sm font-bold text-accent">{t.nav.donate} · Holguín, Cuba</p>
        <h1 className="max-w-2xl text-3xl font-extrabold leading-tight md:text-5xl">{d.title}<span className="mt-2 block text-2xl md:text-3xl">{d.continuation}</span></h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed md:text-lg">{d.intro}</p>
        <p className="mt-5 max-w-xl border-l-2 border-accent pl-3 text-sm">{legal}{!receiptsLive() && <span className="mt-1 block">{d.tax}</span>}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild variant="secondary" className="h-auto min-h-11 whitespace-normal py-3"><a href={live ? "#donation-methods" : supportEmail(d.ask)}><HandHeart />{live ? d.money : d.ask}</a></Button>
          <Button asChild variant="outline" className="h-auto min-h-11 whitespace-normal border-primary-foreground bg-transparent py-3 text-primary-foreground"><a href="#volunteer"><ArrowDown />{d.time}</a></Button>
          <Button variant="ghost" className="h-auto min-h-11 whitespace-normal py-3" onClick={() => document.getElementById("donation-share")?.scrollIntoView()}><ArrowDown />{t.share.title}</Button>
        </div>
      </div>
    </header>
    <div className="border-b border-border bg-card">
      <div className="container-page flex flex-wrap items-center justify-between gap-5 py-7">
        <div><p className="text-sm font-bold text-secondary">{d.goal}</p><p className="mt-1 text-xl font-extrabold text-primary">{money.format(campaign.minimumGoalEUR)} – {money.format(campaign.stretchGoalEUR)}</p><p className="mt-1 text-xs text-muted-foreground">{d.minimum}: {money.format(campaign.minimumGoalEUR)} · {d.stretch}: {money.format(campaign.stretchGoalEUR)}</p></div>
        <p className="text-sm font-semibold text-primary">{d.until} {date(campaign.endDate)}</p>
        {progress !== null && <div className="w-full"><p className="mb-2 text-sm">{d.received}: {money.format(campaign.verifiedReceivedEUR ?? 0)}</p><progress value={progress} max={100} aria-label={d.received} className="w-full accent-secondary" />{campaign.lastVerifiedAt && <p className="text-xs">{d.verifiedAt}: {date(campaign.lastVerifiedAt)}</p>}</div>}
      </div>
    </div>
    <Section id="donation-methods" title={d.methods}>
      <div role="note" className="mb-8 border-l-4 border-accent bg-muted p-5">
        {!live && <p className="font-semibold">{d.pending}</p>}
        <p className="mt-2 text-sm">{organization.officialRecipientName ? <>{d.recipient}: <strong>{organization.officialRecipientName}</strong>{organization.legalStatus === "initiative_pre_foundation" && <span className="block">{d.privateRecipient}</span>}</> : d.recipientPending}</p>
        <p className="mt-2 text-sm text-muted-foreground">{receiptsLive() ? d.taxReady : d.tax}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <article className="rounded-lg border border-border bg-card p-6"><Building2 className="h-7 w-7 text-secondary" /><h3 className="mt-4 text-xl font-bold text-primary">{d.bank}</h3>
          {bankLive() ? <><p className="mt-3 text-sm">{d.recipient}: {organization.officialRecipientName}</p><dl className="mt-4"><Detail label={d.owner} value={payment.bank.owner} /><Detail label="IBAN" value={payment.bank.iban} />{payment.bank.bic && <Detail label="BIC" value={payment.bank.bic} />}<Detail label={d.reference} value={payment.bank.reference} /></dl><p className="mt-3 text-xs">{receiptsLive() ? d.taxReady : d.tax}</p></> : <><p className="my-4 text-sm leading-relaxed text-muted-foreground">{d.bankPending}</p><EmailAction subject={d.ask}>{t.cta.contact}</EmailAction></>}
        </article>
        <article className="rounded-lg border border-border bg-card p-6"><Bitcoin className="h-7 w-7 text-accent" /><h3 className="mt-4 text-xl font-bold text-primary">{d.bitcoin}</h3>
          {bitcoinLive() ? <><p className="my-3 text-sm">{d.recipient}: {organization.officialRecipientName} · {payment.bitcoin.ownerDescription}</p><QRCodeSVG value={`bitcoin:${payment.bitcoin.address}`} size={180} marginSize={4} title={d.bitcoin} /><p className="my-3 break-all font-mono text-sm">{payment.bitcoin.address}</p><div className="flex flex-wrap gap-3"><CopyButton value={payment.bitcoin.address} /><Button asChild variant="outline"><a href={`bitcoin:${payment.bitcoin.address}`}>{d.wallet}<ArrowUpRight /></a></Button></div><p className="mt-4 text-sm font-semibold">{d.btcWarning}</p><p className="mt-2 text-xs text-muted-foreground">{d.btcPrivacy}</p><p className="mt-2 text-xs">{receiptsLive() ? d.taxReady : d.tax}</p></> : <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{d.btcPending}</p>}
        </article>
        <article className="rounded-lg border border-border bg-card p-6"><ShieldCheck className="h-7 w-7 text-primary" /><h3 className="mt-4 text-xl font-bold text-primary">{d.silent}</h3>
          {silentLive() ? <><p className="my-3 text-sm">{d.recipient}: {organization.officialRecipientName}</p><p className="break-all font-mono text-sm">{payment.silentPayments.address}</p><CopyButton value={payment.silentPayments.address} /><p className="mt-3 text-sm">{d.silentWarning}</p></> : <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{d.silentPending}</p>}
        </article>
      </div>
      <div className="mt-9 border-y border-border py-6"><h3 className="font-bold text-primary">{d.crowdfunding}</h3>{campaigns.length === 0 && <p className="mt-2 text-sm text-muted-foreground">{d.crowdPending}</p>}<div className="mt-4 flex flex-wrap gap-4">{payment.crowdfunding.map(c => { const active = campaigns.some(x => x.id === c.id); return <div key={c.id}><Button asChild variant="link" className="h-auto whitespace-normal px-0"><a href={active ? c.campaignUrl : c.infoUrl} target="_blank" rel="noopener noreferrer">{active ? c.title : `${c.title} · ${d.info}`}<ArrowUpRight /></a></Button>{active && <p className="mt-1 max-w-sm text-xs">{d.recipient}: {organization.officialRecipientName} · {receiptsLive() ? d.taxReady : d.tax}</p>}</div>; })}</div></div>
      <div className="mt-8"><h3 className="font-bold text-primary">{d.amounts}</h3><ul className="mt-4 flex flex-wrap gap-3">{[25,50,100,250].map(n => <li key={n} className="rounded-lg border border-border bg-card px-5 py-3 font-bold text-primary">{money.format(n)}</li>)}<li className="rounded-lg border border-border bg-card px-5 py-3 font-bold text-primary">{d.custom}</li></ul><p className="mt-3 text-xs text-muted-foreground">{d.amountNote}</p></div>
    </Section>
    {bitcoinLive() && <Section title={d.reliefTitle} className="bg-card"><a href={reliefImages[lang]} target="_blank" rel="noopener noreferrer"><img src={reliefImages[lang]} alt={d.reliefAlt} className="mx-auto max-h-[700px] w-full max-w-md object-contain" loading="lazy" /></a><p className="mt-4 text-center text-sm text-muted-foreground">{d.reliefNote}</p></Section>}
    <Section title={d.volunteerTitle} id="volunteer" className="bg-muted"><VolunteerOpportunities /></Section>
    <Section title={d.partnerTitle}><div className="grid gap-10 md:grid-cols-2">{[{Icon: Building2,title:d.partner,text:d.partnerText,cta:d.partnerCta},{Icon:Users,title:d.circle,text:d.circleText,cta:d.circleCta}].map(p => <div key={p.title}><p.Icon className="mb-4 h-8 w-8 text-secondary" /><h3 className="text-xl font-bold text-primary">{p.title}</h3><p className="my-5 leading-relaxed text-muted-foreground">{p.text}</p><EmailAction subject={p.title}>{p.cta}</EmailAction></div>)}</div></Section>
    <Section title={d.faqTitle} className="bg-card"><div className="max-w-4xl">{d.faq.map((f,i) => <details key={f.q} className="border-b border-border py-5"><summary className="cursor-pointer font-bold text-primary">{f.q}</summary><p className="mt-4 leading-relaxed text-muted-foreground">{i === 1 && organization.officialRecipientName ? `${d.recipient}: ${organization.officialRecipientName}` : i === 2 && receiptsLive() ? d.taxReady : f.a}</p></details>)}</div></Section>
    <Section id="donation-share"><h2 className="max-w-3xl text-2xl font-extrabold text-primary md:text-3xl">{d.closing}</h2><div className="mt-7 flex flex-wrap gap-3"><EmailAction subject={d.help}>{t.cta.offerSupport}</EmailAction><Button asChild variant="outline" className="h-auto min-h-11 whitespace-normal py-3"><a href={`tel:${contactData.phoneHref.slice(4)}`}>{t.cta.call}</a></Button></div><div className="mt-8"><ShareBlock /></div></Section>
  </>;
}