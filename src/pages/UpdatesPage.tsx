import React, { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { UPDATE_POSTS } from "../data/updates";
import { FolderOpen, ArrowLeft } from "lucide-react";
import { UpdatePost } from "../types";
import { blogPostingNode, breadcrumbListSchema } from "@mdwrk/structured-data";
import { generateTechArticleSchema } from "../utils/schema";
import StructuredData from "../components/StructuredData";
import UpdatePostCard from "../components/UpdatePostCard";
import SEO from "../components/SEO";

export default function UpdatesPage() {
  const { postId } = useParams<{ postId?: string }>();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(UPDATE_POSTS.map((post) => post.category)))],
    []
  );

  // Identify active post
  const activePost = useMemo(() => {
    if (!postId) return null;
    return UPDATE_POSTS.find((p) => p.id === postId) || null;
  }, [postId]);

  // Dynamically assign appropriate structured node type
  const makeArticleNode = (post: UpdatePost) => {
    const isTech = post.category === "Architecture Notes" || post.category === "Package Highlights";
    const commonProps = {
      id: `https://swarmauri.com/updates/${post.id}#article`,
      name: post.title,
      headline: post.title,
      description: post.summary,
      url: `https://swarmauri.com/updates/${post.id}`,
      datePublished: post.date,
      author: { id: "https://swarmauri.com#organization", name: "Swarmauri Core Team" },
      publisher: { id: "https://swarmauri.com#organization", name: "Swarmauri" }
    };

    if (isTech) {
      return generateTechArticleSchema({
        id: commonProps.id,
        headline: commonProps.headline,
        description: commonProps.description,
        url: commonProps.url,
        datePublished: commonProps.datePublished,
        dependencies: "Python >=3.10",
        proficiencyLevel: "Advanced"
      });
    } else {
      return blogPostingNode(commonProps);
    }
  };

  const structuredData = useMemo(() => {
    try {
      if (activePost) {
        const articleNode = makeArticleNode(activePost);
        const breadcrumbs = breadcrumbListSchema({
          id: `https://swarmauri.com/updates/${activePost.id}#breadcrumb`,
          items: [
            { label: "Home", href: "https://swarmauri.com" },
            { label: "Updates", href: "https://swarmauri.com/updates" },
            { label: activePost.title, href: `https://swarmauri.com/updates/${activePost.id}` }
          ]
        });
        return [articleNode, breadcrumbs];
      } else {
        const listNodes = UPDATE_POSTS.map(makeArticleNode);
        const breadcrumbs = breadcrumbListSchema({
          id: "https://swarmauri.com/updates#breadcrumb",
          items: [
            { label: "Home", href: "https://swarmauri.com" },
            { label: "Updates", href: "https://swarmauri.com/updates" }
          ]
        });
        return [...listNodes, breadcrumbs];
      }
    } catch (e) {
      console.error("Failed to build Updates structured data", e);
      return null;
    }
  }, [activePost]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    if (selectedCategory === "all") return UPDATE_POSTS;
    return UPDATE_POSTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="space-y-12 py-6" id="updates-container">
      {activePost ? (
        <SEO
          title={activePost.title}
          description={activePost.summary}
          keywords={[activePost.title, activePost.category, "swarmauri", "release logs", "python"]}
          ogType="article"
        />
      ) : (
        <SEO
          title="Ecosystem Updates"
          description="Stay updated with the latest release notes, package highlights, architecture logs, and guides from Swarmauri framework developers."
          keywords={["release logs", "changelog", "swarmauri news", "package highlights", "python modular framework"]}
        />
      )}
      {/* Blog & TechArticle JSON-LD */}
      <StructuredData data={structuredData} />

      {/* Page Header */}
      <div className="border-b border-zinc-200 pb-5">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 font-sans">
          Ecosystem Updates
        </h1>
        <p className="text-sm text-zinc-500 mt-1 max-w-2xl">
          Release logs, security alerts, and deep architectural tutorials from the Swarmauri core maintainers.
        </p>
      </div>

      {activePost ? (
        /* Blog Detail / Full view */
        <div className="bg-white border border-zinc-200 rounded-xl p-6 md:p-8 space-y-6 shadow-sm" id="post-detail-view">
          <Link
            to="/updates"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900 mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Updates</span>
          </Link>

          <div className="border-b border-zinc-100 pb-5 space-y-2">
            <div className="flex items-center space-x-2 text-xs text-zinc-400 font-mono">
              <span>{activePost.date}</span>
              <span>&bull;</span>
              <span className="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded border border-indigo-150 font-bold uppercase text-[9px]">
                {activePost.category}
              </span>
            </div>
            <h2 className="text-2xl font-bold font-sans text-zinc-950 leading-snug">{activePost.title}</h2>
          </div>

          <div className="prose prose-zinc max-w-none text-sm text-zinc-600 leading-relaxed space-y-4">
            <p className="font-medium text-zinc-800 text-base leading-relaxed bg-zinc-50 p-4 rounded-lg border border-zinc-200/50">
              {activePost.summary}
            </p>
            <div className="whitespace-pre-wrap pt-2">
              {activePost.content}
            </div>
          </div>
        </div>
      ) : (
        /* Updates list view with category filters */
        <div className="space-y-8">
          <div className="flex items-center justify-between flex-wrap gap-4 bg-zinc-50 border border-zinc-200 rounded-lg p-3">
            <div className="flex items-center space-x-2 text-xs text-zinc-600 font-medium">
              <FolderOpen className="w-4 h-4 text-zinc-400" />
              <span>Category Filters:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 text-xs rounded-full cursor-pointer transition-all border ${
                    selectedCategory === cat
                      ? "bg-zinc-900 border-zinc-950 text-white font-semibold"
                      : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                  }`}
                >
                  <span className="capitalize">{cat}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="updates-grid">
            {filteredPosts.map((post) => (
              <UpdatePostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
