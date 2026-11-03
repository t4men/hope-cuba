import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { isLang } from "@/app/routes-map";
import { buildHead } from "@/app/seo";

export const Route = createFileRoute("/")({
  head: () => buildHead("de", "home"),
  component: LocaleRedirect,
});

function LocaleRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    let lang = "de";
    try {
      const saved = localStorage.getItem("hc-lang") ?? undefined;
      const browser = navigator.language.slice(0, 2);
      lang = isLang(saved) ? saved : isLang(browser) ? browser : "de";
    } catch { /* ignore */ }
    navigate({ to: "/$lang", params: { lang }, replace: true });
  }, [navigate]);
  return <div className="min-h-screen bg-background" />;
}
