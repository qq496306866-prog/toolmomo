import type { Metadata } from "next";
import { EnglishShell } from "@/components/en/EnglishShell";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { UuidGeneratorTool } from "@/components/tools/UuidGeneratorTool";

export const metadata: Metadata = {
  title: "UUID Generator - Toolmomo English",
  description: "Generate UUID v4 identifiers in bulk with copy and export support.",
};

const relatedTools = [
  { name: "Password Generator", href: "/en/tools/password-generator", description: "Generate secure passwords and random strings." },
  { name: "Regex Tester", href: "/en/tools/regex-tester", description: "Test regular expressions and replacements." },
  { name: "Timestamp Converter", href: "/en/tools/timestamp", description: "Convert Unix timestamps and dates." },
];

export default function EnglishUuidGeneratorPage() {
  return (
    <EnglishShell description="Generate UUID v4 values for test data, database records, API work, and temporary identifiers." title="UUID Generator">
      <section className="mx-auto grid max-w-[1200px] grid-cols-1 gap-5 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8">
        <div className="space-y-5">
          <UuidGeneratorTool locale="en" />
          <InfoPanel
            items={["UUID v4 is random and useful for non-sequential identifiers.", "Use database constraints when business-critical uniqueness matters.", "Export TXT when you need to paste IDs into spreadsheets or scripts."]}
            title="Usage notes"
          />
        </div>
        <aside className="space-y-5">
          <RelatedTools title="Related tools" tools={relatedTools} />
        </aside>
      </section>
    </EnglishShell>
  );
}
