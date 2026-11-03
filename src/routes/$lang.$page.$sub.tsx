import { createFileRoute } from "@tanstack/react-router";
import { isLang, pageSlugs, solarSlug } from "@/app/routes-map";
import { buildHead } from "@/app/seo";
import { SolarPage } from "@/components/pages/Projects";
import { NotFoundPage } from "@/components/pages/Other";

const valid = (lang: string, page: string, sub: string) =>
  isLang(lang) && pageSlugs.projects[lang] === page && solarSlug[lang] === sub;

export const Route = createFileRoute("/$lang/$page/$sub")({
  head: ({ params }) => buildHead(isLang(params.lang) ? params.lang : "de", valid(params.lang, params.page, params.sub) ? "solar" : "notFound"),
  component: SubPage,
});

function SubPage() {
  const { lang, page, sub } = Route.useParams();
  return valid(lang, page, sub) ? <SolarPage /> : <NotFoundPage />;
}
