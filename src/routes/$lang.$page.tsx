import { Outlet, createFileRoute, useMatches } from "@tanstack/react-router";
import { isLang, pageKeyFromSlug, type PageKey } from "@/app/routes-map";
import { buildHead } from "@/app/seo";
import { MissionPage } from "@/components/pages/Mission";
import { ProjectsPage } from "@/components/pages/Projects";
import {
  AboutPage, ContactPage, DonatePage, FaqPage, InvolvedPage, LegalPage, NotFoundPage, PrivacyPage, StatutesPage, TransparencyPage,
} from "@/components/pages/Other";

const pages: Record<PageKey, () => React.JSX.Element> = {
  mission: MissionPage,
  projects: ProjectsPage,
  donate: DonatePage,
  involved: InvolvedPage,
  about: AboutPage,
  transparency: TransparencyPage,
  statutes: StatutesPage,
  faq: FaqPage,
  contact: ContactPage,
  legal: LegalPage,
  privacy: PrivacyPage,
};

export const Route = createFileRoute("/$lang/$page")({
  head: ({ params }) => {
    const lang = isLang(params.lang) ? params.lang : "de";
    return buildHead(lang, pageKeyFromSlug(lang, params.page) ?? "notFound");
  },
  component: PageSwitch,
});

function PageSwitch() {
  const { lang, page } = Route.useParams();
  const hasChild = useMatches({ select: (m) => m.some((x) => x.routeId === "/$lang/$page/$sub") });
  if (hasChild) return <Outlet />;
  const key = isLang(lang) ? pageKeyFromSlug(lang, page) : undefined;
  const C = key ? pages[key] : NotFoundPage;
  return <C />;
}
