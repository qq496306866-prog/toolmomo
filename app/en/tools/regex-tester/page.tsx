import type { Metadata } from "next";
import { EnglishShell } from "@/components/en/EnglishShell";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RegexTesterTool } from "@/components/tools/RegexTesterTool";
import { RelatedTools } from "@/components/tools/RelatedTools";

export const metadata: Metadata = {
  title: "Regex Tester - Toolmomo English",
  description: "Test JavaScript regular expressions, match groups, indexes, and replacement previews.",
};

const relatedTools = [
  { name: "JSON Formatter", href: "/tools/json-format", description: "Format, validate, and minify JSON data." },
  { name: "URL Encoder", href: "/tools/url-encode", description: "Encode, decode, and inspect URL parameters." },
  { name: "Text Deduplicate", href: "/tools/text-deduplicate", description: "Remove duplicated lines from text lists." },
];

export default function EnglishRegexTesterPage() {
  return (
    <EnglishShell description="Enter a JavaScript regular expression and test text to inspect matches, indexes, groups, and replacement output." title="Regex Tester">
      <section className="mx-auto grid max-w-[1200px] grid-cols-1 gap-5 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8">
        <div className="space-y-5">
          <RegexTesterTool locale="en" />
          <InfoPanel
            items={["Uses JavaScript RegExp syntax.", "Global matching lists every hit.", "Replacement preview helps verify bulk text edits before applying them elsewhere."]}
            title="Testing notes"
          />
        </div>
        <aside className="space-y-5">
          <RelatedTools title="Related tools" tools={relatedTools} />
        </aside>
      </section>
    </EnglishShell>
  );
}
