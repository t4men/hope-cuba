import type { Lang } from "@/app/routes-map";

export type ProjectStatus = "planned" | "ongoing" | "completed";

/** Structured project data; status may only change to ongoing/completed with evidence. */
export type Project = {
  slug: string;
  category: "relief" | "solar" | "health" | "future";
  status: ProjectStatus;
  region: Record<Lang, string>;
  budgetDraft: number[];
  verifiedSpend: number | null;
  verifiedImpact: string | null;
  lastUpdated: string;
};

const holguin = { de: "Holguín, Kuba", en: "Holguín, Cuba", es: "Holguín, Cuba" };

export const projects: Project[] = [
  { slug: "relief", category: "relief", status: "planned", region: holguin, budgetDraft: [], verifiedSpend: null, verifiedImpact: null, lastUpdated: "2026-11-03" },
  { slug: "solar-aid-center-holguin", category: "solar", status: "planned", region: holguin, budgetDraft: [2000, 5000, 12000], verifiedSpend: null, verifiedImpact: null, lastUpdated: "2026-11-03" },
  { slug: "health-education", category: "health", status: "planned", region: holguin, budgetDraft: [], verifiedSpend: null, verifiedImpact: null, lastUpdated: "2026-11-03" },
  {
    slug: "new-opportunities",
    category: "future",
    status: "planned",
    region: { de: "Kuba & Deutschland", en: "Cuba & Germany", es: "Cuba y Alemania" },
    budgetDraft: [],
    verifiedSpend: null,
    verifiedImpact: null,
    lastUpdated: "2026-11-03",
  },
];
