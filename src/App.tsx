import { useMemo } from "react";
import siteContent, { articles as importedArticles } from "../packages/site-content-pack/src/index";
import type { ImportedArticle } from "../packages/site-content-pack/src/articles.generated";

const root = siteContent.product.canonicalUrl.replace(/\/+$/, "");

const normalizePath = (value: string) => {
  const path = value === "" ? "/" : value.split(/[?#]/)[0] ?? "/";
  if (path === "/" || path === "") return "/";
  return `/${path.replace(/^\/+|\/+$/g, "")}/`;
};

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/&amp;/g, "&").replace(/&#8217;/g, "'").replace(/\s+/g, " ").trim();
}

function formatDate(value: string) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(value));
}

function excerptText(article: ImportedArticle) {
  const value = stripHtml(article.excerptHtml || article.contentHtml);
  return value.length > 185 ? `${value.slice(0, 182).trim()}...` : value;
}

const currentYear = new Date().getUTCFullYear();
const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
  { label: "Privacy", href: "/privacy-policy/" },
  ...(siteContent.footer?.links ?? []),
].filter((link, index, array) => array.findIndex((candidate) => candidate.href === link.href) === index);

function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="site-brand" href="/" aria-label="Swarmauri home">
          <img src="/assets/brand/swarmauri/swarmauri-brand-horizontal.png" alt="Swarmauri" />
        </a>
        <nav aria-label="Primary navigation">
          <a href="https://github.com/swarmauri/swarmauri-sdk">GitHub</a>
          <a href="https://docs.swarmauri.com">Docs</a>
          <a href="/contact/">Contact</a>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <div className="footer-copy">
          <p>{siteContent.footer?.note || "Swarmauri builds composable Python infrastructure for agentic and AI-native software."}</p>
          <small>Copyright {currentYear} {siteContent.product.name}. All rights reserved.</small>
        </div>
        <div className="footer-links">
          {footerLinks.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}

function HomePage() {
  const articles = useMemo(
    () =>
      [...importedArticles]
        .filter((article) => article.wpType === "post")
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5),
    []
  );

  return (
    <SiteChrome>
      <section className="home-hero" aria-labelledby="hero-title">
        <p className="eyebrow">Composable AI systems</p>
        <h1 id="hero-title">Composable intelligence infrastructure.</h1>
        <p>
          Open source packages, SDK primitives, and governed workflows for teams building AI systems that need to be
          inspectable, extensible, and practical to ship.
        </p>
        <div className="hero-actions">
          <a href="https://docs.swarmauri.com">Read the docs</a>
          <a href="https://github.com/swarmauri/swarmauri-sdk">View GitHub</a>
        </div>
      </section>

      <section className="article-list" aria-labelledby="articles-title">
        <div className="section-heading">
          <p className="eyebrow">Notes and releases</p>
          <h2 id="articles-title">Latest from Swarmauri</h2>
        </div>
        <div className="articles">
          {articles.map((article) => (
            <a className="article-link" key={article.legacyPath} href={article.legacyPath}>
              <span>{formatDate(article.date)}</span>
              <strong>{stripHtml(article.title)}</strong>
              <p>{excerptText(article)}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="compact-links" aria-label="Project links">
        <a href="https://docs.swarmauri.com">Docs</a>
        <a href="/2024/04/08/swarmauri-sdk/">SDK overview</a>
        <a href="/services-and-solutions/">Services and solutions</a>
        <a href="/about/">About</a>
      </section>
    </SiteChrome>
  );
}

function ArticlePage({ article }: { article: ImportedArticle }) {
  return (
    <SiteChrome>
      <article className="article-page">
        <nav className="article-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Swarmauri</a>
          <span>/</span>
          <span>{stripHtml(article.title)}</span>
        </nav>
        <header className="article-hero">
          <p className="article-kicker">{formatDate(article.date)}</p>
          <h1 dangerouslySetInnerHTML={{ __html: article.title }} />
          {article.excerptHtml ? <div className="article-excerpt" dangerouslySetInnerHTML={{ __html: article.excerptHtml }} /> : null}
          <p className="article-meta">
            {article.authorName ? <>By {article.authorLink ? <a href={article.authorLink}>{article.authorName}</a> : article.authorName} / </> : null}
            {[...article.categories, ...article.tags].slice(0, 8).join(" / ")}
          </p>
        </header>
        {article.featuredImage ? <img className="article-image" src={article.featuredImage} alt="" /> : null}
        <section className="article-content" dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": article.wpType === "page" ? "WebPage" : "Article",
              headline: stripHtml(article.title),
              datePublished: article.date,
              dateModified: article.modified,
              mainEntityOfPage: article.canonicalUrl || `${root}${normalizePath(article.legacyPath)}`,
              image: article.featuredImage ? [article.featuredImage] : undefined
            })
          }}
        />
      </article>
    </SiteChrome>
  );
}

export function App() {
  const path = typeof window === "undefined" ? "/" : normalizePath(window.location.pathname);
  const article = importedArticles.find((candidate) => normalizePath(candidate.legacyPath) === path) ?? null;

  if (path === "/") return <HomePage />;
  if (article) return <ArticlePage article={article} />;

  return (
    <SiteChrome>
      <section className="not-found">
        <p className="eyebrow">Not found</p>
        <h1>That page is not available.</h1>
        <a href="/">Return home</a>
      </section>
    </SiteChrome>
  );
}
