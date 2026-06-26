# Unified Swarmauri Company Portfolio Brief

Prepared: 2026-06-26  
Audience: copywriting, technical writing, developer relations, website/product developers  
Scope: swarmauri.com, docs.swarmauri.com, product portfolio app, updates, pages, careers, package catalog, and SDK-facing messaging

## Executive Summary

Swarmauri should be presented as a unified open-source company and product ecosystem for composable intelligence infrastructure. The core offer is not just "an AI SDK"; it is a typed, package-oriented Python platform for building agentic, AI-native, security-aware, and integration-heavy software from small independently installable components.

The current public ecosystem is split across:

- `swarmauri.com`: a compact MdWrk lander with legacy imported WordPress articles and simple links to GitHub/docs.
- `docs.swarmauri.com`: a Material for MkDocs documentation site with large API navigation and hand-written guides that need cleanup.
- `swarmauri-sdk`: the authoritative monorepo for package architecture, package counts, package metadata, installation commands, and public developer claims.
- `swarmauri-sdk-portfolio (3).zip`: an existing richer React portfolio app with package catalog, architecture, composer, guide, claims, sitemap, and structured-data patterns.

Recommended product direction: keep `swarmauri.com` as the canonical company and portfolio website, keep `docs.swarmauri.com` as the canonical docs/reference site, and adopt the existing portfolio app from the zip as the package and architecture portal. The work is to reconcile and harden that app, not reinvent it: wire its catalog and structured-data surfaces to live SDK metadata, align it visually with the root/docs sites, and host it either under `swarmauri.com/packages/` or as `packages.swarmauri.com` with canonical links back to the root site. Everything should share one visual system, one navigation model, one claims policy, and one package-data authority.

## Primary Positioning

Short positioning:

> Swarmauri is composable intelligence infrastructure for typed, pluggable Python systems.

Expanded positioning:

> Swarmauri helps developers build AI, agent, security, runtime, and integration workflows from independently installable Python components. It separates interface contracts, reusable base behavior, standard components, provider integrations, plugin packages, and experimental work so teams can adopt only the pieces they need while keeping a stable public namespace and extension model.

Copywriter-safe one-liner:

> Build AI-native software from typed Python components that can be installed, composed, swapped, and extended without binding every workflow to one provider or framework.

Technical-writer-safe one-liner:

> Swarmauri is a Python monorepo and namespace package ecosystem with core interfaces, Pydantic-backed base classes, first-party standard components, provider/community packages, plugin discovery, and independently installable package families.

Developer-relations-safe one-liner:

> Start with `uv add swarmauri`, then add focused packages such as `swarmauri_vectorstore_pinecone`, `swarmauri_signing_ed25519`, `swarmauri_llm_openai`, or `swarmauri_storage_s3` when your application needs a specific capability.

## Evidence-Grounded Current State

### Public Website

`swarmauri.com` is currently a standalone MdWrk lander repository:

- Repo path: `E:\swarmauri_github\swarmauri-com`
- Site kind: `mdwrk-lander`
- Deployment: self-hosted Docker service `swarmauri-com`
- DNS/proxy orchestration: `npmctl` with Namecheap and Nginx Proxy Manager
- Source pages in content pack: `/`, `/platform/`, `/proof/`
- Imported legacy content: 16 WordPress-derived records, split as 8 posts and 8 pages.
- Legacy pages include About, Careers, Contact, FAQ, Privacy Policy, Services & Solutions, Terms of Service, and a Swarmauri page.
- Public build artifacts include `robots.txt`, `llms.txt`, and `sitemap.xml`.

Current public-site strengths:

- Clean repo separation from SDK and docs.
- Operational state is explicit in `site.manifest.json`, `desired-state/dns.yaml`, and `desired-state/proxy.yaml`.
- Brand assets are present under `public/assets/brand/swarmauri/`.
- The current app already links to GitHub and docs.

Current public-site gaps:

- Homepage is too thin for the breadth of the SDK.
- Only a few source pages are canonical in the content pack.
- Legacy article content contains outdated version pins, old import paths, mojibake, and informal language that should not be treated as current canonical messaging.
- Careers exists only as an imported legacy page, not as an active recruiting system.
- Package portfolio content is not yet integrated into the live website.

