export type ToolCategory =
  | "AI写作工具"
  | "AI提示词工具"
  | "图片工具"
  | "PDF工具"
  | "SEO工具"
  | "电商工具"
  | "社交媒体工具"
  | "开发工具"
  | "站长工具";

export type ToolItem = {
  name: string;
  description: string;
  category: ToolCategory;
  href: string;
  icon: string;
  keywords?: string[];
  isPopular?: boolean;
  isLatest?: boolean;
};

export type NavItem = {
  label: string;
  href: string;
};

export type ScenarioPack = {
  title: string;
  description: string;
  href: string;
  tools: string[];
};

export const siteCopy = {
  title: "TOOLMOMO｜免费在线工具箱与AI工具测评推荐平台",
  heroTitle: "免费在线工具箱与AI工具测评推荐平台",
  heroDescription:
    "提供AI写作、AI提示词、图片处理、PDF处理、SEO、电商、社交媒体和开发者常用工具，帮助创作者、站长和小企业提升效率。",
  searchPlaceholder: "搜索工具、AI工具、教程",
};

export const navItems: NavItem[] = [
  { label: "首页", href: "/" },
  { label: "免费工具", href: "/tools" },
  { label: "AI工具测评", href: "/ai-tools" },
  { label: "AI工具排行榜", href: "/best-ai-tools" },
  { label: "AI工具优惠", href: "/deals" },
  { label: "教程中心", href: "/tutorials" },
  { label: "全部工具", href: "/tools" },
];

export const categorySlugs: Record<ToolCategory, string> = {
  AI写作工具: "ai-writing-tools",
  AI提示词工具: "ai-prompt-tools",
  图片工具: "image-tools",
  PDF工具: "pdf-tools",
  SEO工具: "seo-tools",
  电商工具: "ecommerce-tools",
  社交媒体工具: "social-media-tools",
  开发工具: "developer-tools",
  站长工具: "webmaster-tools",
};

export const categoryTabs: ToolCategory[] = [
  "AI写作工具",
  "AI提示词工具",
  "图片工具",
  "PDF工具",
  "SEO工具",
  "电商工具",
  "社交媒体工具",
  "开发工具",
  "站长工具",
];

export const hotSearches = [
  "AI文案生成器",
  "AI图片提示词",
  "SEO标题生成器",
  "Meta描述生成器",
  "图片压缩",
  "图片转WebP",
  "JSON格式化",
  "社交媒体标题",
  "产品描述生成器",
  "短视频脚本",
];

