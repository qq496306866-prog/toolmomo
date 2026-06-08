"use client";

import { useEffect } from "react";

const recentKey = "toolmomo.recentTools";

type ToolVisitTrackerProps = {
  title: string;
  category: string;
  description: string;
};

type RecentTool = {
  href: string;
  title: string;
  category: string;
  description: string;
  visitedAt: number;
};

export function ToolVisitTracker({ title, category, description }: ToolVisitTrackerProps) {
  useEffect(() => {
    if (!window.location.pathname.startsWith("/tools/")) {
      return;
    }

    try {
      const current: RecentTool = {
        href: window.location.pathname,
        title,
        category,
        description,
        visitedAt: Date.now(),
      };
      const stored = window.localStorage.getItem(recentKey);
      const recentTools = stored ? (JSON.parse(stored) as RecentTool[]) : [];
      const nextTools = [current, ...recentTools.filter((item) => item.href !== current.href)].slice(0, 12);

      window.localStorage.setItem(recentKey, JSON.stringify(nextTools));
    } catch {
      // localStorage may be unavailable in some privacy modes.
    }
  }, [category, description, title]);

  return null;
}