### Docs Website

`docs.swarmauri.com` is currently a standalone ZDX/MkDocs documentation repository:

- Repo path: `E:\swarmauri_github\docs-swarmauri-com`
- Site kind: `zdx-docs`
- Deployment: self-hosted Docker service `docs-swarmauri-com`
- DNS/proxy orchestration: `npmctl`
- MkDocs theme: Material
- Repo URL in docs: `https://github.com/swarmauri/swarmauri-sdk`
- API generation is wired through `mkdocstrings`.
- API manifest discovers Core, Base, Standard, Standards, and Community targets from the SDK workspace.

Current docs strengths:

- Strong API-reference surface and navigation breadth.
- Good technical-docs stack: Material for MkDocs, mkdocstrings, search, tags, blog plugin, API nav, source paths.
- Social links already exist for Discord, YouTube, LinkedIn, Twitter, and GitHub.

Current docs gaps:

- Hand-written guide pages need a significant editorial and code-validation pass.
- Some docs contain encoding artifacts such as `ð`, `â`, and broken checkmarks.
- Some examples use stale imports such as `OpenAIModel`, `GroqModel`, `CalculatorTool`, `RequestsTool`, or typo `swarrmauri`.
- `guide/usage.md` duplicates the "Using Tools" heading.
- The generated `dist/llms.txt` is only a short placeholder and should be expanded.
- API pages are extensive, but the docs need stronger task-first onboarding.

### SDK Repository

`swarmauri-sdk` is the authoritative source for package topology and developer claims:

- Repo path: `E:\swarmauri_github\swarmauri-sdk`
- Monorepo version in `pkgs/pyproject.toml`: `0.6.2.dev3`
- Python support in repo metadata: `>=3.10,<3.15`
- Foundational package versions currently read as:
  - `swarmauri`: `0.9.1.dev5`
  - `swarmauri_core`: `0.10.1.dev5`
  - `swarmauri_base`: `0.10.1.dev5`
  - `swarmauri_standard`: `0.10.1.dev5`
  - `swarmauri_typing`: `0.10.1.dev5`
- Current active workspace members in `pkgs/pyproject.toml`: 310
- Current generated package-index records in `pkgs/package-index.toml`: 336

Current `pkgs/pyproject.toml` workspace-member breakdown:

| Area | Active workspace members |
|---|---:|
| `standards` | 180 |
| `community` | 106 |
| `experimental` | 13 |
| `plugins` | 5 |
| `base` | 1 |
| `core` | 1 |
| `deprecated` | 1 |
| `swarmauri` | 1 |
| `swarmauri_standard` | 1 |
| `typing` | 1 |
| Total | 310 |

Generated package-index layer summary:

| Layer | Indexed packages | Meaning |
|---|---:|---|
| `00-typing` | 1 | typing helpers and generic type composition primitives |
| `10-interfaces` | 1 | interface and protocol contracts |
| `20-bases` | 1 | reusable base classes, mixins, and component models |
| `30-standard-kernel` | 1 | bundled first-party standard component kernel |
| `40-standards` | 180 | first-party split standard packages |
| `50-community` | 106 | community and provider-specific packages |
| `60-plugins` | 5 | plugin packages and plugin examples |
| `70-experimental` | 36 | incubating and planning-stage packages |
| `80-facades` | 1 | aggregate user-facing facade packages |
| `90-deprecated` | 4 | deprecated compatibility packages |
| Total | 336 | generated package-index records |

Top indexed package families:

| Family | Indexed packages |
|---|---:|
| tool | 42 |
| middleware | 19 |
| cipher_suite | 18 |
| signing | 17 |
| llm | 17 |
| transport | 15 |
| certs | 13 |
| vectorstore | 13 |
| auth_idp | 12 |
| distance | 12 |
| keyprovider | 10 |
| parser | 10 |
| tokens | 10 |
| billing | 9 |
| crypto | 8 |
| storage | 8 |
| xmp | 8 |

Package architecture that should drive website messaging:

