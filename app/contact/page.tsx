import type { Metadata } from "next";
import { StaticPageShell } from "@/components/site/StaticPageShell";
export const metadata: Metadata = { title: "Contact", description: "Contact Toolmomo for support, feedback, or partnership questions.", alternates: { canonical: "/contact" } };
export default function ContactPage() { return <StaticPageShell title="Contact Toolmomo" description="Tell us about a broken conversion, a feature request, or a privacy concern."><p>Email us at <a className="font-black text-[#ff5b34]" href="mailto:contact@toolmomo.com">contact@toolmomo.com</a>.</p><p className="mt-5">Include the tool name, browser, file type, and error message. Do not email confidential documents or passwords.</p></StaticPageShell>; }
