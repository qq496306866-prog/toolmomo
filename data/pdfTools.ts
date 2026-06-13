export type PdfToolProvider = "local" | "pdfco" | "cloudconvert" | "deepl";

export type PdfLocalOperation =
  | "edit"
  | "images-to-pdf"
  | "merge"
  | "create"
  | "split"
  | "rearrange"
  | "crop"
  | "delete-pages"
  | "rotate"
  | "pdf-to-image"
  | "extract-text"
  | "add-page-numbers"
  | "add-watermark"
  | "add-text"
  | "annotate"
  | "esign"
  | "remove-annotations";

export type PdfToolDefinition = {
  slug: string;
  name: string;
  description: string;
  icon: string;
  provider: PdfToolProvider;
  localOperation?: PdfLocalOperation;
  accept: string;
  multiple?: boolean;
  outputFormat: string;
  inputFormat?: string;
  endpoint?: string;
  popular?: boolean;
  note?: string;
};

const local = (
  slug: string,
  name: string,
  description: string,
  icon: string,
  localOperation: PdfLocalOperation,
  accept: string,
  outputFormat: string,
  options: Pick<PdfToolDefinition, "multiple" | "popular" | "note"> = {},
): PdfToolDefinition => ({ slug, name, description, icon, provider: "local", localOperation, accept, outputFormat, ...options });

const remote = (
  slug: string,
  name: string,
  description: string,
  icon: string,
  provider: Exclude<PdfToolProvider, "local">,
  accept: string,
  outputFormat: string,
  inputFormat?: string,
  endpoint?: string,
  options: Pick<PdfToolDefinition, "multiple" | "popular" | "note"> = {},
): PdfToolDefinition => ({ slug, name, description, icon, provider, accept, outputFormat, inputFormat, endpoint, ...options });

