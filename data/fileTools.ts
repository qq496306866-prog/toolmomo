export type FileOperation = "split-csv" | "json-to-xml" | "xml-to-csv" | "csv-to-json" | "xml-to-json" | "csv-to-xml";
type FileToolBase = { slug: string; name: string; description: string; icon: string; accept: string; popular?: boolean };
export type FileToolDefinition = FileToolBase & (
  | { provider: "local"; operation: FileOperation; output: string }
  | { provider: "cloudconvert"; inputFormat: string; outputFormat: string }
);
export const fileTools: FileToolDefinition[] = [
  { slug: "file-split-csv", name: "Split CSV", description: "Split a CSV file into smaller files by row count.", icon: "SPLIT", provider: "local", operation: "split-csv", accept: ".csv,text/csv", output: "zip", popular: true },
  { slug: "file-json-to-xml", name: "JSON to XML", description: "Convert JSON data into a readable XML document.", icon: "XML", provider: "local", operation: "json-to-xml", accept: ".json,application/json", output: "xml" },
  { slug: "file-xml-to-csv", name: "XML to CSV", description: "Convert repeated XML records into CSV rows.", icon: "CSV", provider: "local", operation: "xml-to-csv", accept: ".xml,text/xml,application/xml", output: "csv" },
  { slug: "file-csv-to-json", name: "CSV to JSON", description: "Convert CSV headers and rows into JSON objects.", icon: "JSON", provider: "local", operation: "csv-to-json", accept: ".csv,text/csv", output: "json", popular: true },
  { slug: "file-xml-to-json", name: "XML to JSON", description: "Convert an XML document into structured JSON.", icon: "JSON", provider: "local", operation: "xml-to-json", accept: ".xml,text/xml,application/xml", output: "json" },
  { slug: "file-csv-to-xml", name: "CSV to XML", description: "Convert CSV rows into an XML records document.", icon: "XML", provider: "local", operation: "csv-to-xml", accept: ".csv,text/csv", output: "xml" },
  { slug: "file-xlsx-to-csv", name: "XLSX to CSV", description: "Convert an Excel workbook into a CSV file.", icon: "CSV", provider: "cloudconvert", accept: ".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", inputFormat: "xlsx", outputFormat: "csv", popular: true },
  { slug: "file-csv-to-xlsx", name: "CSV to XLSX", description: "Convert CSV data into an Excel workbook.", icon: "XLSX", provider: "cloudconvert", accept: ".csv,text/csv", inputFormat: "csv", outputFormat: "xlsx", popular: true },
  { slug: "file-xls-to-csv", name: "XLS to CSV", description: "Convert a legacy Excel spreadsheet into CSV.", icon: "CSV", provider: "cloudconvert", accept: ".xls,application/vnd.ms-excel", inputFormat: "xls", outputFormat: "csv" },
  { slug: "file-csv-to-xls", name: "CSV to XLS", description: "Convert CSV data into a legacy Excel spreadsheet.", icon: "XLS", provider: "cloudconvert", accept: ".csv,text/csv", inputFormat: "csv", outputFormat: "xls" },
  { slug: "file-ods-to-csv", name: "ODS to CSV", description: "Convert an OpenDocument spreadsheet into CSV.", icon: "CSV", provider: "cloudconvert", accept: ".ods,application/vnd.oasis.opendocument.spreadsheet", inputFormat: "ods", outputFormat: "csv" },
  { slug: "file-csv-to-ods", name: "CSV to ODS", description: "Convert CSV data into an OpenDocument spreadsheet.", icon: "ODS", provider: "cloudconvert", accept: ".csv,text/csv", inputFormat: "csv", outputFormat: "ods" },
];
export const fileToolMap = new Map(fileTools.map((tool) => [tool.slug, tool]));
export const getFileTool = (slug: string) => fileToolMap.get(slug);
