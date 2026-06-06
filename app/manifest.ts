import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Toolmomo 免费中文在线工具箱",
    short_name: "Toolmomo",
    description: "图片处理、文本整理、电商运营、短视频创作和开发者常用在线工具。",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#061a35",
    lang: "zh-CN",
    icons: [
      {
        src: "/icon.svg",
        sizes: "64x64",
        type: "image/svg+xml",
      },
    ],
  };
}
