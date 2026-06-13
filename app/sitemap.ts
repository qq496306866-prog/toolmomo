import type { MetadataRoute } from "next";
import { pdfTools } from "@/data/pdfTools";
const siteUrl = "https://toolmomo.com";
export default function sitemap(): MetadataRoute.Sitemap { const now = new Date(); return ["/", "/tools", "/contact", "/privacy", "/disclaimer", ...pdfTools.map((tool) => `/tools/${tool.slug}`)].map((path) => ({ url: `${siteUrl}${path}`, lastModified: now, changeFrequency: path === "/" ? "daily" : "weekly", priority: path === "/" ? 1 : path === "/tools" ? 0.9 : path.startsWith("/tools/") ? 0.8 : 0.5 })); }
