export type ImageOperation = "compress" | "resize" | "crop" | "convert" | "grayscale" | "flip" | "pixelate" | "circle" | "border" | "text" | "combine" | "metadata" | "rotate" | "filter" | "square" | "preset-resize" | "meme" | "watermark" | "transparent" | "colors";
type ImageBase = { slug: string; name: string; description: string; icon: string; accept?: string; popular?: boolean };
export type ImageToolDefinition = ImageBase & (
  | { provider: "local"; operation: ImageOperation; outputFormat: "jpg" | "png" | "webp" | "json"; multiple?: boolean; effect?: "sepia" | "invert" | "blur" | "brightness" | "contrast" | "saturation" | "sharpen"; angle?: 90 | -90; presetWidth?: number; presetHeight?: number }
  | { provider: "cloudconvert"; accept: string; inputFormat: string; outputFormat: string }
);

const local = (slug: string, name: string, description: string, icon: string, operation: ImageOperation, outputFormat: "jpg" | "png" | "webp" | "json", extra: Partial<Extract<ImageToolDefinition, { provider: "local" }>> = {}): ImageToolDefinition => ({ slug, name, description, icon, provider: "local", operation, outputFormat, ...extra });
const remote = (input: string, output: string, labelInput = input.toUpperCase(), labelOutput = output.toUpperCase()): ImageToolDefinition => ({ slug: `image-${input}-to-${output}`, name: `${labelInput} to ${labelOutput}`, description: `Convert a ${labelInput} image to ${labelOutput}.`, icon: labelOutput, provider: "cloudconvert", accept: `.${input}`, inputFormat: input, outputFormat: output });

