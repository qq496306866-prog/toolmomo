import type { Metadata } from "next";
import { EnglishShell } from "@/components/en/EnglishShell";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { PasswordGeneratorTool } from "@/components/tools/PasswordGeneratorTool";
import { RelatedTools } from "@/components/tools/RelatedTools";

export const metadata: Metadata = {
  title: "Password Generator - Toolmomo English",
  description: "Generate secure passwords, PIN codes, and random strings locally in the browser.",
};

const relatedTools = [
  { name: "UUID Generator", href: "/en/tools/uuid-generator", description: "Generate UUID v4 identifiers in bulk." },
  { name: "Regex Tester", href: "/en/tools/regex-tester", description: "Test regular expressions and replacements." },
  { name: "Base64 Encoder", href: "/tools/base64", description: "Encode and decode Base64 text." },
];

export default function EnglishPasswordGeneratorPage() {
  return (
    <EnglishShell description="Generate random passwords with configurable length, letters, numbers, and symbols." title="Password Generator">
      <section className="mx-auto grid max-w-[1200px] grid-cols-1 gap-5 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8">
        <div className="space-y-5">
          <PasswordGeneratorTool locale="en" />
          <InfoPanel
            items={["Generation happens locally in the browser.", "Use different passwords for different sites.", "Use a password manager to store final credentials."]}
            title="Security notes"
          />
        </div>
        <aside className="space-y-5">
          <RelatedTools title="Related tools" tools={relatedTools} />
        </aside>
      </section>
    </EnglishShell>
  );
}
