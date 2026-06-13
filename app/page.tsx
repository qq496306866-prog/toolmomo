import type { Metadata } from "next";
import { PdfHomePage } from "@/components/pdf/PdfHomePage";

export const metadata: Metadata = {
  title: "Toolmomo - Free Online PDF, Image, Write, Video and File Tools",
  description:
    "Toolmomo provides free online PDF, image, writing, video and file tools for everyday work.",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      "x-default": "/",
    },
  },
};

export default PdfHomePage;
