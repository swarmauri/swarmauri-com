import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { HelpCircle, AlertTriangle } from "lucide-react";
import { SDK_METADATA } from "../data/packageSummary";
import { GUIDE_TOPICS } from "../data/guides";
import { faqPageSchema, breadcrumbListSchema, howToNode } from "@mdwrk/structured-data";
import StructuredData from "../components/StructuredData";
import GuideListItem from "../components/GuideListItem";
import GuideViewer from "../components/GuideViewer";
import SEO from "../components/SEO";
import FaqQuestionAnswerList from "../components/uix/FaqQuestionAnswerList";
import { FAQ_ITEMS, FaqItem } from "../data/faq";
import { CANONICAL_TAXONOMY_KEYWORDS } from "../data/taxonomy";

export default function GuidesPage() {
  const { guideId } = useParams<{ guideId?: string }>();
  const [copiedText, setCopiedText] = useState("");

  const activeGuideId = guideId || "quickstart";

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(""), 2000);
  };

  const activeGuide = useMemo(() => {
    return GUIDE_TOPICS.find((g) => g.id === activeGuideId) || GUIDE_TOPICS[0];
  }, [activeGuideId]);

  const formattedFaqs = useMemo<FaqItem[]>(() => {
    if (activeGuide.faqs && activeGuide.faqs.length > 0) {
      return activeGuide.faqs.map((faq, index) => ({
        id: `${activeGuide.id}-faq-${index}`,
        category: "Docs",
        question: faq.question,
        answer: faq.answer,
      }));
    }
    return FAQ_ITEMS.slice(0, 3);
  }, [activeGuide]);

  const structuredData = useMemo(() => {
    try {
      const breadcrumbs = breadcrumbListSchema({
        id: `https://swarmauri.com/guides/${activeGuide.id}#breadcrumb`,
        items: [
          { label: "Home", href: "https://swarmauri.com" },
          { label: "Guides", href: "https://swarmauri.com/guides" },
          { label: activeGuide.title, href: `https://swarmauri.com/guides/${activeGuide.id}` }
        ]
      });

      const faqs = faqPageSchema({
        id: `https://swarmauri.com/guides/${activeGuide.id}#faq`,
        items: formattedFaqs.map((item) => ({
          question: item.question,
          answer: item.answer.replace(/`|\*\*|\[([^\]]+)\]\([^)]+\)/g, "$1")
        }))
      });

      // Construct a compliant HowTo schema for the guide
      const howTo = howToNode({
        id: `https://swarmauri.com/guides/${activeGuide.id}#howto`,
        name: activeGuide.title,
        description: activeGuide.description,
        steps: [
          {
            "@type": "HowToStep",
            "id": `https://swarmauri.com/guides/${activeGuide.id}#step1`,
            "name": "Examine Code Block",
            "text": "Inspect the provided sample code for " + activeGuide.title,
            "position": 1
          },
          {
            "@type": "HowToStep",
            "id": `https://swarmauri.com/guides/${activeGuide.id}#step2`,
            "name": "Review Integration Concept",
            "text": activeGuide.explanation,
            "position": 2
          }
        ],
        publisher: { "@id": "https://swarmauri.com/#organization" }
      } as any);

      return [breadcrumbs, faqs, howTo];
    } catch (e) {
      console.error("Failed to build FAQ/Guide structured data", e);
      return null;
    }
  }, [activeGuide, formattedFaqs]);

  return (
    <div className="space-y-12 py-6" id="guides-container">
      <SEO
        title={`${activeGuide.title} Guide`}
        description={activeGuide.description}
        keywords={[
          activeGuide.title,
          "guide",
          "documentation",
          "how-to",
          ...CANONICAL_TAXONOMY_KEYWORDS,
        ]}
      />
      {/* Guides & FAQs JSON-LD */}
      <StructuredData data={structuredData} />

      {/* Page Header */}
      <div className="border-b border-zinc-200 pb-5">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 font-sans">
          Developer Guides & API Reference
        </h1>
        <p className="text-sm text-zinc-500 mt-1 max-w-2xl">
          Learn how to compose, extend, and deploy Swarmauri packages under uniform contracts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Interactive Quick Navigation */}
        <div className="lg:col-span-4 space-y-4" id="guides-sidebar">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
            Available Guides ({GUIDE_TOPICS.length})
          </h3>
          <div className="flex flex-col space-y-2">
            {GUIDE_TOPICS.map((guide) => (
              <GuideListItem
                key={guide.id}
                guide={guide}
                isActive={guide.id === activeGuide.id}
              />
            ))}
          </div>
        </div>

        {/* Right Side: Active Guide Content Display */}
        <div className="lg:col-span-8 space-y-6">
          <GuideViewer
            activeGuide={activeGuide}
            copiedText={copiedText}
            copyToClipboard={copyToClipboard}
          />

          {/* Quick FAQ section for SEO indexation */}
          <section className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 space-y-4" id="faq-section">
            <h3 className="font-sans font-bold text-sm text-zinc-900 uppercase tracking-wider flex items-center space-x-1.5">
              <HelpCircle className="w-4 h-4 text-zinc-500" />
              <span>Frequently Asked Questions</span>
            </h3>

            <FaqQuestionAnswerList items={formattedFaqs} />
          </section>
        </div>
      </div>
    </div>
  );
}
