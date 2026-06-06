import type { Metadata } from "next";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { ToolCard } from "@/components/home/ToolCard";
import { TopBar } from "@/components/home/TopBar";
import { scenarioPacks, tools } from "@/data/tools";
import { notFound } from "next/navigation";

type ScenarioPageProps = {
  params: Promise<{
    name: string;
  }>;
};

function decodeParam(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function getScenario(name: string) {
  return scenarioPacks.find((pack) => pack.title === name);
}

export function generateStaticParams() {
  return scenarioPacks.map((pack) => ({
    name: encodeURIComponent(pack.title),
  }));
}

export async function generateMetadata({ params }: ScenarioPageProps): Promise<Metadata> {
  const { name } = await params;
  const scenarioName = decodeParam(name);
  const scenario = getScenario(scenarioName);

  if (!scenario) {
    return {
      title: "场景不存在 - Toolmomo",
      description: "这个使用场景不存在，可以返回 Toolmomo 全部工具页继续浏览。",
    };
  }

  return {
    title: `${scenario?.title ?? scenarioName} - Toolmomo`,
    description: scenario?.description ?? "Toolmomo 使用场景工具包，按常见工作流组合推荐在线工具。",
  };
}

export default async function ScenarioPage({ params }: ScenarioPageProps) {
  const { name } = await params;
  const scenarioName = decodeParam(name);
  const scenario = getScenario(scenarioName);

  if (!scenario) {
    notFound();
  }

  const scenarioTools = scenario ? tools.filter((tool) => scenario.tools.includes(tool.name)) : [];

  return (
    <main className="min-h-screen bg-slate-50">
      <TopBar />
      <Header />
      <section className="border-b border-slate-200 bg-gradient-to-b from-white via-primary-50 to-slate-50">
        <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="text-sm text-slate-500">
            <a className="hover:text-accent-600" href="/">
              首页
            </a>
            <span className="mx-2">/</span>
            <span>使用场景</span>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-slate-950 sm:text-3xl">{scenario?.title ?? scenarioName}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
            {scenario?.description ?? "这个场景工具包暂时没有匹配内容，可以先浏览全部工具。"}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
        {scenarioTools.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {scenarioTools.map((tool) => (
              <ToolCard key={tool.href} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="rounded-md border border-slate-200 bg-white p-6 text-sm leading-6 text-slate-600 shadow-sm">
            <p>没有找到这个场景包。</p>
            <a className="mt-4 inline-flex rounded-md bg-accent-500 px-4 py-2 font-semibold text-white hover:bg-accent-600" href="/tools">
              查看全部工具
            </a>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {scenarioPacks.map((pack) => (
            <a
              className={
                pack.title === scenarioName
                  ? "rounded-md border border-primary-300 bg-primary-50 p-4 shadow-sm"
                  : "rounded-md border border-slate-200 bg-white p-4 shadow-sm hover:border-accent-200 hover:shadow-soft"
              }
              href={`/scenarios/${encodeURIComponent(pack.title)}`}
              key={pack.title}
            >
              <h2 className="text-base font-bold text-slate-950">{pack.title}</h2>
              <p className="mt-2 h-12 overflow-hidden text-sm leading-6 text-slate-500">{pack.description}</p>
            </a>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
