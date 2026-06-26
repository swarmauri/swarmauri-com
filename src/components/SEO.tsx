import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  canonical?: string;
  ogType?: "website" | "article" | "profile" | "job";
}

export default function SEO({
  title,
  description,
  keywords,
  image = "https://swarmauri.com/og-image.png",
  canonical,
  ogType = "website"
}: SEOProps) {
  useEffect(() => {
    // 1. Update Title
    const fullTitle = `${title} | Swarmauri Ecosystem`;
    document.title = fullTitle;

    // Helper to find or create a meta tag
    const setMetaTag = (attribute: "name" | "property", value: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${value}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Helper to find or create a link tag
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    // 2. Standard Meta Tags
    setMetaTag("name", "description", description);
    if (keywords && keywords.length > 0) {
      setMetaTag("name", "keywords", keywords.join(", "));
    } else {
      // Default keywords if none provided
      setMetaTag("name", "keywords", "swarmauri, python sdk, cryptography, modular ai, agent framework, vector store");
    }

    // 3. OpenGraph Tags
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:image", image);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:url", canonical || window.location.href);
    setMetaTag("property", "og:site_name", "Swarmauri");

    // 4. Twitter Card Tags
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", image);

    // 5. Canonical Link
    setLinkTag("canonical", canonical || window.location.href);

  }, [title, description, keywords, image, canonical, ogType]);

  return null; // This is a helper component that only updates the document head
}
