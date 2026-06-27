import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Github, Layers, Package, Cpu, BookOpen, FileText, Users } from "lucide-react";
import { SDK_METADATA } from "../data/packageSummary";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: "platform", label: "Framework", icon: Cpu },
    { id: "packages", label: "Packages", icon: Package },
    { id: "architecture", label: "Architecture", icon: Layers },
    { id: "composer", label: "Composer", icon: Cpu },
    { id: "guides", label: "Docs/Guides", icon: BookOpen },
    { id: "updates", label: "Updates", icon: FileText },
    { id: "community", label: "Community", icon: Users },
  ];

  const currentPath = location.pathname;

  const checkIsActive = (id: string) => {
    if (id === "") {
      return currentPath === "/" || currentPath === "/home";
    }
    return currentPath === `/${id}` || currentPath.startsWith(`/${id}/`);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-200/80 shadow-sm" id="main-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Platform Positioning */}
          <Link to="/" className="flex items-center space-x-3 cursor-pointer" id="logo-link">
            <div className="w-9 h-9 rounded-lg bg-zinc-900 flex items-center justify-center text-white font-mono font-bold text-lg tracking-wider" id="logo-badge">
              S
            </div>
            <div>
              <span className="font-sans font-bold text-lg tracking-tight text-zinc-900">swarmauri</span>
              <span className="ml-2 font-mono text-[10px] bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded border border-zinc-200">
                v{SDK_METADATA.version}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1" id="desktop-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = checkIsActive(item.id);
              return (
                <Link
                  key={item.id}
                  id={`nav-${item.id}`}
                  to={`/${item.id}`}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-md text-xs font-medium tracking-tight transition-colors duration-150 ${
                    isActive
                      ? "bg-zinc-900 text-white"
                      : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* External Action Links (GitHub & Docs) */}
          <div className="hidden lg:flex items-center space-x-3" id="desktop-actions">
            <a
              href="https://github.com/swarmauri/swarmauri-sdk"
              target="_blank"
              rel="noreferrer"
              id="github-link-header"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md border border-zinc-200 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 text-xs font-medium transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <Link
              to="/guides"
              id="header-cta-install"
              className="px-3.5 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold tracking-tight transition-all duration-150 shadow-sm"
            >
              Install SDK
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center space-x-2" id="mobile-controls">
            <Link
              to="/guides"
              className="px-2.5 py-1 rounded bg-indigo-600 text-white text-[11px] font-semibold"
            >
              Install
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              className="p-2 rounded-md text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-zinc-200 py-3 px-4 space-y-1 shadow-inner" id="mobile-menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = checkIsActive(item.id);
            return (
              <Link
                key={item.id}
                id={`mobile-nav-${item.id}`}
                to={`/${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-2.5 w-full px-3 py-2 rounded-md text-sm font-medium tracking-tight transition-colors ${
                  isActive
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className="pt-2 border-t border-zinc-100 flex flex-col space-y-2 px-3">
            <a
              href="https://github.com/swarmauri/swarmauri-sdk"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center space-x-1.5 py-2 rounded-md border border-zinc-200 text-zinc-700 text-xs font-medium"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
