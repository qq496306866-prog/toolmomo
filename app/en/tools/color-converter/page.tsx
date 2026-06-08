import type { Metadata } from "next";
import { EnglishShell } from "@/components/en/EnglishShell";
import { ColorConverterTool } from "@/components/tools/ColorConverterTool";
import { InfoPanel } from "@/components/tools/InfoPanel";
import { RelatedTools } from "@/components/tools/RelatedTools";

export const metadata: Metadata = {
  title: "Color Converter - Toolmomo English",
  description: "Convert HEX, RGB, and HSL color values with a live preview.",
};

const relatedTools = [
  { name: "Regex Tester", href: "/en/tools/regex-tester", description: "Test regular expressions and replacements." },
  { name: "JSON Formatter", href: "/en/tools/json-format", description: "Format, validate, and minify JSON data." },
  { name: "UUID Generator", href: "/en/tools/uuid-generator", description: "Generate UUID v4 identifiers in bulk." },
];

export default function EnglishColorConverterPage() {
  return (
    <EnglishShell description="Convert common web color formats and preview the result instantly." title="Color Converter">
      <section className="mx-auto grid max-w-[1200px] grid-cols-1 gap-5 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8">
        <div className="space-y-5">
          <ColorConverterTool locale="en" />
          <InfoPanel
            items={["HEX is common in CSS and design specs.", "RGB is useful for rgba() opacity work.", "HSL is convenient when tuning hue, saturation, and lightness."]}
            title="Format notes"
          />
        </div>
        <aside className="space-y-5">
          <RelatedTools title="Related tools" tools={relatedTools} />
        </aside>
      </section>
    </EnglishShell>
  );
}
