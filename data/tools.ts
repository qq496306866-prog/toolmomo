export type ToolCategory =
  | "AI工具"
  | "图片工具"
  | "PDF工具"
  | "文本工具"
  | "电商工具"
  | "短视频工具"
  | "开发工具"
  | "站长工具"
  | "生活工具";

export type ToolItem = {
  name: string;
  description: string;
  category: ToolCategory;
  href: string;
  icon: string;
  isPopular?: boolean;
  isLatest?: boolean;
};

export type ScenarioPack = {
  title: string;
  description: string;
  tools: string[];
};

export const navItems = [
  "首页",
  "AI工具",
  "图片工具",
  "文本工具",
  "电商工具",
  "短视频工具",
  "开发工具",
  "全部工具",
];

export const categoryTabs: ToolCategory[] = [
  "AI工具",
  "图片工具",
  "PDF工具",
  "文本工具",
  "电商工具",
  "短视频工具",
  "开发工具",
  "站长工具",
  "生活工具",
];

export const hotSearches = [
  "图片压缩",
  "字数统计",
  "小红书标题",
  "淘宝主图",
  "JSON格式化",
  "Base64",
];

export const tools: ToolItem[] = [
  {
    name: "AI文案生成",
    description: "快速生成营销文案、标题和短内容草稿。",
    category: "AI工具",
    href: "/tools/ai-copywriting",
    icon: "AI",
    isPopular: true,
  },
  {
    name: "AI标题助手",
    description: "生成小红书、短视频和电商标题灵感。",
    category: "AI工具",
    href: "/tools/ai-title",
    icon: "标",
    isLatest: true,
  },
  {
    name: "AI关键词扩展",
    description: "围绕主题扩展搜索词、卖点词和长尾词。",
    category: "AI工具",
    href: "/tools/ai-keywords",
    icon: "词",
  },
  {
    name: "图片压缩",
    description: "压缩 JPG、PNG 图片体积，适合网页和电商素材。",
    category: "图片工具",
    href: "/tools/image-compress",
    icon: "图",
    isPopular: true,
  },
  {
    name: "图片尺寸调整",
    description: "批量修改图片宽高，适配平台常用规格。",
    category: "图片工具",
    href: "/tools/image-resize",
    icon: "尺",
    isPopular: true,
  },
  {
    name: "图片转WebP",
    description: "将常见图片格式转换为轻量 WebP。",
    category: "图片工具",
    href: "/tools/image-webp",
    icon: "WP",
    isLatest: true,
  },
  {
    name: "证件照换底色",
    description: "快速预处理证件照背景颜色。",
    category: "图片工具",
    href: "/tools/id-photo-bg",
    icon: "照",
  },
  {
    name: "PDF合并",
    description: "将多个 PDF 文件合并为一个文档。",
    category: "PDF工具",
    href: "/tools/pdf-merge",
    icon: "PDF",
    isLatest: true,
  },
  {
    name: "PDF转图片",
    description: "把 PDF 页面导出为清晰图片。",
    category: "PDF工具",
    href: "/tools/pdf-to-image",
    icon: "转",
  },
  {
    name: "字数统计",
    description: "统计字数、字符数、段落和阅读时长。",
    category: "文本工具",
    href: "/tools/word-count",
    icon: "字",
    isPopular: true,
  },
  {
    name: "文本去重",
    description: "去除重复行，整理名单、关键词和素材文本。",
    category: "文本工具",
    href: "/tools/text-deduplicate",
    icon: "重",
  },
  {
    name: "Markdown预览",
    description: "实时查看 Markdown 排版效果。",
    category: "文本工具",
    href: "/tools/markdown-preview",
    icon: "MD",
    isLatest: true,
  },
  {
    name: "淘宝主图尺寸",
    description: "查询并裁剪淘宝、天猫常用主图尺寸。",
    category: "电商工具",
    href: "/tools/taobao-main-image",
    icon: "淘",
    isPopular: true,
  },
  {
    name: "商品标题优化",
    description: "整理商品卖点，生成更清晰的标题结构。",
    category: "电商工具",
    href: "/tools/product-title",
    icon: "商",
    isPopular: true,
  },
  {
    name: "SKU命名助手",
    description: "规范颜色、尺码、规格等 SKU 命名。",
    category: "电商工具",
    href: "/tools/sku-helper",
    icon: "SKU",
  },
  {
    name: "小红书标题生成",
    description: "按场景生成更适合种草内容的标题。",
    category: "短视频工具",
    href: "/tools/xhs-title",
    icon: "红",
    isPopular: true,
  },
  {
    name: "短视频脚本模板",
    description: "生成口播、探店、带货等脚本框架。",
    category: "短视频工具",
    href: "/tools/video-script",
    icon: "影",
    isPopular: true,
    isLatest: true,
  },
  {
    name: "视频封面标题",
    description: "提炼封面短句，提升内容识别度。",
    category: "短视频工具",
    href: "/tools/video-cover-title",
    icon: "封",
  },
  {
    name: "JSON格式化",
    description: "格式化、压缩并校验 JSON 数据。",
    category: "开发工具",
    href: "/tools/json-format",
    icon: "{}",
    isPopular: true,
  },
  {
    name: "Base64编码解码",
    description: "文本与 Base64 互相转换。",
    category: "开发工具",
    href: "/tools/base64",
    icon: "64",
    isPopular: true,
  },
  {
    name: "URL编码解码",
    description: "处理 URL 参数编码和解码。",
    category: "开发工具",
    href: "/tools/url-encode",
    icon: "URL",
  },
  {
    name: "时间戳转换",
    description: "Unix 时间戳与日期时间互转。",
    category: "开发工具",
    href: "/tools/timestamp",
    icon: "时",
    isLatest: true,
  },
  {
    name: "网站备案查询",
    description: "整理站点基础信息和备案查询入口。",
    category: "站长工具",
    href: "/tools/icp-query",
    icon: "站",
  },
  {
    name: "Meta标签生成",
    description: "生成网页标题、描述和社交分享标签。",
    category: "站长工具",
    href: "/tools/meta-generator",
    icon: "M",
  },
  {
    name: "HTTP状态码查询",
    description: "快速查看常见 HTTP 状态码含义。",
    category: "站长工具",
    href: "/tools/http-status",
    icon: "HTTP",
  },
  {
    name: "BMI计算器",
    description: "输入身高体重，估算 BMI 指标。",
    category: "生活工具",
    href: "/tools/bmi",
    icon: "BMI",
  },
];

