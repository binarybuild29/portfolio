import { useState } from "react";
import "./cake-demo.css";
import CakeNavbar from "./components/CakeNavbar";
import CakeHero from "./components/CakeHero";
import CakeSlider from "./components/CakeSlider";
import CakeDetailView from "./components/CakeDetailView";
import AboutSection from "./components/AboutSection";
import GallerySection from "./components/GallerySection";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactSection from "./components/ContactSection";
import CakeFooter from "./components/CakeFooter";

/**
 * Gateau Studio — a fictional bakery demo used as a BinaryBuilds portfolio
 * sample project. Fully self-contained: its own header/footer, its own
 * scoped dark/gold theme (cake-demo.css), no shared state with the main
 * site. Mounted at /portfolio/cake-demo.
 */
export default function CakeDemoPage() {
  const [selectedCakeId, setSelectedCakeId] = useState<string | null>(null);

  return (
    <div className="cake-demo min-h-screen antialiased">
      <CakeNavbar />
      <main id="main-content">
        <CakeHero />
        <CakeSlider onSelectCake={setSelectedCakeId} />
        <AboutSection />
        <GallerySection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <CakeFooter />

      {selectedCakeId && (
        <CakeDetailView
          cakeId={selectedCakeId}
          onClose={() => setSelectedCakeId(null)}
        />
      )}
    </div>
  );
}
