import type { Metadata } from "next";
import { EnglishToolWorkspace } from "@/components/en/EnglishToolWorkspace";
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
    <EnglishToolWorkspace
      actionLabel="Generate UUIDs in bulk"
      category="File Tools"
      description="Generate UUID v4 values for test data, database records, API work, and temporary identifiers."
      guidanceItems={[
        "UUID v4 is random and useful for non-sequential identifiers.",
        "Use database constraints when business-critical uniqueness matters.",
        "Export TXT when you need to paste IDs into spreadsheets or scripts.",
      ]}
      guidanceTitle="Usage notes"
      relatedTools={relatedTools}
      title="UUID Generator"
    >
      <UuidGeneratorTool locale="en" />
    </EnglishToolWorkspace>
  );
}
