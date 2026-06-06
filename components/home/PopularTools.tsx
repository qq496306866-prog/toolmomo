import { popularTools } from "@/data/tools";
import { SectionHeader } from "./SectionHeader";
import { ToolCard } from "./ToolCard";

export function PopularTools() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <SectionHeader
        eyebrow="Popular"
        title="热门工具"
        description="精选站内高频工具入口，适合图片处理、内容创作、电商运营和开发调试。"
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {popularTools.map((tool) => (
          <ToolCard key={tool.name} tool={tool} />
        ))}
      </div>
    </section>
  );
}
