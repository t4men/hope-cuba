import { LANGS, pathFor, type Lang, type PageKey } from "./routes-map";
import { getDict } from "@/i18n";
import { siteUrl } from "./organization-status";

type MetaKey = PageKey | "home" | "solar" | "notFound";

export function buildHead(lang: Lang, key: MetaKey) {
  const m = getDict(lang).meta[key];
  const pk = key === "home" || key === "notFound" ? undefined : key;
  const alternates = LANGS.map((l) => ({ rel: "alternate", hrefLang: l, href: siteUrl + pathFor(l, pk) }));
  return {
    meta: [
      { title: m.title },
      { name: "description", content: m.description },
      { property: "og:title", content: m.title },
      { property: "og:description", content: m.description },
      { property: "og:type", content: key === "home" ? "website" : "article" },
      { property: "og:url", content: siteUrl + pathFor(lang, pk) },
      { property: "og:locale", content: { de: "de_DE", en: "en_US", es: "es_ES" }[lang] },
      { name: "twitter:card", content: "summary_large_image" },
      ...(key === "notFound" ? [{ name: "robots", content: "noindex" }] : []),
    ],
    links: [
      { rel: "canonical", href: siteUrl + pathFor(lang, pk) },
      ...alternates,
      { rel: "alternate", hrefLang: "x-default", href: siteUrl + pathFor("de", pk) },
    ],
  };
}
