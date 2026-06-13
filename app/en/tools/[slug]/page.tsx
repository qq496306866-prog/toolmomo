import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnglishShell } from "@/components/en/EnglishShell";
import { EnglishToolCard } from "@/components/en/EnglishToolCard";
import { englishTools, getEnglishToolBySlug, type EnglishToolItem } from "@/data/toolsEn";

type EnglishToolPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return englishTools.map((tool) => ({
    slug: tool.href.replace("/en/tools/", ""),
  }));
}

export async function generateMetadata({ params }: EnglishToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getEnglishToolBySlug(slug);

  if (!tool) {
    return {
      title: "Tool not found - Toolmomo English",
    };
  }

  return {
    title: `${tool.name} - Toolmomo English`,
    description: tool.description,
  };
}

function toolActionCopy(tool: EnglishToolItem) {
  if (tool.category === "PDF Tools") {
    return {
      action: "Select or open your PDF workflow",
      stepOne: "Choose the PDF, image, or document workflow you need",
      stepTwo: "Open the working tool and add your files from your device",
      stepThree: "Download the finished file when processing is complete",
    };
  }

  if (tool.category === "Image Tools") {
    return {
      action: "Select images or open the working tool",
      stepOne: "Choose a product image or marketplace workflow",
      stepTwo: "Adjust the settings for size, format, or output",
      stepThree: "Download the prepared image or asset",
    };
  }

  if (tool.category === "Write Tools") {
    return {
      action: "Open the writing workspace",
      stepOne: "Describe the content or text task you want to complete",
      stepTwo: "Review the generated draft, count, rewrite, or formatted output",
      stepThree: "Copy the result into your listing, document, or workflow",
    };
  }

  return {
    action: "Open the working tool",
    stepOne: "Choose the utility that matches your task",
    stepTwo: "Enter your data, text, file, or settings",
    stepThree: "Copy or download the finished result",
  };
}

function categoryTone(category: EnglishToolItem["category"]) {
  const tones: Record<EnglishToolItem["category"], string> = {
    "PDF Tools": "bg-[#fff2f3] text-[#ef476f]",
    "Image Tools": "bg-[#eff8ff] text-[#2493d1]",
    "Write Tools": "bg-[#f5f0ff] text-[#7655df]",
    "Video Tools": "bg-[#fff6e5] text-[#df9320]",
    "File Tools": "bg-[#effaf4] text-[#1f9a6a]",
  };

  return tones[category];
}

function UploadGlyph({ category }: { category: EnglishToolItem["category"] }) {
  return (
    <svg aria-hidden="true" className="h-16 w-16" viewBox="0 0 64 64">
      <path d="M18 6h22l10 10v42H18z" fill="white" stroke="currentColor" strokeWidth="4" />
      <path d="M39 7v12h12" fill="none" stroke="currentColor" strokeWidth="4" />
      {category === "PDF Tools" ? (
        <>
          <path d="M16 36h32v15H16z" fill="currentColor" />
          <path d="M21 47v-7h4.2c2.2 0 3.7 1.2 3.7 3.1s-1.5 3.1-3.7 3.1h-1.7v.8zm2.5-3h1.4c.8 0 1.3-.3 1.3-.9s-.5-.9-1.3-.9h-1.4zm7.1 3v-7h3.2c2.3 0 3.9 1.4 3.9 3.5S36.1 47 33.8 47zm2.5-2.1h.6c.9 0 1.5-.5 1.5-1.4s-.6-1.4-1.5-1.4h-.6zm6.8 2.1v-7h6v2.1h-3.5v.9h3.1v2h-3.1v2z" fill="white" />
        </>
      ) : (
        <path d="M24 38l8-8 8 8M32 31v18" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
      )}
    </svg>
  );
}

