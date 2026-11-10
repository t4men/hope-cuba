import { Outlet, createFileRoute, notFound } from "@tanstack/react-router";
import { isLang } from "@/app/routes-map";
import { LangContext, getDict } from "@/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { AssistantWidget } from "@/components/assistant/AssistantWidget";

export const Route = createFileRoute("/$lang")({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang)) throw notFound();
  },
  component: LangLayout,
});

function LangLayout() {
  const { lang } = Route.useParams();
  const l = isLang(lang) ? lang : "de";
  return (
    <LangContext.Provider value={l}>
      <div lang={l} className="flex min-h-screen flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">
          {getDict(l).skip}
        </a>
        <Header />
        <main id="main" className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <AssistantWidget />
      </div>
    </LangContext.Provider>
  );
}
