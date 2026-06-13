import type { Metadata } from "next";
import { EnglishToolWorkspace } from "@/components/en/EnglishToolWorkspace";
import { RegexTesterTool } from "@/components/tools/RegexTesterTool";

export const metadata: Metadata = {
  title: "Regex Tester - Toolmomo English",
  description: "Test JavaScript regular expressions, match groups, indexes, and replacement previews.",
};

const relatedTools = [
  { name: "JSON Formatter", href: "/en/tools/json-formatter", description: "Format, validate, and minify JSON data." },
  { name: "URL Encoder", href: "/en/tools/url-encode", description: "Encode, decode, and inspect URL parameters." },
  { name: "Text Deduplicate", href: "/en/tools/text-deduplicate", description: "Remove duplicated lines from text lists." },
];

export default function EnglishRegexTesterPage() {
  return (
    <EnglishToolWorkspace
      actionLabel="Test a regular expression"
      category="File Tools"
      description="Enter a JavaScript regular expression and test text to inspect matches, indexes, groups, and replacement output."
      guidanceItems={[
        "Uses JavaScript RegExp syntax.",
        "Global matching lists every hit.",
        "Replacement preview helps verify bulk text edits before applying them elsewhere.",
      ]}
      guidanceTitle="Testing notes"
      relatedTools={relatedTools}
      title="Regex Tester"
    >
      <RegexTesterTool locale="en" />
    </EnglishToolWorkspace>
  );
}
