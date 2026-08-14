import { Routes, Route } from "react-router-dom";
import SkipLink from "@/components/skip-link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import HomePage from "@/pages/HomePage";
import CakeDemoPage from "@/pages/cake-demo/CakeDemoPage";

function MainSiteLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased">
      <SkipLink />
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <HomePage />
      </main>
      <SiteFooter />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainSiteLayout />} />
      <Route path="/portfolio/cake-demo" element={<CakeDemoPage />} />
    </Routes>
  );
}
