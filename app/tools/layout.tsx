import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "在线工具",
  description: "Toolmomo 免费中文在线工具箱，提供图片、文本、电商、短视频、开发和站长常用工具。",
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
