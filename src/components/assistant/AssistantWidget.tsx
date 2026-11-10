import { MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { askAssistant } from "@/lib/assistant/assistant.functions";
import { useLang, useT } from "@/i18n";

type Msg = { role: "user" | "assistant"; content: string };

export function AssistantWidget() {
  const t = useT().assistant;
  const lang = useLang();
  const ask = useServerFn(askAssistant);
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => end.current?.scrollIntoView({ block: "end" }), [msgs, busy]);

  async function send(q: string) {
    const text = q.trim();
    if (!text || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content: text }];
    setMsgs(next); setInput(""); setBusy(true);
    try {
      const r = await ask({ data: { lang, messages: next } });
      setMsgs([...next, { role: "assistant", content: r.ok ? r.text || t.error : t.errors[r.error] }]);
    } catch {
      setMsgs([...next, { role: "assistant", content: t.error }]);
    } finally { setBusy(false); }
  }

  if (!open)
    return (
      <button onClick={() => setOpen(true)} aria-label={t.open}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-bold text-primary-foreground shadow-lg hover:opacity-90">
        <MessageCircle className="h-5 w-5" /> {t.button}
      </button>
    );

  return (
    <div role="dialog" aria-label={t.title}
      className="fixed inset-x-3 bottom-3 z-50 flex max-h-[80vh] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-96">
      <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
        <p className="font-extrabold">{t.title}</p>
        <button onClick={() => setOpen(false)} aria-label={t.close}><X className="h-5 w-5" /></button>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
        <p className="text-muted-foreground">{t.intro}</p>
        {msgs.length === 0 && (
          <div className="flex flex-wrap gap-2">
            {t.suggestions.map((s) => (
              <button key={s} onClick={() => send(s)} className="rounded-full border border-border px-3 py-1 text-left text-xs hover:bg-muted">{s}</button>
            ))}
          </div>
        )}
        {msgs.map((m, i) => (
          <div key={i} className={m.role === "user" ? "ml-8 rounded-xl bg-primary px-3 py-2 text-primary-foreground" : "mr-8 whitespace-pre-wrap rounded-xl bg-muted px-3 py-2 text-foreground"}>{m.content}</div>
        ))}
        {busy && <div className="mr-8 rounded-xl bg-muted px-3 py-2 text-muted-foreground">{t.thinking}</div>}
        <div ref={end} />
      </div>
      <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2 border-t border-border p-3">
        <input value={input} onChange={(e) => setInput(e.target.value)} maxLength={2000} placeholder={t.placeholder} aria-label={t.placeholder}
          className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm" />
        <button type="submit" disabled={busy || !input.trim()} aria-label={t.send} className="rounded-lg bg-secondary px-3 text-secondary-foreground disabled:opacity-50"><Send className="h-4 w-4" /></button>
      </form>
      <p className="px-3 pb-2 text-[11px] text-muted-foreground">{t.disclaimer}</p>
    </div>
  );
}
