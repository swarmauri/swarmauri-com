import React from "react";
import { Link } from "react-router-dom";
import { SDK_METADATA } from "../data/packages";

export default function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-zinc-900 text-zinc-400 py-12 border-t border-zinc-800 relative z-10" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand block */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded bg-white text-zinc-950 flex items-center justify-center font-mono font-black text-sm">
                S
              </div>
              <span className="font-sans font-bold text-white text-md tracking-tight">swarmauri</span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-400 max-w-sm">
              Swarmauri is composable intelligence infrastructure for typed, pluggable Python systems. Build highly secure, decoupled AI agents and computational architectures from small independently installable package modules.
            </p>
            <div className="text-[11px] text-zinc-500 font-mono space-y-1">
              <div>Monorepo active workspace: {SDK_METADATA.totalWorkspaceMembers} members</div>
              <div>Indexed package catalog: {SDK_METADATA.totalIndexedRecords} records</div>
              <div>SDK Environment Target: Python {SDK_METADATA.pythonSupport}</div>
            </div>
          </div>

          {/* Column 1: Product */}
          <div>
            <h3 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Product</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/platform" onClick={handleScrollTop} className="hover:text-white transition-colors">
                  Platform Info
                </Link>
              </li>
              <li>
                <Link to="/architecture" onClick={handleScrollTop} className="hover:text-white transition-colors">
                  Layered Architecture
                </Link>
              </li>
              <li>
                <Link to="/packages" onClick={handleScrollTop} className="hover:text-white transition-colors">
                  Package Catalog
                </Link>
              </li>
              <li>
                <Link to="/claims" onClick={handleScrollTop} className="hover:text-white transition-colors">
                  Claims Matrix
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Developers */}
          <div>
            <h3 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Developers</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/guides" onClick={handleScrollTop} className="hover:text-white transition-colors">
                  SDK Guides & Docs
                </Link>
              </li>
              <li>
                <Link to="/docs" onClick={handleScrollTop} className="hover:text-white transition-colors">
                  Legacy Docs Overview
                </Link>
              </li>
              <li>
                <Link to="/faq" onClick={handleScrollTop} className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <a href="https://github.com/swarmauri/swarmauri-sdk" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center space-x-1">
                  <span>GitHub Source</span>
                </a>
              </li>
              <li>
                <Link to="/composer" onClick={handleScrollTop} className="hover:text-white transition-colors">
                  Workflow Composer
                </Link>
              </li>
              <li>
                <Link to="/community" onClick={handleScrollTop} className="hover:text-white transition-colors">
                  Community Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Company</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" onClick={handleScrollTop} className="hover:text-white transition-colors">
                  About Swarmauri
                </Link>
              </li>
              <li>
                <Link to="/careers" onClick={handleScrollTop} className="hover:text-white transition-colors">
                  Careers & Culture
                </Link>
              </li>
              <li>
                <Link to="/updates" onClick={handleScrollTop} className="hover:text-white transition-colors">
                  Updates & Releases
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={handleScrollTop} className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/solutions" onClick={handleScrollTop} className="hover:text-white transition-colors">
                  Solutions
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={handleScrollTop} className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Legal</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/privacy-policy" onClick={handleScrollTop} className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" onClick={handleScrollTop} className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500">
          <div>
            &copy; 2026 Swarmauri Open-Source Project. All rights reserved. Composable Python SDK architecture.
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span className="flex items-center space-x-1 text-green-500">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold">SWARMAURI PACKAGE - {SDK_METADATA.version}</span>
            </span>
            <Link to="/privacy-policy" onClick={handleScrollTop} className="hover:text-zinc-300">Privacy</Link>
            <Link to="/terms-of-service" onClick={handleScrollTop} className="hover:text-zinc-300">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
