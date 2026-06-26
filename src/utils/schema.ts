import { techArticleNode, softwareSourceCodeNode, JsonLd } from "@mdwrk/structured-data";

export interface TechArticleOptions {
  id: string;
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dependencies?: string;
  proficiencyLevel?: string;
  authorName?: string;
  publisherName?: string;
}

export interface SoftwareSourceCodeOptions {
  id: string;
  name: string;
  description: string;
  codeRepository: string;
  programmingLanguage?: string;
  runtimePlatform: string;
  softwareVersion: string;
  license?: string;
  dependencies?: string;
  keywords?: string[];
}

export interface ProductCollectionItem {
  id: string;
  name: string;
  description: string;
  version: string;
}

export interface ProductCollectionOptions {
  id: string;
  name: string;
  description: string;
  url: string;
  items: ProductCollectionItem[];
}

/**
 * Generates a type-safe TechArticle JSON-LD object.
 */
export function generateTechArticleSchema(options: TechArticleOptions): JsonLd {
  return techArticleNode({
    id: options.id,
    name: options.headline,
    headline: options.headline,
    description: options.description,
    url: options.url,
    datePublished: options.datePublished,
    author: {
      "@type": "Organization",
      "@id": "https://swarmauri.com/#organization",
      "name": options.authorName || "Swarmauri Core Team"
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://swarmauri.com/#organization",
      "name": options.publisherName || "Swarmauri"
    },
    dependencies: options.dependencies || "Python >=3.10",
    proficiencyLevel: options.proficiencyLevel || "Advanced"
  } as any);
}

/**
 * Generates a type-safe SoftwareSourceCode JSON-LD object containing all requested fields.
 */
export function generateSoftwareSourceCodeSchema(options: SoftwareSourceCodeOptions): JsonLd {
  return softwareSourceCodeNode({
    id: options.id,
    name: options.name,
    description: options.description,
    codeRepository: options.codeRepository,
    programmingLanguage: options.programmingLanguage || "Python",
    runtimePlatform: options.runtimePlatform,
    softwareVersion: options.softwareVersion,
    // Additional requested properties
    license: options.license || "https://spdx.org/licenses/MIT.html",
    targetProduct: {
      "@type": "SoftwareApplication",
      "name": "Swarmauri Platform",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "All"
    },
    dependencies: options.dependencies || "",
    keywords: (options.keywords || ["python", "ai-framework", "swarmauri-sdk"]).join(", "),
    publisher: { "@id": "https://swarmauri.com/#organization" },
    provider: { "@id": "https://swarmauri.com/#organization" }
  } as any);
}

/**
 * Generates a type-safe ProductCollection JSON-LD object.
 */
export function generateProductCollectionSchema(options: ProductCollectionOptions): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ProductCollection",
    "id": options.id,
    "name": options.name,
    "description": options.description,
    "url": options.url,
    "numberOfItems": options.items.length,
    "publisher": { "@id": "https://swarmauri.com/#organization" },
    "itemListElement": options.items.map((pkg, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "SoftwareApplication",
        "@id": `https://swarmauri.com/packages/${pkg.name.toLowerCase()}#app`,
        "name": pkg.name,
        "description": pkg.description,
        "softwareVersion": pkg.version
      }
    }))
  };
}
