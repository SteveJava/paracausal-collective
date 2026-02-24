import HeroSection from "@/components/HeroSection";
import EventsSection from "@/components/EventsSection";
import AboutSection from "@/components/AboutSection";

export default function Home() {
  return (
    <main className="pt-32">
      <HeroSection />
      <EventsSection />
      <AboutSection />
    </main>
  );
}