export type ImageOperation =
  | "compress"
  | "resize"
  | "crop"
  | "convert"
  | "grayscale"
  | "flip"
  | "pixelate"
  | "circle"
  | "border"
  | "text"
  | "combine"
  | "metadata";

export type ImageToolDefinition = {
  slug: string;
  name: string;
  description: string;
  icon: string;
  operation: ImageOperation;
  outputFormat: "jpg" | "png" | "webp" | "json";
  accept?: string;
  multiple?: boolean;
  popular?: boolean;
};

export const imageTools: ImageToolDefinition[] = [
  { slug: "image-compress", name: "Compress Image Size", description: "Reduce JPG, PNG, or WEBP file size in your browser.", icon: "ZIP", operation: "compress", outputFormat: "jpg", popular: true },
  { slug: "image-resize", name: "Resize Image Dimensions", description: "Resize an image to exact pixel dimensions.", icon: "SIZE", operation: "resize", outputFormat: "png", popular: true },
  { slug: "image-crop", name: "Crop Image", description: "Crop an image using precise edge offsets.", icon: "CROP", operation: "crop", outputFormat: "png", popular: true },
  { slug: "image-png-to-jpg", name: "PNG to JPG", description: "Convert a PNG image to JPG.", icon: "JPG", operation: "convert", outputFormat: "jpg" },
  { slug: "image-jpg-to-png", name: "JPG to PNG", description: "Convert a JPG image to PNG.", icon: "PNG", operation: "convert", outputFormat: "png" },
  { slug: "image-webp-to-png", name: "WEBP to PNG", description: "Convert a WEBP image to PNG.", icon: "PNG", operation: "convert", outputFormat: "png" },
  { slug: "image-png-to-webp", name: "PNG to WEBP", description: "Convert a PNG image to WEBP.", icon: "WEBP", operation: "convert", outputFormat: "webp" },
  { slug: "image-jpg-to-webp", name: "JPG to WEBP", description: "Convert a JPG image to WEBP.", icon: "WEBP", operation: "convert", outputFormat: "webp" },
  { slug: "image-grayscale", name: "Black & White", description: "Turn a color photo into a grayscale image.", icon: "B&W", operation: "grayscale", outputFormat: "png" },
  { slug: "image-flip", name: "Flip Image", description: "Flip an image horizontally or vertically.", icon: "FLIP", operation: "flip", outputFormat: "png" },
  { slug: "image-pixelate", name: "Pixelate Image", description: "Apply an adjustable pixel effect to an image.", icon: "PIX", operation: "pixelate", outputFormat: "png" },
  { slug: "image-crop-circle", name: "Make Round Image", description: "Create a transparent circular profile image.", icon: "ROUND", operation: "circle", outputFormat: "png" },
  { slug: "image-border", name: "Add Border to Image", description: "Add a custom border around an image.", icon: "BOX", operation: "border", outputFormat: "png" },
  { slug: "image-text-to-image", name: "Add Text to an Image", description: "Place custom text over an image.", icon: "TEXT", operation: "text", outputFormat: "png" },
  { slug: "image-combine-maker", name: "Combine Images", description: "Join multiple images horizontally or vertically.", icon: "JOIN", operation: "combine", outputFormat: "png", multiple: true },
  { slug: "image-metadata", name: "View Metadata", description: "Inspect image dimensions, type, size, and modification date.", icon: "INFO", operation: "metadata", outputFormat: "json" },
];

export const imageToolMap = new Map(imageTools.map((tool) => [tool.slug, tool]));
export const getImageTool = (slug: string) => imageToolMap.get(slug);