export const scenarioPacks: ScenarioPack[] = [
  {
    title: "电商卖家工具包",
    description: "从商品图、标题到 SKU 命名，覆盖上架前的高频整理工作。",
    tools: ["淘宝主图尺寸", "商品标题优化", "SKU命名助手", "图片压缩"],
  },
  {
    title: "自媒体工具包",
    description: "适合选题、标题、脚本、封面文案等内容创作流程。",
    tools: ["小红书标题生成", "短视频脚本模板", "视频封面标题", "字数统计"],
  },
  {
    title: "程序员工具包",
    description: "处理接口数据、编码转换、时间调试和网页元信息。",
    tools: ["JSON格式化", "Base64编码解码", "URL编码解码", "时间戳转换"],
  },
  {
    title: "图片处理工具包",
    description: "面向日常图片压缩、改尺寸、格式转换和证件照预处理。",
    tools: ["图片压缩", "图片尺寸调整", "图片转WebP", "证件照换底色"],
  },
];

export const popularTools = tools.filter((tool) => tool.isPopular).slice(0, 12);
export const latestTools = tools.filter((tool) => tool.isLatest).slice(0, 6);

export const toolsByCategory = categoryTabs.reduce<Record<ToolCategory, ToolItem[]>>(
  (groups, category) => {
    groups[category] = tools.filter((tool) => tool.category === category).slice(0, 10);
    return groups;
  },
  {} as Record<ToolCategory, ToolItem[]>,
);
