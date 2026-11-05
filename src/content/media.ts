import hero from "@/assets/holguin-hero.jpg.asset.json";
import logoCore from "@/assets/logo-core.png.asset.json";
import logoDe from "@/assets/logo-de.png.asset.json";
import logoEn from "@/assets/logo-en.png.asset.json";
import logoEs from "@/assets/logo-es.png.asset.json";
import missionDe from "@/assets/mission-de.png.asset.json";
import missionEn from "@/assets/mission-en.png.asset.json";
import donateHero from "@/assets/donate-hero.png.asset.json";
import initiator from "@/assets/christof-kluska-holguin.png.asset.json";
import reliefDe from "@/assets/relief-food-de.png.asset.json";
import reliefEn from "@/assets/relief-food-en.jpg.asset.json";
import reliefEs from "@/assets/relief-food-es.png.asset.json";
import missionEs from "@/assets/mission-es.png.asset.json";
import missionEsCompact from "@/assets/mission-es-compact.png.asset.json";
import emergencyDe from "@/assets/emergency-facts-de.jpg.asset.json";
import criticalDe from "@/assets/critical-situation-de.jpg.asset.json";
import criticalEn from "@/assets/critical-situation-en.jpg.asset.json";
import criticalEs from "@/assets/critical-situation-es.jpg.asset.json";
import surviveDe from "@/assets/how-to-survive-de.jpg.asset.json";
import surviveEn from "@/assets/how-to-survive-en.jpg.asset.json";
import surviveEs from "@/assets/how-to-survive-es.jpg.asset.json";
import darknessDe from "@/assets/survive-darkness-de.png.asset.json";
import type { Lang } from "@/app/routes-map";

export const heroImage = hero.url;
export const donationHeroImage = donateHero.url;
export const initiatorImage = initiator.url;
export const reliefImages: Record<Lang, string> = { de: reliefDe.url, en: reliefEn.url, es: reliefEs.url };
export const logos = { core: logoCore.url, de: logoDe.url, en: logoEn.url, es: logoEs.url } satisfies Record<"core" | Lang, string>;

/** Original language-specific mission posters. */
export const missionGraphic: Record<Lang, { full: string; compact?: string } | null> = {
  de: { full: missionDe.url },
  en: { full: missionEn.url },
  es: { full: missionEs.url, compact: missionEsCompact.url },
};

export const situationMedia: Record<string, string> = {
  emergencyDe: emergencyDe.url,
  criticalDe: criticalDe.url,
  criticalEn: criticalEn.url,
  criticalEs: criticalEs.url,
  surviveDe: surviveDe.url,
  surviveEn: surviveEn.url,
  surviveEs: surviveEs.url,
  darknessDe: darknessDe.url,
};
