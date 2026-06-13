export type FileOperation = "split-csv" | "json-to-xml" | "xml-to-csv" | "csv-to-json" | "xml-to-json" | "csv-to-xml";
export type FileToolDefinition = { slug: string; name: string; description: string; icon: string; operation: FileOperation; accept: string; output: string; popular?: boolean };

export const fileTools: FileToolDefinition[] = [
  { slug: "file-split-csv", name: "Split CSV", description: "Split a CSV file into smaller files by row count.", icon: "SPLIT", operation: "split-csv", accept: ".csv,text/csv", output: "zip", popular: true },
  { slug: "file-json-to-xml", name: "JSON to XML", description: "Convert JSON data into a readable XML document.", icon: "XML", operation: "json-to-xml", accept: ".json,application/json", output: "xml" },
  { slug: "file-xml-to-csv", name: "XML to CSV", description: "Convert repeated XML records into CSV rows.", icon: "CSV", operation: "xml-to-csv", accept: ".xml,text/xml,application/xml", output: "csv" },
  { slug: "file-csv-to-json", name: "CSV to JSON", description: "Convert CSV headers and rows into JSON objects.", icon: "JSON", operation: "csv-to-json", accept: ".csv,text/csv", output: "json", popular: true },
  { slug: "file-xml-to-json", name: "XML to JSON", description: "Convert an XML document into structured JSON.", icon: "JSON", operation: "xml-to-json", accept: ".xml,text/xml,application/xml", output: "json" },
  { slug: "file-csv-to-xml", name: "CSV to XML", description: "Convert CSV rows into an XML records document.", icon: "XML", operation: "csv-to-xml", accept: ".csv,text/csv", output: "xml" },
];
export const fileToolMap = new Map(fileTools.map((tool) => [tool.slug, tool]));
export const getFileTool = (slug: string) => fileToolMap.get(slug);
