export const LANGS = ["de", "en", "es"] as const;
export type Lang = (typeof LANGS)[number];
export const isLang = (v: string | undefined): v is Lang => !!v && (LANGS as readonly string[]).includes(v);

export type PageKey =
  | "mission"
  | "projects"
  | "donate"
  | "involved"
  | "about"
  | "transparency"
  | "statutes"
  | "faq"
  | "contact"
  | "legal"
  | "privacy";

export const pageSlugs: Record<PageKey, Record<Lang, string>> = {
  mission: { de: "mission", en: "mission", es: "mision" },
  projects: { de: "projekte", en: "projects", es: "proyectos" },
  donate: { de: "spenden", en: "donate", es: "donar" },
  involved: { de: "mitmachen", en: "get-involved", es: "participa" },
  about: { de: "ueber-uns", en: "about", es: "sobre-nosotros" },
  transparency: { de: "transparenz", en: "transparency", es: "transparencia" },
  statutes: { de: "satzung", en: "articles-of-association", es: "estatutos" },
  faq: { de: "faq", en: "faq", es: "preguntas-frecuentes" },
  contact: { de: "kontakt", en: "contact", es: "contacto" },
  legal: { de: "impressum", en: "legal-notice", es: "aviso-legal" },
  privacy: { de: "datenschutz", en: "privacy", es: "privacidad" },
};

export const solarSlug: Record<Lang, string> = {
  de: "solar-aid-center-holguin",
  en: "solar-aid-center-holguin",
  es: "centro-solar-holguin",
};

export function pageKeyFromSlug(lang: Lang, slug: string): PageKey | undefined {
  return (Object.keys(pageSlugs) as PageKey[]).find((k) => pageSlugs[k][lang] === slug);
}

export function pathFor(lang: Lang, key?: PageKey | "solar"): string {
  if (!key) return `/${lang}`;
  if (key === "solar") return `/${lang}/${pageSlugs.projects[lang]}/${solarSlug[lang]}`;
  return `/${lang}/${pageSlugs[key][lang]}`;
}

/** Translate the current pathname into the same page in another language. */
export function translatePath(pathname: string, target: Lang): string {
  const parts = pathname.split("/").filter(Boolean);
  const from = parts[0];
  if (!isLang(from)) return `/${target}`;
  if (parts.length === 1) return `/${target}`;
  const key = pageKeyFromSlug(from, parts[1] ?? "");
  if (!key) return `/${target}`;
  if (key === "projects" && parts[2] === solarSlug[from]) return pathFor(target, "solar");
  return pathFor(target, key);
}
