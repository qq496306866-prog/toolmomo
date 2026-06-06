import type { MetadataRoute } from "next";
import { readyToolPaths } from "@/data/readyTools";
import { categoryTabs, scenarioPacks } from "@/data/tools";

const siteUrl = "https://toolmomo.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = ["/", "/tools", "/about", "/contact", "/privacy", "/disclaimer"];
  const categoryPaths = categoryTabs.map((category) => `/category/${encodeURIComponent(category)}`);
  const scenarioPaths = scenarioPacks.map((pack) => `/scenarios/${encodeURIComponent(pack.title)}`);

  return [...staticPaths, ...categoryPaths, ...scenarioPaths, ...readyToolPaths].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : path === "/tools" ? 0.9 : path.startsWith("/tools/") ? 0.75 : 0.7,
  }));
}
