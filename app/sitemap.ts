import type { MetadataRoute } from "next";
import { pdfTools } from "@/data/pdfTools";
import { imageTools } from "@/data/imageTools";
import { fileTools } from "@/data/fileTools";
import { videoTools } from "@/data/videoTools";
import { writeTools } from "@/data/writeTools";
const siteUrl = "https://toolmomo.com";
export default function sitemap(): MetadataRoute.Sitemap { const now = new Date(); return ["/", "/tools", "/tools/image", "/tools/write", "/tools/video", "/tools/file", "/contact", "/privacy", "/disclaimer", ...pdfTools.map((tool) => `/tools/${tool.slug}`), ...imageTools.map((tool) => `/tools/image/${tool.slug}`), ...writeTools.map((tool) => `/tools/write/${tool.slug}`), ...videoTools.map((tool) => `/tools/video/${tool.slug}`), ...fileTools.map((tool) => `/tools/file/${tool.slug}`)].map((path) => ({ url: `${siteUrl}${path}`, lastModified: now, changeFrequency: path === "/" ? "daily" : "weekly", priority: path === "/" ? 1 : path === "/tools" ? 0.9 : path.startsWith("/tools/") ? 0.8 : 0.5 })); }
