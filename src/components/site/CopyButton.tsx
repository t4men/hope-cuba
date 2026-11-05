import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useT } from "@/i18n";

export function CopyButton({ value }: { value: string }) {
  const t = useT();
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  return <span className="inline-flex flex-col gap-1">
    <Button variant="outline" size="icon" aria-label={state === "copied" ? t.share.copied : t.share.copy} title={t.share.copy} onClick={async () => {
      try { await navigator.clipboard.writeText(value); setState("copied"); setTimeout(() => setState("idle"), 2500); }
      catch { setState("error"); }
    }}>{state === "copied" ? <Check /> : <Copy />}</Button>
    <span role="status" className="text-xs">{state === "error" ? t.share.error : state === "copied" ? t.share.copied : ""}</span>
  </span>;
}