- `swarmauri`: public namespace, importer, plugin discovery, stable imports.
- `swarmauri_core`: interface contracts and shared types.
- `swarmauri_base`: Pydantic-backed base classes, serialization helpers, dynamic component registration.
- `swarmauri_standard`: first-party standard component kernel.
- `swarmauri_typing`: dynamic typing utilities.
- `pkgs/standards`: first-party split standards-oriented packages.
- `pkgs/community`: provider and community integrations.
- `pkgs/plugins`: plugin packages and examples.
- `pkgs/experimental`: incubation and research surfaces.
- `pkgs/deprecated`: compatibility surfaces.

### Attached Portfolio Zip

Attached artifact:

- File: `E:\Downloads\swarmauri-sdk-portfolio (3).zip`
- Extracted review path: `E:\swarmauri_github\.tmp\swarmauri-sdk-portfolio-3`
- App type: Vite/React app generated from an AI Studio-style scaffold.
- Dependencies include React, React Router, Tailwind/Vite, lucide-react, motion, and `@google/genai`.
- Main routes:
  - `/`
  - `/architecture`
  - `/architecture/layer/:layerId`
  - `/architecture/channel/:channelId`
  - `/catalog`
  - `/catalog/channel/:channelName`
  - `/catalog/family/:familyName`
  - `/catalog/:packageName`
  - `/composer`
  - `/composer/:componentType`
  - `/guides`
  - `/guides/:guideId`
  - `/claims`
  - `/claims/category/:categoryName`
  - `/claims/status/:statusName`
  - `/sitemap`
- Public discovery files include `robots.txt`, `sitemap.xml`, `sitemap-main.xml`, `sitemap-packages.xml`, `sitemap.xsl`, `llms.txt`, and `llms-full.txt`.

Portfolio app strengths:

- Better product-portfolio shape than the current live lander.
- Strong page model: overview, architecture, catalog, composer, guides, claims, sitemap.
- Useful interaction patterns: package filters, package detail pages, copyable install commands, component composer, guide toggles, claims matrix.
- Better handoff model for developer relations than static marketing copy alone.
- It already treats claims as a product surface, which is the right instinct for an SDK with many security, crypto, auth, token, transport, and package-count claims.

Portfolio app gaps:

- It hard-codes stale counts: 305 total workspace packages, 173 standards, 108 community, 13 experimental, 5 plugins, 5 foundation, 1 deprecated. Live repo now shows 310 active workspace members and 336 generated package-index records.
- It only defines 30 representative packages in `src/data/packages.ts`, not a generated full catalog.
- Some package examples are not present as split packages in the live repo. Example: `swarmauri_tool_calculator` and `swarmauri_tool_websearch` are not current `pkgs/standards` split-package directories, while `CalculatorTool` exists under `swarmauri_standard`.
- Several UI copy strings overstate verification, for example "Repository Audit Complete" and "Google Rich Results Compliant"; these should only appear after current automated validation.
- Structured data currently claims `numberOfItems: 305`; it must be generated from current data.
- The app should not use `@google/genai` unless there is a real user-facing AI feature with a secure backend boundary.

## Unified Domain And Routing Vision

Recommended canonical information architecture:

| Surface | URL | Purpose | Owner |
|---|---|---|---|
| Company/product home | `https://swarmauri.com/` | Positioning, primary audience routing, product portfolio overview, trust signals | Website + copy |
| Product platform | `https://swarmauri.com/platform/` | Explain composable intelligence infrastructure, architecture, who it is for | Copy + DevRel |
| Package portfolio | `https://swarmauri.com/packages/` preferred, or `https://packages.swarmauri.com/` if separately deployed | Source-generated catalog from `pkgs/package-index.toml` and package metadata | DevRel + website dev |
| Package detail | `https://swarmauri.com/packages/:package/` | Install commands, import paths, package role, examples, maturity, docs links | DevRel + technical writing |
| Architecture | `https://swarmauri.com/architecture/` | Friendly explanation of layers: typing, interfaces, base, standard, standards, community, plugins, experimental | Technical writing + copy |
| Docs | `https://docs.swarmauri.com/` | Installation, quickstarts, tutorials, API docs, package docs, migration notes | Technical writing |
| Updates | `https://swarmauri.com/updates/` | Releases, engineering notes, package changes, adoption stories | Copy + DevRel |
| Careers | `https://swarmauri.com/careers/` | Hiring narrative, open roles, remote/collaboration norms, contributor-to-hire path | Company/copy |
| Community | `https://swarmauri.com/community/` | GitHub, Discord, YouTube, LinkedIn, contribution map | DevRel |
| Contact | `https://swarmauri.com/contact/` | Sales/support/contributor contact routing | Company/copy |
| Legal | `https://swarmauri.com/privacy-policy/`, `/terms-of-service/` | Required legal pages | Company/legal |

