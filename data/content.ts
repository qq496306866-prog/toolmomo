export type ContentItem = {
  title: string;
  description: string;
  href: string;
  category: string;
};

export const aiToolReviews: ContentItem[] = [
  {
    title: "ChatGPT 使用教程与测评",
    description: "从适合人群、常见用法、优缺点和替代工具角度整理 ChatGPT 的使用建议。",
    href: "/ai-tools/chatgpt-review",
    category: "AI写作工具测评",
  },
  {
    title: "Claude AI 好用吗？",
    description: "关注长文本、写作、分析和团队协作场景，评估 Claude AI 的使用体验。",
    href: "/ai-tools/claude-review",
    category: "AI写作工具测评",
  },
  {
    title: "Gemini 和 ChatGPT 哪个好用？",
    description: "对比 Gemini 与 ChatGPT 在搜索、写作、办公和多模态场景中的差异。",
    href: "/ai-tools/chatgpt-vs-gemini",
    category: "AI写作工具测评",
  },
  {
    title: "Perplexity AI 搜索工具测评",
    description: "分析 Perplexity 在资料检索、答案溯源和研究型搜索中的优势。",
    href: "/ai-tools/perplexity-review",
    category: "AI SEO工具测评",
  },
  {
    title: "Canva AI 功能介绍",
    description: "梳理 Canva AI 在图片设计、品牌素材和内容创作中的常见用法。",
    href: "/ai-tools/canva-ai-review",
    category: "AI图片工具测评",
  },
  {
    title: "Midjourney 提示词教程",
    description: "整理 Midjourney 提示词结构、风格参数和产品图创作思路。",
    href: "/ai-tools/midjourney-prompt-guide",
    category: "AI图片工具测评",
  },
  {
    title: "Runway AI 视频生成测评",
    description: "面向短视频创作者评估 Runway 的视频生成、镜头控制和素材工作流。",
    href: "/ai-tools/runway-review",
    category: "AI视频工具测评",
  },
  {
    title: "Cursor AI 编程工具教程",
    description: "介绍 Cursor 在代码编辑、重构、问答和项目开发中的实际用法。",
    href: "/ai-tools/cursor-review",
    category: "AI编程工具测评",
  },
];

export const aiToolRankings: ContentItem[] = [
  {
    title: "最好用的AI写作工具推荐",
    description: "适合文章、邮件、广告和社交媒体内容的 AI 写作工具对比。",
    href: "/best-ai-tools/ai-writing-tools",
    category: "AI工具排行榜",
  },
  {
    title: "最好用的AI图片生成工具推荐",
    description: "对比 AI 图片生成、产品图、设计图和提示词工作流。",
    href: "/best-ai-tools/ai-image-generators",
    category: "AI工具排行榜",
  },
  {
    title: "最好用的AI视频生成工具推荐",
    description: "整理面向短视频、广告和素材制作的 AI 视频生成工具。",
    href: "/best-ai-tools/ai-video-generators",
    category: "AI工具排行榜",
  },
  {
    title: "适合内容创作者的AI工具推荐",
    description: "面向创作者的选题、写作、图片、视频和分发工具组合。",
    href: "/best-ai-tools/ai-tools-for-creators",
    category: "AI工具排行榜",
  },
  {
    title: "适合电商卖家的AI工具推荐",
    description: "覆盖产品描述、商品图、广告文案和客服场景的 AI 工具。",
    href: "/best-ai-tools/ai-tools-for-ecommerce",
    category: "AI工具排行榜",
  },
  {
    title: "适合站长的AI SEO工具推荐",
    description: "整理关键词研究、内容优化、SERP 预览和 SEO 写作工具。",
    href: "/best-ai-tools/ai-seo-tools",
    category: "AI工具排行榜",
  },
  {
    title: "适合小企业的AI工具推荐",
    description: "从营销、设计、文档和自动化角度推荐小企业可用的 AI 工具。",
    href: "/best-ai-tools/ai-tools-for-small-business",
    category: "AI工具排行榜",
  },
  {
    title: "免费AI工具推荐",
    description: "优先整理有免费额度、免费版本或低门槛试用的 AI 工具。",
    href: "/best-ai-tools/free-ai-tools",
    category: "AI工具排行榜",
  },
];

export const dealPages: ContentItem[] = [
  {
    title: "AI工具优惠码",
    description: "预留 AI 工具优惠、免费额度和限时折扣入口，后续补充真实联盟链接。",
    href: "/deals/ai-tools",
    category: "AI工具优惠",
  },
  {
    title: "SEO工具优惠",
    description: "预留 SEO 工具订阅优惠、试用入口和站长工具推荐位。",
    href: "/deals/seo-tools",
    category: "AI工具优惠",
  },
  {
    title: "创作者工具优惠",
    description: "预留图片、视频、设计和内容创作工具的优惠推荐位。",
    href: "/deals/creator-tools",
    category: "AI工具优惠",
  },
  {
    title: "电商工具优惠",
    description: "预留电商运营、产品图、广告和客服工具的优惠推荐位。",
    href: "/deals/ecommerce-tools",
    category: "AI工具优惠",
  },
];

export const tutorials: ContentItem[] = [
  {
    title: "AI提示词怎么写？",
    description: "用目标、角色、上下文、格式和约束搭建稳定的提示词结构。",
    href: "/tutorials/how-to-write-ai-prompts",
    category: "教程中心",
  },
  {
    title: "如何用AI生成产品图",
    description: "从产品信息、场景、镜头和风格描述开始生成产品图片提示词。",
    href: "/tutorials/how-to-create-product-images-with-ai",
    category: "教程中心",
  },
  {
    title: "如何用AI写SEO标题",
    description: "结合关键词、搜索意图和点击吸引力生成更适合搜索结果的标题。",
    href: "/tutorials/how-to-write-seo-titles-with-ai",
    category: "教程中心",
  },
  {
    title: "AI视频生成工具推荐",
    description: "介绍 AI 视频生成工具的常见类型、适用场景和选择方式。",
    href: "/tutorials/ai-video-generation-tools",
    category: "教程中心",
  },
];

export const allContentPages = [...aiToolReviews, ...aiToolRankings, ...dealPages, ...tutorials];

export function findContentByHref(href: string) {
  return allContentPages.find((item) => item.href === href);
}
