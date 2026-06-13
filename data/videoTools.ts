export type VideoToolDefinition = { slug: string; name: string; description: string; icon: string; provider: "cloudconvert"; accept: string; inputFormat: string; outputFormat: string; popular?: boolean };
export const videoTools: VideoToolDefinition[] = [
  { slug: "video-mp4-to-mp3", name: "MP4 to MP3", description: "Extract MP3 audio from an MP4 video.", icon: "MP3", provider: "cloudconvert", accept: ".mp4,video/mp4", inputFormat: "mp4", outputFormat: "mp3", popular: true },
  { slug: "video-to-gif", name: "Video to GIF", description: "Convert an MP4 video into an animated GIF.", icon: "GIF", provider: "cloudconvert", accept: ".mp4,video/mp4", inputFormat: "mp4", outputFormat: "gif", popular: true },
  { slug: "video-mov-to-mp4", name: "MOV to MP4", description: "Convert a MOV video to MP4.", icon: "MP4", provider: "cloudconvert", accept: ".mov,video/quicktime", inputFormat: "mov", outputFormat: "mp4" },
  { slug: "video-webm-to-mp4", name: "WEBM to MP4", description: "Convert a WEBM video to MP4.", icon: "MP4", provider: "cloudconvert", accept: ".webm,video/webm", inputFormat: "webm", outputFormat: "mp4" },
  { slug: "video-mkv-to-mp4", name: "MKV to MP4", description: "Convert an MKV video to MP4.", icon: "MP4", provider: "cloudconvert", accept: ".mkv,video/x-matroska", inputFormat: "mkv", outputFormat: "mp4" },
  { slug: "video-avi-to-mp4", name: "AVI to MP4", description: "Convert an AVI video to MP4.", icon: "MP4", provider: "cloudconvert", accept: ".avi,video/x-msvideo", inputFormat: "avi", outputFormat: "mp4" },
  { slug: "video-mp4-to-webm", name: "MP4 to WEBM", description: "Convert an MP4 video to WEBM.", icon: "WEBM", provider: "cloudconvert", accept: ".mp4,video/mp4", inputFormat: "mp4", outputFormat: "webm" },
  { slug: "video-mp4-to-mov", name: "MP4 to MOV", description: "Convert an MP4 video to MOV.", icon: "MOV", provider: "cloudconvert", accept: ".mp4,video/mp4", inputFormat: "mp4", outputFormat: "mov" },
  { slug: "video-mov-to-mp3", name: "MOV to MP3", description: "Extract MP3 audio from a MOV video.", icon: "MP3", provider: "cloudconvert", accept: ".mov,video/quicktime", inputFormat: "mov", outputFormat: "mp3" },
  { slug: "video-mp4-to-wav", name: "MP4 to WAV", description: "Extract WAV audio from an MP4 video.", icon: "WAV", provider: "cloudconvert", accept: ".mp4,video/mp4", inputFormat: "mp4", outputFormat: "wav" },
  { slug: "video-m4a-to-mp3", name: "M4A to MP3", description: "Convert M4A audio to MP3.", icon: "MP3", provider: "cloudconvert", accept: ".m4a,audio/mp4", inputFormat: "m4a", outputFormat: "mp3" },
  { slug: "video-aac-to-mp3", name: "AAC to MP3", description: "Convert AAC audio to MP3.", icon: "MP3", provider: "cloudconvert", accept: ".aac,audio/aac", inputFormat: "aac", outputFormat: "mp3" },
];
export const videoToolMap = new Map(videoTools.map((tool) => [tool.slug, tool]));
export const getVideoTool = (slug: string) => videoToolMap.get(slug);
