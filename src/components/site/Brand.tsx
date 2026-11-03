import { organizationStatus } from "@/app/organization-status";
import { logos } from "@/content/media";
import { useLang, useT } from "@/i18n";
import { cn } from "@/lib/utils";

/**
 * Before registration a text wordmark without "e.V." is shown publicly.
 * The original logo files (unchanged) switch on automatically once isRegistered = true.
 */
export function Brand({ inverted = false, size = "md" }: { inverted?: boolean; size?: "md" | "lg" }) {
  const t = useT();
  const lang = useLang();
  if (organizationStatus.isRegistered) {
    return (
      <img
        src={size === "lg" ? logos[lang] : logos.core}
        alt={organizationStatus.registeredName}
        className={cn("object-contain", size === "lg" ? "h-32 w-32" : "h-12 w-12")}
      />
    );
  }
  return (
    <span className="flex flex-col leading-none">
      <span className={cn("font-extrabold tracking-tight", size === "lg" ? "text-4xl" : "text-xl")}>
        <span className={inverted ? "text-primary-foreground" : "text-primary"}>HOPE</span>{" "}
        <span className="text-secondary">CUBA</span>
      </span>
      <span className={cn("mt-1 text-[0.65rem] font-semibold uppercase tracking-widest", inverted ? "text-primary-foreground/70" : "text-muted-foreground")}>
        {t.initiative}
      </span>
    </span>
  );
}
