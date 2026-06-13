import type { Metadata } from "next";
import { StaticPageShell } from "@/components/site/StaticPageShell";

export const metadata: Metadata = { title: "Privacy Policy", description: "How Toolmomo handles files, analytics, advertising, cookies, and privacy choices.", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return <StaticPageShell title="Privacy Policy" description="We minimize data collection and clearly separate browser-only tools from secure conversion jobs.">
    <h2 className="text-xl font-black text-[#263244]">Browser processing</h2><p className="mt-3">Tools labeled Browser only process files on your device. Files are not uploaded to Toolmomo.</p>
    <h2 className="mt-7 text-xl font-black text-[#263244]">Remote conversions</h2><p className="mt-3">Complex conversions upload files to Toolmomo and the named provider, including PDF.co, CloudConvert, APIMart, OpenAI, or DeepL when applicable. Temporary input and result files are automatically deleted after one hour. We do not provide file history or permanent storage.</p>
    <h2 className="mt-7 text-xl font-black text-[#263244]">Advertising and analytics</h2><p className="mt-3">We use Google AdSense to display advertisements and Google Analytics to understand aggregate site usage. Depending on your region and choices, Google and its partners may use cookies, device identifiers, approximate location, and interaction data to provide, measure, or personalize ads and analytics.</p>
    <h2 className="mt-7 text-xl font-black text-[#263244]">Consent and privacy choices</h2><p className="mt-3">Where required, a Google-certified consent management platform asks for your choices before advertising or analytics storage is enabled. You can review or withdraw your choices using Cookie Settings in the site footer. Residents of applicable US states may also use the privacy choices shown by the consent platform.</p>
    <h2 className="mt-7 text-xl font-black text-[#263244]">Usage and security data</h2><p className="mt-3">We may process hashed IP-derived identifiers for rate limiting, basic security logs, tool success or error events, and Core Web Vitals. Analytics events do not contain uploaded file contents.</p>
    <h2 className="mt-7 text-xl font-black text-[#263244]">Sensitive files</h2><p className="mt-3">Do not upload files containing passwords, payment data, medical records, government identifiers, or confidential business information.</p>
  </StaticPageShell>;
}