export default async function EnglishToolPage({ params }: EnglishToolPageProps) {
  const { slug } = await params;
  const tool = getEnglishToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const copy = toolActionCopy(tool);
  const relatedTools = englishTools.filter((item) => item.category === tool.category && item.href !== tool.href).slice(0, 6);
  const suggestedTools = englishTools.filter((item) => item.category !== tool.category).slice(0, 6);
  const steps = [
    ["Step 1", copy.stepOne],
    ["Step 2", copy.stepTwo],
    ["Step 3", copy.stepThree],
  ];

  return (
    <EnglishShell>
      <section className="bg-white">
        <div className="mx-auto max-w-[980px] px-5 pb-14 pt-12 text-center">
          <div className={`mx-auto grid h-[86px] w-[86px] place-items-center rounded-[28px] shadow-[0_18px_60px_rgba(38,50,68,0.12)] ${categoryTone(tool.category)}`}>
            <UploadGlyph category={tool.category} />
          </div>
          <p className="mt-7 inline-flex rounded-full bg-[#fff1ec] px-4 py-2 text-sm font-black text-[#ff5b34]">{tool.category}</p>
          <h1 className="mx-auto mt-5 max-w-[850px] text-[42px] font-black leading-[1.05] text-[#202b3c] sm:text-[62px]">
            {tool.name}
          </h1>
          <p className="mx-auto mt-5 max-w-[720px] text-[18px] font-semibold leading-8 text-[#6f7f94]">{tool.description}</p>
        </div>
      </section>

      <section className="mx-auto max-w-[980px] px-5 pb-12">
        <div className="rounded-[36px] border border-[#e9eff6] bg-white p-5 shadow-[0_24px_70px_rgba(32,43,60,0.14)] sm:p-8">
          <div className="rounded-[30px] border-2 border-dashed border-[#dfe7f1] bg-[#f7f9fc] p-6 text-center sm:p-10">
            <div className={`mx-auto grid h-20 w-20 place-items-center rounded-[26px] ${categoryTone(tool.category)}`}>
              <UploadGlyph category={tool.category} />
            </div>
            <h2 className="mt-6 text-[28px] font-black text-[#263244]">{copy.action}</h2>
            <p className="mx-auto mt-3 max-w-xl text-[15px] font-semibold leading-7 text-[#728197]">
              Toolmomo keeps the English entry clean and sends you to the working browser tool when a file or form action is needed.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a className="inline-flex h-13 items-center rounded-full bg-[#ff5b34] px-7 py-4 text-sm font-black text-white shadow-[0_16px_36px_rgba(255,91,52,0.24)]" href={tool.originalHref}>
                Open Working Tool
              </a>
              <a className="inline-flex h-13 items-center rounded-full border border-[#e4ebf3] bg-white px-7 py-4 text-sm font-black text-[#65758a]" href="/en/tools">
                Browse All Tools
              </a>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 rounded-[24px] bg-[#fff8ef] px-5 py-4 text-center text-sm font-black text-[#9b6a28] sm:flex-row sm:items-center sm:justify-center">
            <span>Files and generated results should be treated as temporary browser-session work.</span>
            <span className="hidden h-1 w-1 rounded-full bg-[#d5a65c] sm:block" />
            <span>Use the live tool page for actual processing.</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1080px] px-5 py-10">
        <div className="text-center">
          <h2 className="text-[36px] font-black leading-tight text-[#263244]">How To Use {tool.name}</h2>
          <p className="mt-3 text-[16px] font-semibold text-[#728197]">Follow along with the steps below.</p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {steps.map(([label, text], index) => (
            <div className="rounded-[28px] border border-[#e9eff6] bg-white p-6 text-center shadow-[0_12px_28px_rgba(32,43,60,0.07)]" key={label}>
              <div className={`mx-auto grid h-16 w-16 place-items-center rounded-[22px] text-[24px] font-black ${categoryTone(tool.category)}`}>
                {index + 1}
              </div>
              <h3 className="mt-5 text-[20px] font-black text-[#263244]">{label}</h3>
              <p className="mt-3 text-[15px] font-semibold leading-7 text-[#728197]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {relatedTools.length ? (
        <section className="mx-auto max-w-[1220px] px-5 py-10">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-[34px] font-black leading-tight text-[#263244]">More {tool.category}</h2>
              <p className="mt-2 text-[15px] font-semibold text-[#728197]">Related tools from the same category.</p>
            </div>
            <a className="text-sm font-black text-[#ff5b34]" href={`/en/tools?category=${encodeURIComponent(tool.category)}`}>
              View all
            </a>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map((item) => (
              <EnglishToolCard key={item.href} tool={item} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="bg-white py-12">
        <div className="mx-auto max-w-[1220px] px-5">
          <div className="mb-6 text-center">
            <h2 className="text-[34px] font-black leading-tight text-[#263244]">Popular Tools</h2>
            <p className="mt-2 text-[15px] font-semibold text-[#728197]">Other quick workflows you may need next.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {suggestedTools.map((item) => (
              <EnglishToolCard key={item.href} tool={item} />
            ))}
          </div>
        </div>
      </section>
    </EnglishShell>
  );
}
