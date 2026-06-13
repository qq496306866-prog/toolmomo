import type { Metadata } from "next";
import { EnglishToolWorkspace } from "@/components/en/EnglishToolWorkspace";
import { PasswordGeneratorTool } from "@/components/tools/PasswordGeneratorTool";

export const metadata: Metadata = {
  title: "Password Generator - Toolmomo English",
  description: "Generate secure passwords, PIN codes, and random strings locally in the browser.",
};

const relatedTools = [
  { name: "UUID Generator", href: "/en/tools/uuid-generator", description: "Generate UUID v4 identifiers in bulk." },
  { name: "Regex Tester", href: "/en/tools/regex-tester", description: "Test regular expressions and replacements." },
  { name: "Base64 Encoder", href: "/en/tools/base64", description: "Encode and decode Base64 text." },
];

export default function EnglishPasswordGeneratorPage() {
  return (
    <EnglishToolWorkspace
      actionLabel="Generate secure strings"
      category="File Tools"
      description="Generate random passwords with configurable length, letters, numbers, and symbols."
      guidanceItems={[
        "Generation happens locally in the browser.",
        "Use different passwords for different sites.",
        "Use a password manager to store final credentials.",
      ]}
      guidanceTitle="Security notes"
      relatedTools={relatedTools}
      title="Password Generator"
    >
      <PasswordGeneratorTool locale="en" />
    </EnglishToolWorkspace>
  );
}