export const tools: ToolItem[] = [
  {
    name: "AI文案生成器",
    description: "根据主题、受众和使用场景生成营销文案、产品介绍和社交媒体内容草稿。",
    category: "AI写作工具",
    href: "/tools/ai-copywriting",
    icon: "AI",
    keywords: ["AI写作", "营销文案", "广告文案"],
    isPopular: true,
  },
  {
    name: "AI邮件生成器",
    description: "快速生成商务邮件、跟进邮件、合作邀约和客户回复草稿。",
    category: "AI写作工具",
    href: "/tools/ai-email-writer",
    icon: "Mail",
    isLatest: true,
  },
  {
    name: "AI标题生成器",
    description: "围绕主题和关键词生成文章标题、视频标题、商品标题和广告标题候选。",
    category: "AI写作工具",
    href: "/tools/ai-title-generator",
    icon: "H1",
    isPopular: true,
  },
  {
    name: "AI段落改写工具",
    description: "重写段落表达，优化语气、清晰度和内容结构。",
    category: "AI写作工具",
    href: "/tools/paragraph-rewriter",
    icon: "改",
  },
  {
    name: "产品描述生成器",
    description: "输入产品信息、卖点和目标用户，生成适合电商和官网使用的产品描述。",
    category: "AI写作工具",
    href: "/tools/product-description-generator",
    icon: "PD",
    isPopular: true,
  },
  {
    name: "AI图片提示词生成器",
    description: "生成适用于 Midjourney、Stable Diffusion、DALL-E 等图像模型的提示词。",
    category: "AI提示词工具",
    href: "/tools/ai-image-prompt-generator",
    icon: "Prompt",
    isPopular: true,
  },
  {
    name: "AI视频提示词生成器",
    description: "生成适合 Runway、Pika、Sora 类视频模型的镜头、动作和风格提示词。",
    category: "AI提示词工具",
    href: "/tools/ai-video-prompt-generator",
    icon: "Video",
    isPopular: true,
  },
  {
    name: "AI产品图提示词生成器",
    description: "为产品摄影、广告图、场景图和详情页配图生成结构化提示词。",
    category: "AI提示词工具",
    href: "/tools/product-photo-prompt-generator",
    icon: "Photo",
  },
  {
    name: "AI广告文案提示词生成器",
    description: "为广告文案、落地页文案和短视频口播生成可复用的 AI 提示词。",
    category: "AI提示词工具",
    href: "/tools/ad-copy-prompt-generator",
    icon: "Ad",
  },
  {
    name: "AI角色设定提示词生成器",
    description: "生成角色背景、性格、视觉风格和对话口吻。",
    category: "AI提示词工具",
    href: "/tools/character-prompt-generator",
    icon: "Role",
  },
  {
    name: "SEO标题生成器",
    description: "根据关键词和搜索意图生成更适合搜索结果展示的网页标题。",
    category: "SEO工具",
    href: "/tools/seo-title-generator",
    icon: "SEO",
    isPopular: true,
  },
  {
    name: "Meta描述生成器",
    description: "生成网页 Meta Description，提升搜索结果摘要的清晰度和点击吸引力。",
    category: "SEO工具",
    href: "/tools/meta-description-generator",
    icon: "Meta",
    isPopular: true,
  },
  {
    name: "关键词扩展工具",
    description: "围绕核心关键词扩展长尾词、内容主题和搜索意图方向。",
    category: "SEO工具",
    href: "/tools/keyword-idea-generator",
    icon: "Key",
  },
  {
    name: "URL Slug生成器",
    description: "把标题转换为英文小写 URL slug，适合 SEO 友好的链接结构。",
    category: "SEO工具",
    href: "/tools/slug-generator",
    icon: "URL",
  },
  {
    name: "SERP预览工具",
    description: "预览网页标题、URL 和描述在搜索结果中的展示效果。",
    category: "SEO工具",
    href: "/tools/serp-snippet-preview",
    icon: "SERP",
  },
  {
    name: "社交媒体标题生成器",
    description: "为社交媒体帖子、短视频和内容营销生成标题方向。",
    category: "社交媒体工具",
    href: "/tools/social-media-title-generator",
    icon: "Social",
    isPopular: true,
  },
  {
    name: "社交媒体文案生成器",
    description: "生成适合社交平台发布的说明文案、互动文案和内容简介。",
    category: "社交媒体工具",
    href: "/tools/social-media-caption-generator",
    icon: "Caption",
  },
  {
    name: "短视频标题生成器",
    description: "生成适合短视频封面、信息流和内容栏目使用的标题候选。",
    category: "社交媒体工具",
    href: "/tools/short-video-title-generator",
    icon: "短",
  },
  {
    name: "短视频脚本生成器",
    description: "根据主题生成口播脚本、分镜结构和行动号召。",
    category: "社交媒体工具",
    href: "/tools/short-video-script-generator",
    icon: "脚本",
    isPopular: true,
  },
  {
    name: "标签生成器",
    description: "为社交内容、视频和文章生成主题标签与关键词标签。",
    category: "社交媒体工具",
    href: "/tools/hashtag-generator",
    icon: "#",
  },
  {
    name: "图片压缩工具",
    description: "压缩 JPG、PNG 图片体积，适合网页、产品图和内容配图使用。",
    category: "图片工具",
    href: "/tools/image-compressor",
    icon: "图",
    isPopular: true,
  },
  {
    name: "图片尺寸调整",
    description: "调整图片宽高和比例，适合网站配图、产品图片和社交媒体素材。",
    category: "图片工具",
    href: "/tools/image-resizer",
    icon: "尺寸",
    isPopular: true,
  },
  {
    name: "图片转WebP",
    description: "将常见图片格式转换为轻量 WebP，适合提升网页加载速度。",
    category: "图片工具",
    href: "/tools/image-to-webp",
    icon: "WP",
    isPopular: true,
  },
  {
    name: "电商图片尺寸工具",
    description: "整理全球通用电商和社交媒体产品图规格。",
    category: "图片工具",
    href: "/tools/ecommerce-image-size-tool",
    icon: "Shop",
  },
  {
    name: "图片转PDF",
    description: "将多张 JPG、PNG 图片合成为 PDF 文件。",
    category: "PDF工具",
    href: "/tools/image-to-pdf",
    icon: "PDF",
  },
  {
    name: "PDF压缩",
    description: "为 PDF 压缩工具预留入口，后续支持减少文件体积。",
    category: "PDF工具",
    href: "/tools/pdf-compressor",
    icon: "ZIP",
  },
  {
    name: "JSON格式化",
    description: "格式化、压缩并校验 JSON 数据，适合接口调试和开发排查。",
    category: "开发工具",
    href: "/tools/json-formatter",
    icon: "{}",
    isPopular: true,
  },
  {
    name: "字数统计",
    description: "统计文本字数、字符数、段落数和阅读时长。",
    category: "开发工具",
    href: "/tools/word-counter",
    icon: "字",
  },
  {
    name: "二维码生成器",
    description: "为链接、文本和联系方式生成二维码。",
    category: "开发工具",
    href: "/tools/qr-code-generator",
    icon: "QR",
  },
  {
    name: "Base64编码解码",
    description: "文本与 Base64 互相转换，适合接口、配置和调试场景。",
    category: "开发工具",
    href: "/tools/base64",
    icon: "64",
  },
  {
    name: "随机密码生成器",
    description: "生成安全密码、PIN 码和可复制的随机字符。",
    category: "开发工具",
    href: "/tools/password-generator",
    icon: "密",
  },
  {
    name: "UUID生成器",
    description: "批量生成 UUID v4，适合开发测试、数据标识和系统集成。",
    category: "开发工具",
    href: "/tools/uuid-generator",
    icon: "ID",
  },
  {
    name: "商品标题优化工具",
    description: "整理商品卖点、关键词和标题结构，适合跨平台电商运营。",
    category: "电商工具",
    href: "/tools/product-title",
    icon: "品",
  },
  {
    name: "产品图片文案生成器",
    description: "为产品图片、广告图和详情页模块生成简洁卖点文案。",
    category: "电商工具",
    href: "/tools/product-image-copy-generator",
    icon: "卖点",
  },
  {
    name: "Meta标签生成器",
    description: "生成网页标题、描述和社交分享标签，适合站长和内容网站使用。",
    category: "站长工具",
    href: "/tools/meta-generator",
    icon: "M",
  },
  {
    name: "HTTP状态码查询",
    description: "快速查看常见 HTTP 状态码含义，适合开发和站点排查。",
    category: "站长工具",
    href: "/tools/http-status",
    icon: "HTTP",
  },
];

