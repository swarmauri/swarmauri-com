import React from "react";

interface StructuredDataProps {
  data: Record<string, any> | Record<string, any>[] | null | undefined;
}

/**
 * Reusable component to inject JSON-LD structured data into the document head/body.
 * This is crucial for search engines (SEO), Answer Engines (AEO), and AI engines (AiEO)
 * to discover enriched rich snippets.
 */
export default function StructuredData({ data }: StructuredDataProps) {
  if (!data) return null;

  // If it's an array of nodes, we can serialize them or warp them in a Graph if not already wrapped
  const content = JSON.stringify(data, null, 2);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
