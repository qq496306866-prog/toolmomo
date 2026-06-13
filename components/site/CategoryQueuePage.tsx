import { EnglishShell } from "@/components/en/EnglishShell";

export function CategoryQueuePage({ name, targetCount, nextBatch }: { name: string; targetCount: number; nextBatch: string[] }) {
  return <EnglishShell title={`${name} Tools`} description={`${targetCount} tools are mapped to the TOOLMOMO catalog. Only tools that pass processing and download validation will be published.`}><section className="mx-auto max-w-[980px] px-5 py-14"><div className="border-y border-[#dfe7f1] bg-white px-2 py-10"><p className="text-sm font-black uppercase text-[#8a98aa]">Next validation batch</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{nextBatch.map((tool) => <div className="flex items-center justify-between border-b border-[#edf1f6] px-2 py-4" key={tool}><span className="font-black">{tool}</span><span className="text-xs font-black uppercase text-[#8a98aa]">Testing</span></div>)}</div></div></section></EnglishShell>;
}
