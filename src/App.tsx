import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";

const PlatformPage = React.lazy(() => import("./pages/PlatformPage"));
const CatalogPage = React.lazy(() => import("./pages/CatalogPage"));
const ArchitecturePage = React.lazy(() => import("./pages/ArchitecturePage"));
const ComposerPage = React.lazy(() => import("./pages/ComposerPage"));
const GuidesPage = React.lazy(() => import("./pages/GuidesPage"));
const ClaimsPage = React.lazy(() => import("./pages/ClaimsPage"));
const UpdatesPage = React.lazy(() => import("./pages/UpdatesPage"));
const CareersPage = React.lazy(() => import("./pages/CareersPage"));
const CommunityPage = React.lazy(() => import("./pages/CommunityPage"));
const PrivacyPolicyPage = React.lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsOfServicePage = React.lazy(() => import("./pages/TermsOfServicePage"));
const ServicesPage = React.lazy(() => import("./pages/ServicesPage"));
const SolutionsPage = React.lazy(() => import("./pages/SolutionsPage"));
const LegacyPage = React.lazy(() => import("./pages/LegacyPage"));
const LegacyUpdateRedirect = React.lazy(() => import("./pages/LegacyUpdateRedirect"));
const FaqPage = React.lazy(() => import("./pages/FaqPage"));

export default function App() {
  return (
    <Router>
      <Suspense fallback={null}>
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
            <Route path="updates/:slugs" element={<UpdatesPage />} />

            {/* Careers with deep-linking support */}
            <Route path="careers" element={<CareersPage />} />
            <Route path="careers/:slug" element={<CareersPage />} />

            <Route path="community" element={<CommunityPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="solutions" element={<SolutionsPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="terms-of-service" element={<TermsOfServicePage />} />
            <Route path="privacy-terms" element={<Navigate to="/privacy-policy" replace />} />

            {/* Migrated legacy website pages */}
            <Route path="about" element={<LegacyPage />} />
            <Route path="contact" element={<LegacyPage />} />
            <Route path="docs" element={<LegacyPage />} />
            <Route path="faq" element={<FaqPage />} />
            <Route path="services-and-solutions" element={<Navigate to="/services" replace />} />

            {/* Previous WordPress post URL shape */}
            <Route path=":year/:month/:day/:legacySlug" element={<LegacyUpdateRedirect />} />

            {/* Fallback routing */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}
