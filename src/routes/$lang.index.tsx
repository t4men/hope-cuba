import { createFileRoute } from "@tanstack/react-router";
import { isLang } from "@/app/routes-map";
import { buildHead } from "@/app/seo";
import { HomePage } from "@/components/pages/Home";

export const Route = createFileRoute("/$lang/")({
  head: ({ params }) => buildHead(isLang(params.lang) ? params.lang : "de", "home"),
  component: HomePage,
});
