import { scenarioPacks } from "@/data/tools";
import { SectionHeader } from "./SectionHeader";

export function ScenarioSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <SectionHeader title="使用场景推荐" description="把常一起使用的工具组合成工作包，减少来回查找。" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {scenarioPacks.map((pack) => (
            <a
              className="rounded-md border border-slate-200 bg-white p-4 shadow-sm hover:border-accent-200 hover:shadow-soft"
              href={pack.href}
              key={pack.title}
            >
              <h3 className="text-base font-bold text-slate-950">{pack.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{pack.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {pack.tools.map((tool) => (
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500" key={tool}>
                    {tool}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
