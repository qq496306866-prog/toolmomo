import type { MetadataRoute } from "next";
import { pdfTools } from "@/data/pdfTools";
import { imageTools } from "@/data/imageTools";
import { fileTools } from "@/data/fileTools";
import { writeTools } from "@/data/writeTools";
import { isFileIndexed, isImageIndexed, isPdfIndexed } from "@/lib/toolIndexing";
const siteUrl = "https://toolmomo.com";
export default function sitemap(): MetadataRoute.Sitemap { const now = new Date(); return ["/", "/tools", "/tools/pdf", "/tools/image", "/tools/write", "/tools/video", "/tools/file", "/contact", "/privacy", "/disclaimer", ...pdfTools.filter(isPdfIndexed).map((tool) => `/tools/${tool.slug}`), ...imageTools.filter(isImageIndexed).map((tool) => `/tools/image/${tool.slug}`), ...writeTools.map((tool) => `/tools/write/${tool.slug}`), ...fileTools.filter(isFileIndexed).map((tool) => `/tools/file/${tool.slug}`)].map((path) => ({ url: `${siteUrl}${path}`, lastModified: now, changeFrequency: path === "/" ? "daily" : "weekly", priority: path === "/" ? 1 : path === "/tools" ? 0.9 : path.startsWith("/tools/") ? 0.8 : 0.5 })); }
