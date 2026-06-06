import { AdBanner } from "@/components/home/AdBanner";
import { CategoryTabs } from "@/components/home/CategoryTabs";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { LatestTools } from "@/components/home/LatestTools";
import { PopularTools } from "@/components/home/PopularTools";
import { ScenarioSection } from "@/components/home/ScenarioSection";
import { ToolMatrix } from "@/components/home/ToolMatrix";
import { TopBar } from "@/components/home/TopBar";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <TopBar />
      <Header />
      <HeroSection />
      <CategoryTabs />
      <PopularTools />
      <AdBanner />
      <ToolMatrix />
      <LatestTools />
      <ScenarioSection />
      <Footer />
    </main>
  );
}