Recommended subdomain policy:

- Use the root domain for brand and SEO-critical product pages.
- Keep `docs.swarmauri.com` for documentation because developers expect a docs subdomain and current deployment already exists.
- Use `packages.swarmauri.com` only if the package portfolio app has an independent deployment cadence. If used, canonical package pages should still be linked prominently from `swarmauri.com/packages/`.
- Avoid fragment/hash URLs for canonical package pages. Use clean paths for sitemap, Open Graph, and assistant retrieval.
- Keep `www.swarmauri.com` as a redirect or alias to root.

## Navigation Model

Global nav should be consistent across `swarmauri.com`, docs, and package portfolio:

- Product
- Packages
- Docs
- Updates
- Careers
- Community
- GitHub

Recommended primary CTA:

- For broad website visitors: "Explore packages"
- For developers: "Install Swarmauri"
- For docs pages: "Start the quickstart"
- For package pages: "Copy install command"

Recommended footer groups:

- Product: Platform, Architecture, Packages, Claims Matrix
- Developers: Docs, Quickstart, API Reference, GitHub, Discord
- Company: About, Careers, Contact, Services & Solutions
- Updates: Releases, Engineering Notes, Package Index
- Legal: Privacy Policy, Terms of Service

## Core Page Briefs

### Home

Goal: make the first viewport immediately communicate that Swarmauri is a developer platform, not just a general AI services company.

Hero headline options:

- "Swarmauri"
- "Composable intelligence infrastructure"
- "Typed Python components for AI-native software"

Hero supporting copy:

> Build AI, agent, security, runtime, and integration workflows from independently installable Python packages with stable contracts, Pydantic-backed models, and provider-specific components.

Hero CTAs:

- Explore packages
- Read the docs
- View GitHub

Homepage sections:

- What Swarmauri is
- Package portfolio highlights
- Architecture at a glance
- Developer quickstart
- Trust and claims policy
- Updates and releases
- Community and careers

### Platform

Goal: explain the system in language that works for technical evaluators and non-technical stakeholders.

Core message:

> Swarmauri separates contracts from implementations. Developers can rely on interfaces, base behavior, standard components, provider integrations, and focused packages without pulling every dependency into every project.

Suggested sections:

- Contract-first architecture
- Stable namespace imports
- Pydantic-backed components
- Independent package installation
- Provider swaps and adapter packages
- Security, signing, token, transport, and storage surfaces
- When to use the namespace package vs focused packages

### Packages

Goal: use the existing portfolio app as the browsable product surface, while replacing hand-maintained catalog facts with source-generated SDK metadata.

Package catalog requirements:

- Generate from `pkgs/package-index.toml`, `pkgs/pyproject.toml`, and per-package `pyproject.toml` metadata.
- Show current package counts and data-generation timestamp.
- Support filters for layer, family, maturity, workspace membership, and package role.
- Show install command with `uv` and `pip`.
- Show package import roots.
- Show source path.
- Show docs link.
- Show package maturity and caveats.
- Show whether the package is foundational, standard, community, plugin, experimental, deprecated, or facade.
- Avoid hard-coded package totals.

Package detail page requirements:

- Package name
- One-sentence purpose
- Layer/order
- Family
- Role
- Maturity
- Workspace status
- Python requirement
- Version
- Install command
- Import examples
- Base/core contract relationship
- Link to source directory
- Link to API docs
- Link to examples or guide if available
- Claims/caveats

### Architecture

Goal: give evaluators a clear mental model for why the package ecosystem exists.