export const scenarioPacks: ScenarioPack[] = [
  {
    title: "内容创作者工具包",
    description: "覆盖选题、标题、脚本、标签和图片提示词，适合持续生产内容。",
    href: "/scenarios/content-creator-tools",
    tools: ["AI文案生成器", "社交媒体标题生成器", "短视频脚本生成器", "标签生成器"],
  },
  {
    title: "电商运营工具包",
    description: "从商品标题、产品描述到图片尺寸和产品图提示词，帮助整理上架素材。",
    href: "/scenarios/ecommerce-operations-tools",
    tools: ["产品描述生成器", "商品标题优化工具", "电商图片尺寸工具", "AI产品图提示词生成器"],
  },
  {
    title: "SEO站长工具包",
    description: "围绕标题、描述、关键词和 SERP 展示优化网站基础内容。",
    href: "/scenarios/seo-webmaster-tools",
    tools: ["SEO标题生成器", "Meta描述生成器", "关键词扩展工具", "SERP预览工具"],
  },
  {
    title: "AI图片创作工具包",
    description: "面向 AI 图片创作，提供提示词、产品图场景和图片格式处理入口。",
    href: "/scenarios/ai-image-creation-tools",
    tools: ["AI图片提示词生成器", "AI产品图提示词生成器", "图片压缩工具", "图片转WebP"],
  },
  {
    title: "短视频创作工具包",
    description: "快速准备视频选题、标题、脚本和视频生成提示词。",
    href: "/scenarios/short-video-creation-tools",
    tools: ["短视频标题生成器", "短视频脚本生成器", "AI视频提示词生成器", "标签生成器"],
  },
  {
    title: "开发者工具包",
    description: "集合 JSON、Base64、UUID、密码和其他常用开发调试工具。",
    href: "/scenarios/developer-tools",
    tools: ["JSON格式化", "Base64编码解码", "UUID生成器", "随机密码生成器"],
  },
];

const popularOrder = [
  "/tools/ai-copywriting",
  "/tools/ai-image-prompt-generator",
  "/tools/ai-video-prompt-generator",
  "/tools/social-media-title-generator",
  "/tools/product-description-generator",
  "/tools/seo-title-generator",
  "/tools/meta-description-generator",
  "/tools/image-compressor",
  "/tools/image-to-webp",
  "/tools/json-formatter",
];

export const popularTools = popularOrder
  .map((href) => tools.find((tool) => tool.href === href))
  .filter((tool): tool is ToolItem => Boolean(tool));

export const latestTools = tools
  .filter((tool) => tool.isLatest)
  .slice(-6)
  .reverse();

export const toolsByCategory = categoryTabs.reduce<Record<ToolCategory, ToolItem[]>>(
  (groups, category) => {
    groups[category] = tools.filter((tool) => tool.category === category).slice(0, 12);
    return groups;
  },
  {} as Record<ToolCategory, ToolItem[]>,
);

export function getCategoryHref(category: ToolCategory) {
  return `/category/${categorySlugs[category]}`;
}

export function getCategoryBySlug(slug: string) {
  return categoryTabs.find((category) => categorySlugs[category] === slug);
}
