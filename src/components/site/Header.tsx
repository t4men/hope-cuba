import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { LANGS, translatePath, type PageKey } from "@/app/routes-map";
import { useLang, useT } from "@/i18n";
import { cn } from "@/lib/utils";
import { Brand } from "./Brand";
import { LangLink, btn } from "./ui";

const NAV: PageKey[] = ["mission", "projects", "donate", "involved", "about", "transparency", "contact"];

export function LanguageSwitcher() {
  const lang = useLang();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav aria-label="Language" className="flex items-center gap-1 text-sm font-bold">
      {LANGS.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-border" aria-hidden>|</span>}
          <Link
            to={translatePath(pathname, l) as string}
            hrefLang={l}
            lang={l}
            aria-current={l === lang ? "true" : undefined}
            onClick={() => {
              try { localStorage.setItem("hc-lang", l); } catch { /* ignore */ }
            }}
            className={cn("rounded px-1.5 py-1 uppercase", l === lang ? "text-secondary" : "text-muted-foreground hover:text-primary")}
          >
            {l}
          </Link>
        </span>
      ))}
    </nav>
  );
}

export function Header() {
  const t = useT();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="container-page flex h-18 items-center justify-between gap-4 py-3">
        <LangLink className="shrink-0" onClick={() => setOpen(false)}>
          <Brand />
        </LangLink>
        <nav aria-label={t.footer.navTitle} className="hidden items-center gap-5 xl:flex">
          {NAV.map((k) => (
            <LangLink key={k} page={k} className="whitespace-nowrap text-sm font-semibold text-foreground hover:text-secondary">
              {t.nav[k]}
            </LangLink>
          ))}
        </nav>
        <div className="hidden items-center gap-4 xl:flex">
          <LanguageSwitcher />
          <LangLink page="donate" className={cn(btn.green, "px-5 py-2.5")}>{t.cta.offerSupport}</LangLink>
        </div>
        <div className="flex items-center gap-2 xl:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.close : t.menu}
            className="rounded-full p-2 text-primary hover:bg-muted"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" className="border-t border-border bg-background xl:hidden">
          <ul className="container-page flex flex-col py-3">
            {NAV.map((k) => (
              <li key={k}>
                <LangLink page={k} onClick={() => setOpen(false)} className="block rounded-lg px-2 py-3 font-semibold text-foreground hover:bg-muted">
                  {t.nav[k]}
                </LangLink>
              </li>
            ))}
            <li className="pt-3 pb-2">
              <LangLink page="donate" onClick={() => setOpen(false)} className={cn(btn.green, "w-full")}>{t.cta.offerSupport}</LangLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
