import type { Metadata } from "next";
import { EnglishToolWorkspace } from "@/components/en/EnglishToolWorkspace";
import { ColorConverterTool } from "@/components/tools/ColorConverterTool";

export const metadata: Metadata = {
  title: "Color Converter - Toolmomo English",
  description: "Convert HEX, RGB, and HSL color values with a live preview.",
};

const relatedTools = [
  { name: "Regex Tester", href: "/en/tools/regex-tester", description: "Test regular expressions and replacements." },
  { name: "JSON Formatter", href: "/en/tools/json-formatter", description: "Format, validate, and minify JSON data." },
  { name: "UUID Generator", href: "/en/tools/uuid-generator", description: "Generate UUID v4 identifiers in bulk." },
];

export default function EnglishColorConverterPage() {
  return (
    <EnglishToolWorkspace
      actionLabel="Convert color formats"
      category="File Tools"
      description="Convert common web color formats and preview the result instantly."
      guidanceItems={[
        "HEX is common in CSS and design specs.",
        "RGB is useful for rgba() opacity work.",
        "HSL is convenient when tuning hue, saturation, and lightness.",
      ]}
      guidanceTitle="Format notes"
      relatedTools={relatedTools}
      title="Color Converter"
    >
      <ColorConverterTool locale="en" />
    </EnglishToolWorkspace>
  );
}
