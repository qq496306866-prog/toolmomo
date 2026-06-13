import type { MetadataRoute } from "next";
import { allContentPages } from "@/data/content";
import { englishTools } from "@/data/toolsEn";
import { categoryTabs, scenarioPacks, tools, getCategoryHref } from "@/data/tools";

const siteUrl = "https://toolmomo.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = [
    "/",
    "/tools",
    "/ai-tools",
    "/best-ai-tools",
    "/deals",
    "/tutorials",
    "/about",
    "/contact",
    "/privacy",
    "/disclaimer",
    "/affiliate-disclosure",
  ];
  const englishPaths = ["/en", "/en/tools", ...englishTools.map((tool) => tool.href)];
  const categoryPaths = categoryTabs.map((category) => getCategoryHref(category));
  const scenarioPaths = scenarioPacks.map((pack) => pack.href);
  const toolPaths = tools.map((tool) => tool.href);
  const contentPaths = allContentPages.map((item) => item.href);

  return [...staticPaths, ...englishPaths, ...categoryPaths, ...scenarioPaths, ...toolPaths, ...contentPaths].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : path === "/tools" ? 0.9 : path.startsWith("/tools/") ? 0.75 : 0.7,
  }));
}
