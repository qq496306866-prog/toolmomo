import type { EnglishToolItem } from "@/data/toolsEn";

type EnglishToolCardProps = {
  tool: EnglishToolItem;
};

function iconTone(category: EnglishToolItem["category"]) {
  const tones: Record<EnglishToolItem["category"], string> = {
    "PDF Tools": "bg-[#fff2f3] text-[#ef476f]",
    "Image Tools": "bg-[#eff8ff] text-[#2493d1]",
    "Write Tools": "bg-[#f5f0ff] text-[#7655df]",
    "Video Tools": "bg-[#fff6e5] text-[#df9320]",
    "File Tools": "bg-[#effaf4] text-[#1f9a6a]",
  };

  return tones[category];
}

export function EnglishToolCard({ tool }: EnglishToolCardProps) {
  return (
    <a
      className="group flex h-full min-h-[120px] gap-4 rounded-[24px] border border-[#e9eff6] bg-white p-4 shadow-[0_8px_22px_rgba(32,43,60,0.05)] transition hover:-translate-y-0.5 hover:border-[#ffd1c5] hover:shadow-[0_20px_46px_rgba(32,43,60,0.12)]"
      href={tool.href}
    >
      <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-[20px] text-xs font-black ${iconTone(tool.category)}`}>
        {tool.icon}
      </span>
      <span className="min-w-0 pt-1">
        <span className="block text-[17px] font-black leading-6 text-[#263244] group-hover:text-[#ff5b34]">{tool.name}</span>
        <span className="mt-1 block text-xs font-black text-[#ff5b34]">{tool.category}</span>
        <span className="mt-1 block text-[14px] font-semibold leading-6 text-[#728197]">{tool.description}</span>
      </span>
    </a>
  );
}
