import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import PlatformPage from "./pages/PlatformPage";
import CatalogPage from "./pages/CatalogPage";
import ArchitecturePage from "./pages/ArchitecturePage";
import ComposerPage from "./pages/ComposerPage";
import GuidesPage from "./pages/GuidesPage";
import ClaimsPage from "./pages/ClaimsPage";
import UpdatesPage from "./pages/UpdatesPage";
import CareersPage from "./pages/CareersPage";
import CommunityPage from "./pages/CommunityPage";
import PrivacyTermsPage from "./pages/PrivacyTermsPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Default Route */}
          <Route index element={<HomePage />} />
          
          {/* Main Pages */}
          <Route path="platform" element={<PlatformPage />} />
          
          {/* Packages Catalog with deep-linking support */}
          <Route path="packages" element={<CatalogPage />} />
          <Route path="packages/:packageName" element={<CatalogPage />} />
          
          <Route path="architecture" element={<ArchitecturePage />} />
          <Route path="composer" element={<ComposerPage />} />
          
          {/* Guides / Docs with deep-linking support */}
          <Route path="guides" element={<GuidesPage />} />
          <Route path="guides/:guideId" element={<GuidesPage />} />
          
          <Route path="claims" element={<ClaimsPage />} />
          
          {/* Updates with deep-linking support */}
          <Route path="updates" element={<UpdatesPage />} />
          <Route path="updates/:postId" element={<UpdatesPage />} />
          
          {/* Careers with deep-linking support */}
          <Route path="careers" element={<CareersPage />} />
          <Route path="careers/:roleId" element={<CareersPage />} />
          
          <Route path="community" element={<CommunityPage />} />
          <Route path="privacy-terms" element={<PrivacyTermsPage />} />
          
          {/* Fallback routing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}
