import { Routes, Route } from "react-router-dom";
import SkipLink from "@/components/skip-link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import HomePage from "@/pages/HomePage";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased">
      <SkipLink />
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  );
}
