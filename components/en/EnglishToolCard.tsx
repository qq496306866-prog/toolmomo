import type { EnglishToolItem } from "@/data/toolsEn";

type EnglishToolCardProps = {
  tool: EnglishToolItem;
};

export function EnglishToolCard({ tool }: EnglishToolCardProps) {
  return (
    <a
      className="group flex h-full flex-col rounded-md border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-accent-200 hover:shadow-soft"
      href={tool.href}
    >
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-primary-50 text-xs font-bold text-primary-700">
          {tool.icon}
        </span>
        <div className="min-w-0">
          <h3 className="text-base font-bold text-slate-950 group-hover:text-accent-700">{tool.name}</h3>
          <span className="mt-1 inline-flex rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500">
            {tool.category}
          </span>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-500">{tool.description}</p>
    </a>
  );
}
