import { Bitcoin, Check, Copy, ExternalLink, Landmark, Mail, Phone, Twitter } from "lucide-react";
import { useState } from "react";
import { campaign, contactData, payment, bitcoinLive, bankLive, socialLinks } from "@/app/organization-status";
import heroWide from "@/assets/donate-hero-wide.png.asset.json";
import btcQr from "@/assets/btc-qr.png.asset.json";
import foodDe from "@/assets/relief-food-de-v11.png.asset.json";
import foodEn from "@/assets/relief-food-en-v11.png.asset.json";
import foodEs from "@/assets/relief-food-es-v11.png.asset.json";
import { useLang, useT } from "@/i18n";
import { Card, Section, btn } from "../site/ui";

const food = { de: foodDe.url, en: foodEn.url, es: foodEs.url };

export function XFollow() {
  const d = useT().donatePage;
  if (!socialLinks.x) return null;
  return (
    <Card className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div><p className="text-lg font-extrabold text-primary">{d.xTitle}</p><p className="text-muted-foreground">{d.xText}</p></div>
      <a href={socialLinks.x} target="_blank" rel="noopener noreferrer" className={btn.primary}><Twitter className="h-4 w-4" />{d.xCta}</a>
    </Card>
  );
}

function BitcoinCard() {
  const d = useT().donatePage;
  const [copied, setCopied] = useState(false);
  const addr = payment.bitcoin.address;
  return (
    <Card>
      <h3 className="flex items-center gap-2 text-lg font-extrabold text-primary"><Bitcoin className="h-5 w-5" />{d.btcTitle}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{d.btcText}</p>
      <img src={btcQr.url} alt={d.btcQrAlt} className="mx-auto my-4 w-44 rounded bg-card" loading="lazy" />
      <code className="block break-all rounded bg-muted p-2 text-xs">{addr}</code>
      <p className="mt-2 text-xs text-muted-foreground">{d.btcRecipient}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className={btn.outline} onClick={() => { navigator.clipboard?.writeText(addr); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copied ? d.btcCopied : d.btcCopy}
        </button>
        <a href={`bitcoin:${addr}`} className={btn.primary}><Bitcoin className="h-4 w-4" />{d.btcPay}</a>
      </div>
    </Card>
  );
}

export function DonatePage() {
  const d = useT().donatePage;
  const lang = useLang();
  const fmt = (n: number) => new Intl.NumberFormat(lang, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
  const date = (s: string) => new Date(s).toLocaleDateString(lang);
  return (
    <>
      <section className="relative">
        <img src={heroWide.url} alt={d.heroAlt} className="h-[420px] w-full object-cover md:h-[520px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 pb-8 text-primary-foreground">
          <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">{d.status}</span>
          <h1 className="mt-3 max-w-3xl text-3xl font-extrabold md:text-5xl">{d.title}</h1>
          <p className="mt-3 max-w-2xl opacity-90">{d.intro}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href="#spenden" className={btn.primary}>{d.ctaDonate}</a>
            <a href="#mitmachen" className={btn.outline}>{d.ctaHelp}</a>
            <a href={`mailto:${contactData.email}`} className={btn.outline}>{d.ctaContact}</a>
          </div>
          <p className="mt-4 text-sm opacity-90">{d.goal}: {d.goalMin} {fmt(campaign.minimumGoalEUR)} · {d.goalStretch} {fmt(campaign.stretchGoalEUR)} · {d.period} {date(campaign.startDate)} – {date(campaign.endDate)}</p>
        </div>
      </section>

      <Section id="spenden" title={d.optionsTitle}>
        <div className="grid gap-6 md:grid-cols-3">
          {bitcoinLive() && <BitcoinCard />}
          <Card>
            <h3 className="flex items-center gap-2 text-lg font-extrabold text-primary"><Landmark className="h-5 w-5" />{d.bankTitle}</h3>
            {bankLive() ? (
              <dl className="mt-2 text-sm"><dd>{payment.bank.owner}</dd><dd>IBAN {payment.bank.iban}</dd><dd>BIC {payment.bank.bic}</dd><dd>{payment.bank.reference}</dd></dl>
            ) : <p className="mt-2 text-sm text-muted-foreground">{d.bankPending}</p>}
            <h3 className="mt-6 text-lg font-extrabold text-primary">{d.spTitle}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d.spPending}</p>
          </Card>
          <Card>
            <h3 className="text-lg font-extrabold text-primary">{d.cfTitle}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d.cfText}</p>
            <ul className="mt-3 space-y-2">
              {payment.crowdfunding.map((c) => (
                <li key={c.id}><a href={c.approved && c.campaignUrl ? c.campaignUrl : c.infoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-secondary hover:underline">{c.title}<ExternalLink className="h-3 w-3" /></a></li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section className="bg-card" title={d.exampleTitle}>
        <div className="grid items-center gap-8 md:grid-cols-2">
          <img src={food[lang]} alt={d.exampleAlt} className="mx-auto w-full max-w-md rounded-lg shadow" loading="lazy" />
          <p className="text-2xl font-extrabold text-primary">{d.exampleText}</p>
        </div>
      </Section>

      <Section id="mitmachen" title={d.helpTitle}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {d.help.map(([h, p]) => <Card key={h}><p className="font-extrabold text-primary">{h}</p><p className="mt-1 text-sm text-muted-foreground">{p}</p></Card>)}
        </div>
      </Section>

      <Section className="bg-card" title={d.partnerTitle}>
        <p className="max-w-3xl text-muted-foreground">{d.partnerText}</p>
      </Section>

      <Section title={d.faqTitle}>
        <div className="space-y-3">
          {d.faq.map(([q, a]) => (
            <details key={q} className="rounded-lg border bg-card p-4"><summary className="cursor-pointer font-bold text-primary">{q}</summary><p className="mt-2 text-muted-foreground">{a}</p></details>
          ))}
        </div>
      </Section>

      <Section className="bg-card">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-primary">{d.closingTitle}</h2>
          <p className="mt-2 text-muted-foreground">{d.closingText}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a href={contactData.phoneHref} className={btn.primary}><Phone className="h-4 w-4" />{contactData.phoneDisplay}</a>
            <a href={`mailto:${contactData.email}`} className={btn.outline}><Mail className="h-4 w-4" />{contactData.email}</a>
          </div>
        </div>
        <div className="mt-8"><XFollow /></div>
      </Section>
    </>
  );
}
