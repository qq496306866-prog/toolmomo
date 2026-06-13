import type { Metadata } from "next";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { aiToolReviews } from "@/data/content";
import { tools } from "@/data/tools";
import { notFound } from "next/navigation";

type ToolPageProps = {
  params: Promise<{ slug: string }>;
};

function findTool(slug: string) {
  return tools.find((tool) => tool.href === `/tools/${slug}`);
}

function getRelatedTools(currentHref: string) {
  const current = tools.find((tool) => tool.href === currentHref);
  const sameCategory = tools.filter((tool) => tool.category === current?.category && tool.href !== currentHref);
  const fallback = tools.filter((tool) => tool.href !== currentHref);
  return [...sameCategory, ...fallback]
    .filter((tool, index, list) => list.findIndex((item) => item.href === tool.href) === index)
    .slice(0, 6)
    .map((tool) => ({
      name: tool.name,
      href: tool.href,
      description: tool.description,
    }));
}

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.href.split("/").pop()! }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = findTool(slug);

  if (!tool) {
    return {
      title: "工具不存在 - TOOLMOMO",
      description: "没有找到这个 TOOLMOMO 工具页面。",
    };
  }

  return {
    title: `${tool.name} - TOOLMOMO免费在线工具`,
    description: tool.description,
    alternates: {
      canonical: tool.href,
    },
  };
}

export default async function GenericToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = findTool(slug);

  if (!tool) {
    notFound();
  }

  return (
    <ToolPageShell
      category={tool.category}
      description={tool.description}
      sidebar={
        <>
          <RelatedTools tools={getRelatedTools(tool.href)} />
          <InfoPanel
            items={[
              "当前页面使用统一工具页模板，后续可以替换为专属交互组件。",
              "页面 URL 已使用英文小写和连字符，方便后续英文版与 Google SEO 扩展。",
              "推荐 AI 工具区域已预留，可用于后续联盟推广。"
            ]}
            title="页面说明"
          />
        </>
      }
      title={tool.name}
    >
      <div className="space-y-5">
        <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-950">工具操作区</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            这个工具可以帮助你快速生成、处理或优化相关内容。当前先提供可维护的页面结构、SEO 内容和工具入口，后续可以接入真实生成逻辑或 AI 服务。
          </p>
          <div className="mt-4 grid grid-cols-1 gap-4">
            <label className="text-sm font-semibold text-slate-800" htmlFor="tool-input">
              输入主题、关键词或产品信息
              <textarea
                className="mt-2 min-h-32 w-full rounded-md border border-slate-200 p-3 text-sm leading-6 outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
                id="tool-input"
                placeholder="例如：输入主题、关键词、产品卖点、目标人群或需要处理的文本。"
              />
            </label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <select className="rounded-md border border-slate-200 bg-white px-3 py-3 text-sm">
                <option>通用场景</option>
                <option>内容创作</option>
                <option>SEO优化</option>
                <option>电商运营</option>
              </select>
              <button className="rounded-md bg-accent-500 px-4 py-3 text-sm font-semibold text-white hover:bg-accent-600" type="button">
                生成
              </button>
              <button className="rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:border-accent-200 hover:text-accent-700" type="button">
                复制结果
              </button>
            </div>
            <div className="rounded-md bg-slate-50 p-4 text-sm leading-6 text-slate-500">
              结果区已预留。后续上线真实功能后，这里会展示生成结果、处理结果或可复制的优化建议。
            </div>
          </div>
        </section>

        <InfoPanel
          items={["内容创作者", "电商运营", "网站站长", "营销人员", "AI创作者", "小企业主"]}
          title="适合谁使用"
        />

        <InfoPanel
          items={["生成社交媒体内容", "生成产品描述", "优化SEO标题", "生成广告文案", "生成AI图片或视频提示词", "整理文本或文件"]}
          title="使用场景"
        />

        <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-950">使用方法</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-600">
            <li>输入主题、关键词或产品信息。</li>
            <li>选择内容类型或使用场景。</li>
            <li>点击生成，查看结果区内容。</li>
            <li>复制结果，并根据实际平台规则人工修改。</li>
            <li>搭配相关工具继续优化标题、描述、图片或 SEO 信息。</li>
          </ol>
        </section>

        <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-950">常见问题 FAQ</h2>
          <div className="mt-3 space-y-4 text-sm leading-6 text-slate-600">
            <div>
              <h3 className="font-semibold text-slate-950">这个工具免费吗？</h3>
              <p>TOOLMOMO 当前工具入口均以免费在线工具为主，后续如果加入第三方 AI 服务或联盟推荐，会在页面中明确说明。</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-950">生成内容可以直接使用吗？</h3>
              <p>建议把生成内容作为初稿或参考，发布前结合品牌语气、事实信息、平台规则和版权要求进行人工检查。</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-950">是否保存用户输入？</h3>
              <p>当前模板页不会提交输入内容。后续如果接入后端或 AI 服务，会补充隐私和数据处理说明。</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-950">适合哪些平台？</h3>
              <p>页面尽量采用全球通用命名，适合网站、社交媒体、电商平台、广告投放和内容创作工作流。</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-950">生成结果不满意怎么办？</h3>
              <p>可以补充更具体的关键词、受众、语气、长度和输出格式，也可以使用相关工具继续改写或优化。</p>
            </div>
          </div>
        </section>

        <section className="rounded-md border border-dashed border-accent-300 bg-accent-50 p-5">
          <h2 className="text-lg font-bold text-slate-950">推荐AI工具</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            这里预留联盟推荐区域，后续可放置真实 AI 工具测评、优惠链接和替代工具说明。
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {aiToolReviews.slice(0, 4).map((review) => (
              <a className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:text-accent-700" href={review.href} key={review.href}>
                {review.title}
              </a>
            ))}
          </div>
        </section>
      </div>
    </ToolPageShell>
  );
}