Recommended architecture model:

1. `swarmauri_typing`: typing helpers and generic type composition primitives.
2. `swarmauri_core`: interface and protocol contracts.
3. `swarmauri_base`: reusable base classes, mixins, component models, serialization, dynamic registration.
4. `swarmauri_standard`: bundled first-party standard component kernel.
5. Split standards packages: first-party, standards-oriented, focused packages.
6. Community packages: provider and SaaS integrations.
7. Plugin packages: extension examples and plugin surfaces.
8. Experimental packages: incubating and planning-stage work.
9. Facade packages: aggregate user-facing packages.
10. Deprecated packages: compatibility surfaces.

Architecture page should include:

- Layer diagram
- Package lifecycle explanation
- Direct import vs namespace import explanation
- Extension authoring path
- Dependency-minimization story
- Current limits and caveats

### Docs

Goal: make docs the place where developers can succeed, not just the place where API pages exist.

Priority docs overhaul:

- Replace old "Swarmauri SDK consists of four main packages" copy with the current layered architecture.
- Rewrite quickstart around current package names and imports.
- Create "Choose your install" page:
  - `uv add swarmauri`
  - `pip install swarmauri`
  - `uv add swarmauri_core swarmauri_base`
  - `uv add swarmauri_standard`
  - focused package installs
- Create "Package lifecycle and maturity" page.
- Create "Writing a custom component" page based on current `ComponentBase`, `ToolBase`, and `SubclassUnion` patterns.
- Create "Provider integrations" page for LLMs, embeddings, vector stores, and external services.
- Create "Security and trust components" page for signing, crypto, key providers, tokens, certs, and middleware.
- Create "Migration from old imports" page for old blog/docs examples.
- Create package-family landing pages that link to API refs.

Docs quality issues to fix:

- Remove mojibake and broken icons.
- Remove duplicated headings.
- Fix typo `swarrmauri`.
- Validate every code block against the current repo or mark it as conceptual pseudocode.
- Replace old `OpenAIModel`/`GroqModel` examples where the current package/import path differs.
- Expand `dist/llms.txt` from a placeholder into a useful docs index.

### Updates

Goal: give the copywriter and DevRel teams a publishing lane for release notes, engineering notes, package changes, and ecosystem stories.

Recommended categories:

- Release notes
- Package highlights
- Architecture notes
- Tutorials
- Community/contributor updates
- Company updates

Content policy:

- Old WordPress posts can stay in the archive, but add "Archived" framing if examples are version-specific or outdated.
- New release posts should cite current package names, current install commands, and current docs links.
- Keep "what changed" separate from "why it matters".

### Careers

Goal: convert the current imported legacy page into a coherent company page.

Recommended careers page sections:

- Why work on Swarmauri
- Engineering culture: typed systems, open source, package architecture, docs-first developer experience
- Current work areas:
  - Python SDK infrastructure
  - Package ecosystem and integrations
  - Documentation and DevRel
  - Developer tooling and package catalog
  - Security/signing/crypto/token workflows
  - Website and content systems
- Open roles or "no open roles" state
- Contributor pathway
- Hiring contact

Do not leave Careers as a blank imported page if it appears in navigation.

## Copywriting Guidance

Use these terms consistently:

- composable intelligence infrastructure
- typed, pluggable Python systems
- independently installable components
- contract-first architecture
- Pydantic-backed component models
- stable namespace imports
- provider-specific packages
- first-party standard components
- standards-oriented packages
- community integrations
- package portfolio

Avoid or qualify:

- "fully certified"
- "FIPS-compliant platform"
- "enterprise-ready" unless tied to specific evidence
- "Google Rich Results Compliant" unless validated
- "305 packages" or any fixed package count unless generated from live data
- "100+ models" unless backed by a current model inventory
- "production-grade" unless the package or workflow has test/support evidence

Preferred copy blocks:

> Swarmauri is built for developers who need composable AI infrastructure without monolithic dependency surfaces.

> Start with the namespace package, then add focused components only when your workflow needs them.

> The SDK separates interface contracts, reusable base behavior, first-party standard components, and provider integrations so applications can grow without rewriting their architecture.

