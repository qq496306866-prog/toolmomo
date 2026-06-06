import type { MetadataRoute } from "next";
import { readyToolPaths } from "@/data/readyTools";

const siteUrl = "https://toolmomo.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = ["/", "/tools", "/about", "/contact", "/privacy", "/disclaimer"];

  return [...staticPaths, ...readyToolPaths].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : path === "/tools" ? 0.9 : 0.7,
  }));
}
