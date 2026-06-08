"use client";

import { useEffect, useState, type MouseEvent } from "react";
import type { ToolItem } from "@/data/tools";

const favoritesKey = "toolmomo.favoriteTools";

type ToolFavoriteButtonProps = {
  tool: ToolItem;
};

function readFavorites() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const value = window.localStorage.getItem(favoritesKey);
    return value ? (JSON.parse(value) as string[]) : [];
  } catch {
    return [];
  }
}

function writeFavorites(values: string[]) {
  window.localStorage.setItem(favoritesKey, JSON.stringify(values));
  window.dispatchEvent(new CustomEvent("toolmomo:favorites-changed"));
}

export function ToolFavoriteButton({ tool }: ToolFavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(readFavorites().includes(tool.href));

    const handleChange = () => {
      setIsFavorite(readFavorites().includes(tool.href));
    };

    window.addEventListener("toolmomo:favorites-changed", handleChange);
    return () => window.removeEventListener("toolmomo:favorites-changed", handleChange);
  }, [tool.href]);

  const toggleFavorite = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const favorites = readFavorites();
    const nextFavorites = favorites.includes(tool.href)
      ? favorites.filter((href) => href !== tool.href)
      : [tool.href, ...favorites].slice(0, 60);

    writeFavorites(nextFavorites);
    setIsFavorite(nextFavorites.includes(tool.href));
  };

  return (
    <button
      aria-label={isFavorite ? `取消收藏${tool.name}` : `收藏${tool.name}`}
      className={
        isFavorite
          ? "grid h-8 w-8 shrink-0 place-items-center rounded-md bg-amber-50 text-base font-bold text-amber-600 hover:bg-amber-100"
          : "grid h-8 w-8 shrink-0 place-items-center rounded-md bg-slate-100 text-base font-bold text-slate-400 hover:bg-accent-50 hover:text-accent-600"
      }
      onClick={toggleFavorite}
      title={isFavorite ? "取消收藏" : "收藏工具"}
      type="button"
    >
      {isFavorite ? "★" : "☆"}
    </button>
  );
}
