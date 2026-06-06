import { latestTools } from "@/data/tools";
import { SectionHeader } from "./SectionHeader";
import { ToolCard } from "./ToolCard";

export function LatestTools() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <SectionHeader title="最新上线工具" description="持续补充中文场景下更常用、更直接的在线工具。" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {latestTools.map((tool) => (
          <ToolCard compact key={tool.name} tool={tool} />
        ))}
      </div>
    </section>
  );
}