export const imageTools: ImageToolDefinition[] = [
  local("image-compress", "Compress Image Size", "Reduce JPG, PNG, or WEBP file size in your browser.", "ZIP", "compress", "jpg", { popular: true }),
  local("image-resize", "Resize Image Dimensions", "Resize an image to exact pixel dimensions.", "SIZE", "resize", "png", { popular: true }),
  local("image-crop", "Crop Image", "Crop an image using precise edge offsets.", "CROP", "crop", "png", { popular: true }),
  local("image-png-to-jpg", "PNG to JPG", "Convert a PNG image to JPG.", "JPG", "convert", "jpg", { accept: ".png,image/png" }),
  local("image-jpg-to-png", "JPG to PNG", "Convert a JPG image to PNG.", "PNG", "convert", "png", { accept: ".jpg,.jpeg,image/jpeg" }),
  local("image-webp-to-png", "WEBP to PNG", "Convert a WEBP image to PNG.", "PNG", "convert", "png", { accept: ".webp,image/webp" }),
  local("image-png-to-webp", "PNG to WEBP", "Convert a PNG image to WEBP.", "WEBP", "convert", "webp", { accept: ".png,image/png" }),
  local("image-jpg-to-webp", "JPG to WEBP", "Convert a JPG image to WEBP.", "WEBP", "convert", "webp", { accept: ".jpg,.jpeg,image/jpeg" }),
  local("image-grayscale", "Black & White", "Turn a color photo into a grayscale image.", "B&W", "grayscale", "png"),
  local("image-flip", "Flip Image", "Flip an image horizontally or vertically.", "FLIP", "flip", "png"),
  local("image-pixelate", "Pixelate Image", "Apply an adjustable pixel effect to an image.", "PIX", "pixelate", "png"),
  local("image-crop-circle", "Make Round Image", "Create a transparent circular profile image.", "ROUND", "circle", "png"),
  local("image-border", "Add Border to Image", "Add a custom border around an image.", "BOX", "border", "png"),
  local("image-text-to-image", "Add Text to an Image", "Place custom text over an image.", "TEXT", "text", "png"),
  local("image-combine-maker", "Combine Images", "Join multiple images horizontally or vertically.", "JOIN", "combine", "png", { multiple: true }),
  local("image-metadata", "View Metadata", "Inspect image dimensions, type, size, and modification date.", "INFO", "metadata", "json"),
  local("image-rotate-right", "Rotate Image Right", "Rotate an image 90 degrees clockwise.", "R90", "rotate", "png", { angle: 90 }),
  local("image-rotate-left", "Rotate Image Left", "Rotate an image 90 degrees counterclockwise.", "L90", "rotate", "png", { angle: -90 }),
  local("image-sepia", "Sepia Image", "Apply a warm sepia effect to an image.", "SEP", "filter", "png", { effect: "sepia" }),
  local("image-invert", "Invert Image Colors", "Invert every color in an image.", "INV", "filter", "png", { effect: "invert" }),
  local("image-blur", "Blur Image", "Apply an adjustable blur effect.", "BLUR", "filter", "png", { effect: "blur" }),
  local("image-brightness", "Adjust Brightness", "Make an image lighter or darker.", "SUN", "filter", "png", { effect: "brightness" }),
  local("image-contrast", "Adjust Contrast", "Increase or reduce image contrast.", "CON", "filter", "png", { effect: "contrast" }),
  local("image-saturation", "Adjust Saturation", "Increase or reduce color intensity.", "SAT", "filter", "png", { effect: "saturation" }),
  local("image-sharpen", "Sharpen Image", "Increase local contrast for a sharper appearance.", "SHARP", "filter", "png", { effect: "sharpen" }),
  local("image-square-crop", "Square Image Crop", "Crop the center of an image into a square.", "1:1", "square", "png"),
  local("image-profile-picture", "Profile Picture Maker", "Create a 512 by 512 square profile image.", "AVATAR", "preset-resize", "png", { presetWidth: 512, presetHeight: 512 }),
  local("image-thumbnail-maker", "Thumbnail Maker", "Resize an image to 1280 by 720.", "THUMB", "preset-resize", "jpg", { presetWidth: 1280, presetHeight: 720 }),
  local("image-favicon-maker", "Favicon Maker", "Create a crisp 64 by 64 PNG favicon source.", "ICON", "preset-resize", "png", { presetWidth: 64, presetHeight: 64 }),
  local("image-instagram-square", "Instagram Square Resize", "Resize and crop an image to 1080 by 1080.", "IG", "preset-resize", "jpg", { presetWidth: 1080, presetHeight: 1080 }),
  local("image-meme-maker", "Meme Maker", "Add top and bottom captions to an image.", "MEME", "meme", "jpg"),
  local("image-watermark", "Watermark Image", "Add a repeated text watermark to an image.", "WM", "watermark", "png"),
  local("image-transparent-color", "Make Color Transparent", "Remove pixels matching a selected background color.", "TRANS", "transparent", "png"),
  local("image-color-palette", "Image Color Palette", "Extract a compact color palette from an image.", "COLOR", "colors", "json"),
  local("image-webp-to-jpg", "WEBP to JPG", "Convert a WEBP image to JPG.", "JPG", "convert", "jpg", { accept: ".webp,image/webp" }),
  remote("heic", "jpg"), remote("heic", "png"), remote("heic", "webp"),
  remote("jpg", "heic"), remote("png", "heic"), remote("webp", "heic"),
  remote("tiff", "jpg"), remote("tiff", "png"), remote("tiff", "webp"),
  remote("jpg", "tiff"), remote("png", "tiff"), remote("webp", "tiff"),
  remote("avif", "jpg"), remote("avif", "png"), remote("avif", "webp"),
  remote("jpg", "avif"), remote("png", "avif"), remote("webp", "avif"),
  remote("bmp", "jpg"), remote("bmp", "png"), remote("bmp", "webp"),
  remote("jpg", "bmp"), remote("png", "bmp"), remote("webp", "bmp"),
  remote("gif", "jpg"), remote("gif", "png"), remote("gif", "webp"),
  remote("jpg", "gif"), remote("png", "gif"), remote("webp", "gif"),
  remote("svg", "jpg"), remote("svg", "png"), remote("svg", "webp"),
  remote("ico", "jpg"), remote("ico", "png"), remote("jpg", "ico"), remote("png", "ico"),
  remote("psd", "jpg"), remote("psd", "png"),
];

export const imageToolMap = new Map(imageTools.map((tool) => [tool.slug, tool]));
export const getImageTool = (slug: string) => imageToolMap.get(slug);
