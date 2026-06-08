"use client";

import type { ToolItem } from "@/data/tools";
import { isToolReady } from "@/data/readyTools";
import { ToolFavoriteButton } from "@/components/tools/ToolFavoriteButton";

type ToolCardProps = {
  tool: ToolItem;
  compact?: boolean;
};

export function ToolCard({ tool, compact = false }: ToolCardProps) {
  const ready = isToolReady(tool.href);

  return (
    <a
      className="group flex h-full flex-col rounded-md border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-accent-200 hover:shadow-soft"
      href={tool.href}
    >
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-primary-50 text-sm font-bold text-primary-700">
          {tool.icon}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-bold text-slate-950 group-hover:text-accent-700">
            {tool.name}
          </h3>
          <span className="mt-1 inline-flex rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500">
            {tool.category}
          </span>
        </div>
        <ToolFavoriteButton tool={tool} />
      </div>
      <span
        className={
          ready
            ? "mt-3 w-fit rounded-md bg-accent-50 px-2 py-1 text-xs font-semibold text-accent-700"
            : "mt-3 w-fit rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-500"
        }
      >
        {ready ? "已上线" : "即将上线"}
      </span>
      {!compact ? (
        <p className="mt-3 h-12 overflow-hidden text-sm leading-6 text-slate-500">{tool.description}</p>
      ) : null}
    </a>
  );
}
