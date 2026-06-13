type RelatedTool = { name: string; description: string; href: string; icon: string };
type ToolDetailsProps = { name: string; description: string; category: string; mode: "browser" | "ai" | "remote"; formats?: string; related: RelatedTool[]; note?: string };

const categoryGuidance: Record<string, { input: string; options: string; result: string; useCases: string; troubleshooting: string }> = {
  PDF: {
    input: "Choose the PDF or source document requested by this tool.",
    options: "Review page selections, output format, quality, or document settings before processing.",
    result: "Preview the result where available, then download the finished document or ZIP archive.",
    useCases: "Preparing documents for sharing, extracting pages or content, and converting office or image files for a consistent PDF workflow.",
    troubleshooting: "Encrypted, damaged, unusually complex, or scanned PDFs may need a password, OCR, or a smaller source file.",
  },
  Image: {
    input: "Choose an image in one of the supported formats and confirm that it opens correctly in your browser.",
    options: "Set dimensions, crop, quality, color, effect, or output format when those controls are available.",
    result: "Inspect the processed preview and download the new image without replacing your original file.",
    useCases: "Preparing images for websites, social profiles, marketplace listings, documents, and faster sharing.",
    troubleshooting: "Very large images can use significant browser memory. Try a smaller source or a common format such as JPG, PNG, or WEBP.",
  },
  Write: {
    input: "Paste the source text or describe the topic, audience, and result you need.",
    options: "Choose the available tone, language, transformation, or output preference and keep the request specific.",
    result: "Review the generated or transformed text, make factual edits, then copy the final version.",
    useCases: "Editing drafts, organizing ideas, preparing professional messages, and creating first-pass content that you can refine.",
    troubleshooting: "If the result is too broad, add the intended audience, tone, length, required facts, and examples to your input.",
  },
  "Video and Audio": {
    input: "Choose the supported video or audio file shown in the upload field.",
    options: "Confirm the target format and use a short source when testing an unfamiliar conversion.",
    result: "Wait for the secure cloud job to finish, then download and play the converted media before deleting your original.",
    useCases: "Making media compatible with another device, extracting audio, and preparing lighter formats for publishing or sharing.",
    troubleshooting: "Unsupported codecs, damaged media, and very long files can fail even when the filename extension is accepted.",
  },
  File: {
    input: "Choose a structured-data or spreadsheet file in one of the supported formats.",
    options: "Check headers, delimiters, row structure, and the requested output format before conversion.",
    result: "Download the converted file and verify a few records in the application where you plan to use it.",
    useCases: "Moving data between spreadsheets, APIs, databases, reporting tools, and import or export workflows.",
    troubleshooting: "Malformed rows, inconsistent columns, invalid JSON, or irregular XML records should be corrected before retrying.",
  },
};

export function ToolDetails({ name, description, category, mode, formats, related, note }: ToolDetailsProps) {
  const guidance = categoryGuidance[category] || categoryGuidance.File;
  const modeText = mode === "browser" ? "This tool runs in your browser. Your source file or text is not uploaded to TOOLMOMO." : mode === "ai" ? "Your text is sent securely to the configured AI provider. TOOLMOMO does not keep a writing history." : "Your file is uploaded for secure conversion and the temporary input and result are deleted after one hour.";
  const freeAnswer = mode === "browser" ? "Yes. This browser-based tool has no TOOLMOMO usage limit." : "Yes. This tool is available under a daily fair-use limit while TOOLMOMO uses external provider quotas.";
  const storageAnswer = mode === "browser" ? "No. Processing happens on your device and the source is not uploaded to TOOLMOMO." : mode === "ai" ? "TOOLMOMO does not keep a writing history. Input is sent to the configured AI provider only to produce the requested result." : "Remote jobs use temporary storage with random job IDs. Inputs and results are deleted automatically after one hour.";
  const faq = [
    { question: `What is ${name} useful for?`, answer: `${description} ${guidance.useCases}` },
    { question: `Is ${name} free?`, answer: freeAnswer },
    { question: "Does TOOLMOMO store my input?", answer: storageAnswer },
    { question: "What should I do if processing fails?", answer: guidance.troubleshooting },
  ];
  const faqJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };

  return <>
    <script dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} type="application/ld+json" />
    <section className="border-y border-[#e4eaf1] bg-white"><div className="mx-auto grid max-w-[1100px] gap-10 px-5 py-14 lg:grid-cols-2"><div><h2 className="text-2xl font-black">How to use {name}</h2><ol className="mt-5 grid gap-4 text-sm font-semibold leading-7 text-[#66758a]"><li><strong className="text-[#263244]">1. Add your input.</strong> {guidance.input}</li><li><strong className="text-[#263244]">2. Review the options.</strong> {guidance.options}</li><li><strong className="text-[#263244]">3. Check the result.</strong> {guidance.result}</li></ol>{note ? <p className="mt-5 border-l-4 border-[#ff5b34] pl-4 text-sm font-semibold leading-7 text-[#66758a]">{note}</p> : null}</div><div><h2 className="text-2xl font-black">Formats, limits, and privacy</h2><dl className="mt-5 grid gap-4 text-sm"><div><dt className="font-black">Best for</dt><dd className="mt-1 font-semibold leading-7 text-[#66758a]">{guidance.useCases}</dd></div><div><dt className="font-black">Processing</dt><dd className="mt-1 font-semibold leading-7 text-[#66758a]">{modeText}</dd></div><div><dt className="font-black">Supported input</dt><dd className="mt-1 font-semibold leading-7 text-[#66758a]">{formats || "The formats shown in the upload field."}</dd></div><div><dt className="font-black">Limits</dt><dd className="mt-1 font-semibold leading-7 text-[#66758a]">Files are limited to 50 MB. PDF jobs are limited to 100 pages. Complex and AI tools allow five jobs per IP each UTC day.</dd></div></dl></div></div></section>
    <section className="mx-auto max-w-[1100px] px-5 py-14"><h2 className="text-2xl font-black">Frequently asked questions</h2><div className="mt-5 divide-y divide-[#e4eaf1] border-y border-[#e4eaf1]">{faq.map((item) => <details className="py-5" key={item.question}><summary className="cursor-pointer font-black">{item.question}</summary><p className="mt-3 text-sm font-semibold leading-7 text-[#66758a]">{item.answer}</p></details>)}</div></section>
    {related.length ? <section className="bg-[#f5f7fb]"><div className="mx-auto max-w-[1100px] px-5 py-14"><h2 className="text-2xl font-black">Related {category} tools</h2><div className="mt-6 grid gap-4 md:grid-cols-3">{related.slice(0, 3).map((tool) => <a className="flex gap-3 rounded-[12px] border border-[#e4eaf1] bg-white p-4 hover:border-[#ffb5a2]" href={tool.href} key={tool.href}><span className="grid h-11 w-11 shrink-0 place-items-center rounded-[10px] bg-[#f2f5f8] text-[10px] font-black">{tool.icon}</span><span><span className="font-black">{tool.name}</span><span className="mt-1 block text-xs font-semibold leading-5 text-[#728197]">{tool.description}</span></span></a>)}</div></div></section> : null}
  </>;
}