export const pdfTools: PdfToolDefinition[] = [
  local("edit-pdf", "Edit PDF", "Add text, notes, signatures, and simple marks to a PDF.", "PDF", "edit", ".pdf,application/pdf", "pdf", { popular: true }),
  remote("pdf-to-word", "PDF to Word", "Convert a PDF to an editable Word document.", "DOC", "cloudconvert", ".pdf,application/pdf", "docx", "pdf", undefined, { popular: true }),
  local("jpg-to-pdf", "JPG to PDF", "Combine JPG images into a single PDF.", "JPG", "images-to-pdf", ".jpg,.jpeg,image/jpeg", "pdf", { multiple: true, popular: true }),
  local("pdf-merge", "Merge PDF", "Merge two or more PDF files in your chosen order.", "PDF", "merge", ".pdf,application/pdf", "pdf", { multiple: true, popular: true }),
  local("create-pdf", "Create PDF", "Create a clean PDF document from text.", "NEW", "create", "", "pdf"),
  local("pdf-to-jpg", "PDF to JPG", "Render every PDF page as a JPG image.", "JPG", "pdf-to-image", ".pdf,application/pdf", "jpg", { popular: true }),
  remote("compress-pdf", "Compress PDF", "Reduce PDF file size while preserving readability.", "ZIP", "pdfco", ".pdf,application/pdf", "pdf", "pdf", "/v2/pdf/compress", { popular: true }),
  remote("word-to-pdf", "Word to PDF", "Convert DOC or DOCX documents to PDF.", "DOC", "cloudconvert", ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document", "pdf", "docx"),
  local("pdf-split", "Split PDF", "Split selected page ranges into separate PDF files.", "CUT", "split", ".pdf,application/pdf", "pdf", { popular: true }),
  remote("unlock-pdf", "Unlock PDF", "Remove PDF password protection when you know the password.", "KEY", "pdfco", ".pdf,application/pdf", "pdf", "pdf", "/v1/pdf/security/remove"),
  remote("pdf-to-excel", "PDF to Excel", "Extract PDF tables into an XLSX workbook.", "XLS", "pdfco", ".pdf,application/pdf", "xlsx", "pdf", "/v1/pdf/convert/to/xlsx"),
  local("png-to-pdf", "PNG to PDF", "Combine PNG images into a single PDF.", "PNG", "images-to-pdf", ".png,image/png", "pdf", { multiple: true }),
  remote("pdf-to-powerpoint", "PDF to PowerPoint", "Convert PDF pages into a PowerPoint presentation.", "PPT", "cloudconvert", ".pdf,application/pdf", "pptx", "pdf"),
  remote("pdf-translator", "PDF Translator", "Translate a PDF document while preserving its structure where possible.", "TR", "deepl", ".pdf,application/pdf", "pdf", "pdf"),
  local("esign-pdf", "eSign PDF", "Draw or type a visible signature and place it on a PDF.", "SIG", "esign", ".pdf,application/pdf", "pdf", { note: "This is a visible signature, not a certificate-based digital signature." }),
  remote("protect-pdf", "Protect PDF", "Add password protection to a PDF file.", "LOCK", "pdfco", ".pdf,application/pdf", "pdf", "pdf", "/v1/pdf/security/add"),
  local("rearrange-pdf", "Rearrange PDF", "Reorder PDF pages using a page-number sequence.", "ORD", "rearrange", ".pdf,application/pdf", "pdf"),
  local("extract-text", "Extract Text", "Extract selectable text from every PDF page.", "TXT", "extract-text", ".pdf,application/pdf", "txt"),
  remote("epub-to-pdf", "EPUB to PDF", "Convert an EPUB ebook to PDF.", "EPUB", "cloudconvert", ".epub,application/epub+zip", "pdf", "epub"),
  remote("pdf-to-epub", "PDF to EPUB", "Convert a PDF document to EPUB.", "EPUB", "cloudconvert", ".pdf,application/pdf", "epub", "pdf"),
  local("crop-pdf", "Crop PDF", "Apply crop margins to every page of a PDF.", "CRP", "crop", ".pdf,application/pdf", "pdf"),
  remote("powerpoint-to-pdf", "PowerPoint to PDF", "Convert PPT or PPTX presentations to PDF.", "PPT", "cloudconvert", ".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation", "pdf", "pptx"),
  local("pdf-to-png", "PDF to PNG", "Render every PDF page as a PNG image.", "PNG", "pdf-to-image", ".pdf,application/pdf", "png"),
  local("pdf-page-deleter", "PDF Page Deleter", "Remove selected pages from a PDF.", "DEL", "delete-pages", ".pdf,application/pdf", "pdf"),
  remote("url-to-pdf", "URL to PDF", "Capture a public web page as a PDF.", "URL", "pdfco", "", "pdf", undefined, "/v1/pdf/convert/from/url"),
  local("rotate-pdf", "Rotate PDF", "Rotate all or selected PDF pages.", "ROT", "rotate", ".pdf,application/pdf", "pdf"),
  local("extract-images-pdf", "Extract Images PDF", "Render PDF pages as PNG images and download them as an archive.", "IMG", "pdf-to-image", ".pdf,application/pdf", "png", { note: "This exports rendered pages. It does not recover original embedded image files." }),
  local("pdf-watermark-remover", "PDF Watermark Remover", "Remove annotation-based watermarks and comments from a PDF.", "WM", "remove-annotations", ".pdf,application/pdf", "pdf", { note: "Only annotation-based watermarks are removed. Watermarks baked into page content or scanned images remain." }),
  remote("pdf-to-csv", "PDF to CSV", "Extract PDF tables into CSV files.", "CSV", "pdfco", ".pdf,application/pdf", "csv", "pdf", "/v1/pdf/convert/to/csv"),
  local("add-numbers-to-pdf", "Add Numbers to PDF", "Add page numbers to each page of a PDF.", "123", "add-page-numbers", ".pdf,application/pdf", "pdf"),
  local("add-watermark", "Add Watermark", "Stamp text across each PDF page.", "WM", "add-watermark", ".pdf,application/pdf", "pdf"),
  local("images-to-pdf", "Images to PDF", "Combine JPG and PNG images into one PDF.", "IMG", "images-to-pdf", ".jpg,.jpeg,.png,image/jpeg,image/png", "pdf", { multiple: true }),
  remote("heic-to-pdf", "HEIC to PDF", "Convert a HEIC image to PDF.", "HEIC", "cloudconvert", ".heic,.heif,image/heic,image/heif", "pdf", "heic"),
  local("add-text-to-pdf", "Add Text to PDF", "Add custom text to a selected PDF page.", "TXT", "add-text", ".pdf,application/pdf", "pdf"),
  local("annotate-pdf", "Annotate PDF", "Add a visible note to a selected PDF page.", "ANN", "annotate", ".pdf,application/pdf", "pdf"),
  remote("tiff-to-pdf", "TIFF to PDF", "Convert a TIFF image to PDF.", "TIFF", "cloudconvert", ".tif,.tiff,image/tiff", "pdf", "tiff"),
  remote("mobi-to-pdf", "MOBI to PDF", "Convert a MOBI ebook to PDF.", "MOBI", "cloudconvert", ".mobi,application/x-mobipocket-ebook", "pdf", "mobi"),
  remote("pdf-to-mobi", "PDF to MOBI", "Convert a PDF document to MOBI.", "MOBI", "cloudconvert", ".pdf,application/pdf", "mobi", "pdf"),
  remote("pdf-to-tiff", "PDF to TIFF", "Convert PDF pages to TIFF images.", "TIFF", "cloudconvert", ".pdf,application/pdf", "tiff", "pdf"),
  remote("azw3-to-pdf", "AZW3 to PDF", "Convert an AZW3 ebook to PDF.", "AZW3", "cloudconvert", ".azw3,application/vnd.amazon.ebook", "pdf", "azw3"),
  remote("webp-to-pdf", "WEBP to PDF", "Convert a WEBP image to PDF.", "WEBP", "cloudconvert", ".webp,image/webp", "pdf", "webp"),
  remote("pdf-to-azw3", "PDF to AZW3", "Convert a PDF document to AZW3.", "AZW3", "cloudconvert", ".pdf,application/pdf", "azw3", "pdf"),
  remote("ms-outlook-to-pdf", "MS Outlook to PDF", "Convert MSG or EML email files to PDF.", "MSG", "pdfco", ".msg,.eml,application/vnd.ms-outlook,message/rfc822", "pdf", "msg", "/v1/pdf/convert/from/email"),
  remote("pdf-to-text", "PDF to Text", "Convert PDF text and scanned pages into a plain text file with OCR.", "TXT", "pdfco", ".pdf,application/pdf", "txt", "pdf", "/v1/pdf/convert/to/text"),
  remote("gif-to-pdf", "GIF to PDF", "Convert a GIF image to PDF.", "GIF", "cloudconvert", ".gif,image/gif", "pdf", "gif"),
  remote("eps-to-pdf", "EPS to PDF", "Convert EPS artwork to PDF.", "EPS", "cloudconvert", ".eps,application/postscript", "pdf", "eps"),
];

export const pdfToolMap = new Map(pdfTools.map((tool) => [tool.slug, tool]));

export function getPdfTool(slug: string) {
  return pdfToolMap.get(slug);
}

export const MAX_FILE_BYTES = 50 * 1024 * 1024;
export const MAX_PDF_PAGES = 100;
