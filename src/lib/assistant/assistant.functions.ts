import { createServerFn } from "@tanstack/react-start";
import { generateResponse, PaymentRequiredError, RateLimitError } from "@lovable.dev/ai-gateway";
import { dicts } from "@/i18n";
import { contactData, organizationStatus } from "@/app/organization-status";
import type { Lang } from "@/app/routes-map";

type Msg = { role: "user" | "assistant"; content: string };
type Input = { lang: Lang; messages: Msg[] };

function siteContext(lang: Lang) {
  const { assistant: _a, ...rest } = dicts[lang];
  return JSON.stringify({ site: rest, contact: contactData, status: organizationStatus });
}

export const askAssistant = createServerFn({ method: "POST" })
  .inputValidator((input: Input): Input => {
    const lang = (["de", "en", "es"] as const).includes(input?.lang) ? input.lang : "de";
    const messages = (Array.isArray(input?.messages) ? input.messages : [])
      .slice(-10)
      .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));
    if (!messages.length || messages[messages.length - 1]?.role !== "user") throw new Error("invalid");
    return { lang, messages };
  })
  .handler(async ({ data }) => {
    const langName = { de: "German", en: "English", es: "Spanish" }[data.lang];
    try {
      const res = await generateResponse({
        model: "openai/gpt-6-astra",
        instructions:
          `You are the friendly assistant of the Hope Cuba website (initiative in formation). Answer questions about the association, projects and donations ONLY based on the website content below. ` +
          `Always answer in ${langName}, briefly (max ~120 words), plain text. Never invent facts, amounts, bank details or legal status. Never use the abbreviation "CK"; write "Christof Kluska". ` +
          `If the content does not answer the question, say so and refer to the contact email and phone. Do not give legal or tax advice.\n\nWEBSITE CONTENT (JSON):\n${siteContext(data.lang)}`,
        input: data.messages.map((m) => ({ role: m.role, content: m.content })),
      });
      const r = res as unknown as { output_text?: string; output?: Array<{ content?: Array<{ type?: string; text?: string }> }> };
      const text = r.output_text ?? (r.output ?? []).flatMap((o) => o.content ?? []).filter((c) => c.type === "output_text").map((c) => c.text).join("");
      return { ok: true as const, text: text || "" };
    } catch (e) {
      console.error("assistant error", e);
      if (e instanceof RateLimitError) return { ok: false as const, error: "busy" as const };
      if (e instanceof PaymentRequiredError) return { ok: false as const, error: "unavailable" as const };
      return { ok: false as const, error: "failed" as const };
    }
  });
