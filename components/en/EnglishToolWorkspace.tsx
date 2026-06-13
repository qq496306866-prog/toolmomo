import type { ReactNode } from "react";
import { EnglishShell } from "@/components/en/EnglishShell";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";

type RelatedTool = {
  name: string;
  href: string;
  description: string;
};

type EnglishToolWorkspaceProps = {
  title: string;
  description: string;
  category: string;
  actionLabel: string;
  guidanceTitle: string;
  guidanceItems: string[];
  relatedTools: RelatedTool[];
  children: ReactNode;
  secondaryPanel?: ReactNode;
};

function categoryTone(category: string) {
  if (category.includes("PDF")) return "bg-[#fff2f3] text-[#ef476f]";
  if (category.includes("Image")) return "bg-[#eff8ff] text-[#2493d1]";
  if (category.includes("Write")) return "bg-[#f5f0ff] text-[#7655df]";
  if (category.includes("Video")) return "bg-[#fff6e5] text-[#df9320]";
  if (category.includes("File")) return "bg-[#effaf4] text-[#1f9a6a]";
  return "bg-[#fff6e5] text-[#df9320]";
}

function WorkspaceGlyph() {
  return (
    <svg aria-hidden="true" className="h-14 w-14" viewBox="0 0 64 64">
      <rect fill="white" height="42" rx="9" stroke="currentColor" strokeWidth="4" width="48" x="8" y="11" />
      <path d="M18 25h28M18 35h22M18 45h14" stroke="currentColor" strokeLinecap="round" strokeWidth="4" />
      <path d="M42 42l8-8 4 4-8 8-6 2z" fill="currentColor" />
    </svg>
  );
}

export function EnglishToolWorkspace({
  title,
  description,
  category,
  actionLabel,
  guidanceTitle,
  guidanceItems,
  relatedTools,
  children,
  secondaryPanel,
}: EnglishToolWorkspaceProps) {
  const steps = [
    ["Step 1", `Enter or upload the information needed for ${title}.`],
    ["Step 2", "Adjust the options and review the preview or generated output."],
    ["Step 3", "Copy, export, or continue with the result in your workflow."],
  ];

  return (
    <EnglishShell>
      <section className="bg-white">
        <div className="mx-auto max-w-[980px] px-5 pb-12 pt-12 text-center">
          <div className={`mx-auto grid h-[86px] w-[86px] place-items-center rounded-[28px] shadow-[0_18px_60px_rgba(38,50,68,0.12)] ${categoryTone(category)}`}>
            <WorkspaceGlyph />
          </div>
          <p className="mt-7 inline-flex rounded-full bg-[#fff1ec] px-4 py-2 text-sm font-black text-[#ff5b34]">{category}</p>
          <h1 className="mx-auto mt-5 max-w-[850px] text-[42px] font-black leading-[1.05] text-[#202b3c] sm:text-[62px]">
            {title}
          </h1>
          <p className="mx-auto mt-5 max-w-[720px] text-[18px] font-semibold leading-8 text-[#6f7f94]">{description}</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1220px] px-5 pb-12">
        <div className="rounded-[36px] border border-[#e9eff6] bg-white p-4 shadow-[0_24px_70px_rgba(32,43,60,0.14)] sm:p-6">
          <div className="mb-5 flex flex-col justify-between gap-3 rounded-[28px] bg-[#f7f9fc] px-5 py-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-[24px] font-black text-[#263244]">{actionLabel}</h2>
              <p className="mt-1 text-sm font-semibold text-[#728197]">Work directly in the browser, then copy or export your result.</p>
            </div>
            <span className="inline-flex w-fit rounded-full bg-white px-4 py-2 text-sm font-black text-[#ff5b34] shadow-sm">
              Free Tool
            </span>
          </div>
          {children}
          <div className="mt-5 rounded-[24px] bg-[#fff8ef] px-5 py-4 text-center text-sm font-black text-[#9b6a28]">
            Inputs and results are intended for temporary browser-session work. Review final content before publishing or using it in production.
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1220px] grid-cols-1 gap-5 px-5 py-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-5">
          <InfoPanel items={guidanceItems} title={guidanceTitle} />
          <section className="rounded-[28px] border border-[#e9eff6] bg-white p-6 shadow-[0_12px_28px_rgba(32,43,60,0.07)]">
            <h2 className="text-[28px] font-black text-[#263244]">How To Use {title}</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {steps.map(([label, text], index) => (
                <div className="rounded-[22px] bg-[#f7f9fc] p-5" key={label}>
                  <div className={`grid h-12 w-12 place-items-center rounded-[18px] text-lg font-black ${categoryTone(category)}`}>
                    {index + 1}
                  </div>
                  <h3 className="mt-4 text-[18px] font-black text-[#263244]">{label}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-[#728197]">{text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
        <aside className="space-y-5">
          <RelatedTools title="Related tools" tools={relatedTools} />
          {secondaryPanel}
        </aside>
      </section>
    </EnglishShell>
  );
}