> Swarmauri's package portfolio spans LLMs, tools, middleware, signing, cipher suites, transports, certificates, auth identity providers, vector stores, key providers, parsers, tokens, billing, crypto, XMP, storage, evaluators, and more.

## Technical Writing Workstreams

Priority 1:

- Validate installation and first-run examples.
- Rewrite quickstart.
- Fix broken imports and encoding artifacts.
- Add current architecture overview.
- Add package lifecycle/maturity page.

Priority 2:

- Create package-family guides.
- Add migration notes for old import paths.
- Expand docs `llms.txt`.
- Create docs-to-package-page cross-links.
- Add "How to read package maturity" guide.

Priority 3:

- Add example validation to CI.
- Generate API nav and package catalog from the same metadata source where practical.
- Add docs snippets backed by tests or README examples.

## Developer Relations Workstreams

Priority 1:

- Produce 5 canonical demos:
  - Install and create a document/component.
  - Build a custom tool.
  - Swap an LLM provider.
  - Sign or verify a payload.
  - Use a focused vector store or storage adapter.
- Create a "package of the week" editorial template.
- Build a package-catalog source generator.

Priority 2:

- Create videos or short GIFs for install, package search, and component composer.
- Add Discord/GitHub contribution flow to the site.
- Create "extension author" docs and package templates.

Priority 3:

- Track package adoption and docs search queries.
- Publish ecosystem map and roadmap.
- Add "known caveats" and support tiers for package families.

## Product/Website Development Workstreams

Priority 1:

- Integrate the existing portfolio app from the zip into the web system.
- Preserve its useful routes and views while wiring hard-coded portfolio data to generated SDK data.
- Use its package-detail route pattern as the basis for source-backed package pages.
- Add shared header/footer/navigation across root site and portfolio.
- Preserve docs as a separate deploy but visually align it.

Priority 2:

- Generate sitemap, `llms.txt`, `llms-full.txt`, and structured data from the same content/package graph.
- Add redirects from legacy WordPress paths where needed.
- Add archive badges to old posts.
- Create package detail canonical URLs.

Priority 3:

- Add content preview checks.
- Add structured-data validation.
- Add screenshot QA for important routes.
- Add package-count drift checks.

## Source Of Truth Policy

Authoritative sources:

- Package membership: `swarmauri-sdk/pkgs/pyproject.toml`
- Package topology: `swarmauri-sdk/pkgs/package-index.toml`
- Package index documentation: `swarmauri-sdk/pkgs/PACKAGE_INDEX.md`
- Foundational package versions: per-package `pyproject.toml`
- Public website content: `swarmauri-com/packages/site-content-pack/src/index.ts`
- Imported legacy content: `swarmauri-com/packages/site-content-pack/src/articles.generated.ts`
- Docs nav/API config: `docs-swarmauri-com/mkdocs.yml`
- Docs API generation targets: `docs-swarmauri-com/api_manifest.yaml`
- Existing portfolio app from zip: extracted under `.tmp/swarmauri-sdk-portfolio-3`

Package count rule:

- Marketing copy may say "300+ packages" if current generated data remains above 300.
- Exact counts must be generated at build time.
- If showing two counts, label them clearly:
  - "active workspace members" from `pkgs/pyproject.toml`
  - "indexed package records" from `pkgs/package-index.toml`

Claims rule:

- Use "verified" only when backed by current repo metadata, tests, docs generation, or package index generation.
- Use "standards-oriented" instead of "certified" unless certification evidence exists.
- Use "provider integration" instead of implying provider partnership.
- Use "experimental" visibly for incubation packages.

## Recommended Implementation Plan

Phase 1: Content and IA alignment

- Approve unified nav and domain policy.
- Decide whether package portfolio lives at `/packages/` or `packages.swarmauri.com`.
- Rewrite homepage, platform, packages, architecture, updates, careers, and community content briefs.
- Mark legacy imported content as archive.

Phase 2: Harden the existing portfolio app

- Add a data-generation layer for the existing app from `pkgs/package-index.toml`, `pkgs/pyproject.toml`, and per-package metadata.
- Replace the existing app's hard-coded catalog facts with generated JSON while preserving its UX model.
- Generate clean package routes and sitemap entries from the existing app's route structure.
- Replace 305-count structured data with generated counts.
- Remove or justify `@google/genai`.

