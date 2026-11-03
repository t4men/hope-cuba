import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { contactData, organizationStatus, socialLinks } from "@/app/organization-status";
import type { PageKey } from "@/app/routes-map";
import { useT } from "@/i18n";
import { Brand } from "./Brand";
import { LangLink } from "./ui";

const NAV: PageKey[] = ["mission", "projects", "donate", "involved", "about", "transparency", "statutes", "faq", "contact"];

export function Footer() {
  const t = useT();
  const socials = [
    { url: socialLinks.facebook, label: "Facebook", Icon: Facebook },
    { url: socialLinks.instagram, label: "Instagram", Icon: Instagram },
    { url: socialLinks.tiktok, label: "TikTok", Icon: null },
    { url: socialLinks.x, label: "X", Icon: null },
  ].filter((s) => s.url);
  return (
    <footer className="mt-auto bg-primary text-primary-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Brand inverted />
          <p className="mt-4 text-sm font-bold tracking-wider text-accent">{t.claim}</p>
          <p className="mt-2 text-sm text-primary-foreground/80">{t.shortClaim}</p>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-primary-foreground/70">{t.footer.navTitle}</h2>
          <ul className="grid grid-cols-2 gap-2 text-sm lg:grid-cols-1">
            {NAV.map((k) => (
              <li key={k}><LangLink page={k} className="hover:text-accent">{t.nav[k]}</LangLink></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-primary-foreground/70">{t.footer.contactTitle}</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden /> <span>{contactData.street}<br />{contactData.city}</span></li>
            <li><a href={contactData.phoneHref} className="flex gap-2 hover:text-accent"><Phone className="h-4 w-4 text-accent" aria-hidden />{contactData.phoneDisplay}</a></li>
            <li><a href={`mailto:${contactData.email}`} className="flex gap-2 hover:text-accent"><Mail className="h-4 w-4 text-accent" aria-hidden />{contactData.email}</a></li>
          </ul>
          {socials.length > 0 && (
            <ul className="mt-4 flex gap-3">
              {socials.map((s) => (
                <li key={s.label}><a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}>{s.Icon ? <s.Icon className="h-5 w-5" /> : s.label}</a></li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-primary-foreground/70">{t.footer.statusTitle}</h2>
          {!organizationStatus.isRegistered && <p className="text-sm text-primary-foreground/85">{t.status.prelaunch}</p>}
          {!organizationStatus.taxRecognitionConfirmed && <p className="mt-2 text-sm text-primary-foreground/85">{t.status.receipts}</p>}
          <LangLink page="about" className="mt-3 inline-block text-sm font-bold text-accent underline-offset-4 hover:underline">{t.status.learnMore}</LangLink>
          <h2 className="mt-6 mb-2 text-sm font-bold uppercase tracking-wider text-primary-foreground/70">{t.footer.legalTitle}</h2>
          <div className="flex gap-4 text-sm">
            <LangLink page="legal" className="hover:text-accent">{t.nav.legal}</LangLink>
            <LangLink page="privacy" className="hover:text-accent">{t.nav.privacy}</LangLink>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <p className="container-page py-5 text-xs text-primary-foreground/70">
          © {new Date().getFullYear()} {organizationStatus.isRegistered ? organizationStatus.registeredName : organizationStatus.preRegistrationName}
        </p>
      </div>
    </footer>
  );
}
