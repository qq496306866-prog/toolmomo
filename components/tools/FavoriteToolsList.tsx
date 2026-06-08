"use client";

import { useEffect, useMemo, useState } from "react";
import { ToolCard } from "@/components/home/ToolCard";
import type { ToolItem } from "@/data/tools";

const favoritesKey = "toolmomo.favoriteTools";
const recentKey = "toolmomo.recentTools";

type FavoriteToolsListProps = {
  tools: ToolItem[];
};

type RecentTool = {
  href: string;
  title: string;
  category: string;
  description: string;
  visitedAt: number;
};

function readStringList(key: string) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as string[]) : [];
  } catch {
    return [];
  }
}

function readRecentTools() {
  try {
    const value = window.localStorage.getItem(recentKey);
    return value ? (JSON.parse(value) as RecentTool[]) : [];
  } catch {
    return [];
  }
}

export function FavoriteToolsList({ tools }: FavoriteToolsListProps) {
  const [favoriteHrefs, setFavoriteHrefs] = useState<string[]>([]);
  const [recentTools, setRecentTools] = useState<RecentTool[]>([]);

  useEffect(() => {
    const refresh = () => {
      setFavoriteHrefs(readStringList(favoritesKey));
      setRecentTools(readRecentTools());
    };

    refresh();
    window.addEventListener("toolmomo:favorites-changed", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("toolmomo:favorites-changed", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const favoriteTools = useMemo(() => {
    return favoriteHrefs
      .map((href) => tools.find((tool) => tool.href === href))
      .filter((tool): tool is ToolItem => Boolean(tool));
  }, [favoriteHrefs, tools]);

  return (
    <div className="space-y-6">
      <section>
        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-950">我的收藏</h2>
            <p className="mt-1 text-sm text-slate-500">点击工具卡片右上角星标即可加入这里。</p>
          </div>
          <span className="text-sm font-semibold text-accent-700">{favoriteTools.length} 个工具</span>
        </div>

        {favoriteTools.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {favoriteTools.map((tool) => (
              <ToolCard key={tool.href} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="rounded-md border border-slate-200 bg-white p-6 text-sm leading-6 text-slate-600 shadow-sm">
            暂时还没有收藏工具。可以先去全部工具页，把常用工具点亮星标。
            <a className="mt-4 inline-flex rounded-md bg-accent-500 px-4 py-2 font-semibold text-white hover:bg-accent-600" href="/tools">
              浏览全部工具
            </a>
          </div>
        )}
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-950">最近使用</h2>
          <p className="mt-1 text-sm text-slate-500">打开过的工具会自动记录，方便下次继续使用。</p>
        </div>
        {recentTools.length ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {recentTools.map((tool) => (
              <a
                className="rounded-md border border-slate-200 bg-white p-4 shadow-sm hover:border-accent-200 hover:bg-accent-50"
                href={tool.href}
                key={`${tool.href}-${tool.visitedAt}`}
              >
                <div className="text-base font-bold text-slate-950">{tool.title}</div>
                <div className="mt-1 text-xs font-semibold text-slate-500">{tool.category}</div>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{tool.description}</p>
              </a>
            ))}
          </div>
        ) : (
          <div className="rounded-md border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-sm">
            最近使用记录为空。
          </div>
        )}
      </section>
    </div>
  );
}