Phase 3: Docs cleanup

- Rewrite quickstart and usage pages.
- Fix stale imports and encoding artifacts.
- Add package-family landing pages.
- Create migration notes for old blog examples.
- Expand `llms.txt` and assistant-facing docs summaries.

Phase 4: Unified launch

- Shared visual system across root, package portfolio, and docs.
- Cross-link every major page:
  - Root to docs, GitHub, packages.
  - Docs to package pages.
  - Package pages to docs/API/source.
  - Updates to package detail pages.
  - Careers/community to GitHub and contribution docs.
- Run build, docs build, sitemap checks, structured-data checks, and link checks before publishing.

## Team Assignments

Copywriter:

- Own homepage, platform, services, careers, about, updates taxonomy, and short package-family copy.
- Convert legacy "AI platform" language into current "composable intelligence infrastructure" language.
- Remove overclaims and vague hype.

Technical writer:

- Own docs quickstart, architecture docs, package lifecycle docs, migration notes, guide cleanup, and API-reference organization.
- Validate code samples or mark as conceptual.
- Keep docs terminology synchronized with package layers.

Developer relations:

- Own demos, examples, package-family introductions, install workflows, package detail page examples, community onboarding, and release-note developer framing.
- Keep examples grounded in current package names and imports.

Website/product developer:

- Own routing, navigation, content-pack integration, package-data generator, structured data, sitemap, `llms.txt`, portfolio app integration, and visual consistency.
- Ensure package counts and structured metadata are generated, not copied by hand.

## Immediate Decisions Needed

1. Should the interactive package portfolio live at `swarmauri.com/packages/` or `packages.swarmauri.com`?
2. Should legacy WordPress posts remain indexed as normal posts, or be visibly marked as archive/version-specific?
3. Should `Services & Solutions` remain a company services page or be reframed as "Implementation Support" for the SDK ecosystem?
4. Should Careers list active roles now, or launch with a contributor/talent-network state?
5. Which package count should be used in visible copy: "300+ packages" or exact generated counts with labels?

## Recommended Launch Copy Skeleton

Home hero:

> Swarmauri  
> Composable intelligence infrastructure for typed Python systems.
>
> Build AI, agent, security, runtime, and integration workflows from independently installable packages with stable contracts, Pydantic-backed models, and provider-specific components.

Platform intro:

> Swarmauri separates interface contracts from implementation packages. Start with the namespace package, build on core/base contracts, and add focused standard, community, plugin, or experimental components only when your application needs them.

Packages intro:

> Explore the Swarmauri package portfolio by layer, family, maturity, and install target. Each package page links installation commands, import paths, source files, API docs, and known caveats.

Docs intro:

> Use the docs to install Swarmauri, choose package families, write custom components, migrate from older imports, and inspect generated API references.

Careers intro:

> Swarmauri is building open-source infrastructure for composable AI-native software. We work on typed Python SDKs, package systems, developer tooling, docs, security components, and practical integrations.

## Appendix: Research Sources

Local repositories:

- `E:\swarmauri_github\swarmauri-com`
- `E:\swarmauri_github\docs-swarmauri-com`
- `E:\swarmauri_github\swarmauri-sdk`
- `E:\swarmauri_github\swarmauri.app`

Attached zip:

- `E:\Downloads\swarmauri-sdk-portfolio (3).zip`
- Extracted to `E:\swarmauri_github\.tmp\swarmauri-sdk-portfolio-3`

Public URLs checked:

- `https://swarmauri.com/`
- `https://docs.swarmauri.com/`
- `https://github.com/swarmauri/swarmauri-sdk`
- `https://pypi.org/project/swarmauri/`
- `https://pypi.org/project/swarmauri_core/`
- `https://pypi.org/project/swarmauri_base/`
- `https://pypi.org/project/swarmauri_standard/`

Important drift note:

- Public PyPI stable releases and local repo development versions do not always match. Public copy should distinguish "published stable package" from "current repo/dev metadata" when naming exact versions.
