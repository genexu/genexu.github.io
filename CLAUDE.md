# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a bilingual personal blog/portfolio website built with Astro 4, deployed to GitHub Pages. The site supports English and Traditional Chinese (zh-tw) with internationalization (i18n) built into Astro's routing system.

## Key Technologies

- **Framework**: Astro 4.10.3 with SSG (Static Site Generation)
- **Package Manager**: pnpm 10+
- **Styling**: TailwindCSS with Typography plugin
- **UI Components**: React 18 (via @astrojs/react)
- **Content**: Markdown with Astro Content Collections
- **Search**: Pagefind for static site search
- **Markdown Plugins**:
  - remark-gfm (GitHub Flavored Markdown)
  - remark-breaks (line breaks)
  - rehype-slug (heading IDs)
  - rehype-autolink-headings (auto-generated heading anchors)
- **Code Highlighting**: Shiki with Dracula theme

## Development Commands

```bash
# Start development server (runs on localhost:4321)
pnpm dev

# Build for production
pnpm build

# Preview production build locally
pnpm preview

# Generate search index (must run after build)
pnpm pagefind

# Run Astro CLI commands
pnpm astro [command]
```

## Content Architecture

### Content Collections

Four content collections defined in `src/content/config.ts`:

1. **blog** - Blog posts in `src/content/blog/`
2. **life** - Life posts in `src/content/life/`
3. **reading** - Reading reflections in `src/content/reading/`
4. **notes** - Notes in `src/content/notes/`

**Standard collections** (blog, life, notes) use the same schema:
- `title` (string, required)
- `description` (string, required)
- `pubDate` (date, required)
- `updatedDate` (date, optional)
- `tags` (string array, optional)
- `cover` (string, optional) - for blog posts

**Reading collection** has book-specific fields:
- `title` (string, required) - Book title
- `description` (string, required) - Brief summary of the reflection
- `author` (string, required) - Book author name
- `rating` (number 1-5, required) - Book rating
- `cover` (string, optional) - Book cover image path
- `pubDate` (date, required) - Reflection publish date
- `updatedDate` (date, optional)
- `tags` (string array, optional)

### Content Organization

```
src/content/
├── blog/
│   ├── en/           # English blog posts
│   └── zh-tw/        # Traditional Chinese blog posts
├── life/
│   ├── en/           # English life posts
│   └── zh-tw/        # Traditional Chinese life posts
├── reading/
│   ├── en/           # English reading reflections
│   └── zh-tw/        # Traditional Chinese reading reflections
└── notes/
    ├── en/           # English notes
    └── zh-tw/        # Traditional Chinese notes
```

Each markdown file must include a frontmatter section. **Note:** The `layout` field is NOT supported in content collections - layouts are applied in the route files instead.

**For blog, life, and notes posts:**
```yaml
---
title: "Post Title"
description: "Post description"
pubDate: "Aug 29 2024"
tags: ["React", "TypeScript"]
---
```

**For reading reflections:**
```yaml
---
title: "Book Title"
description: "Reflection description"
author: "Author Name"
rating: 4.5
cover: "/images/book-covers/book.jpg"
pubDate: "Feb 18 2026"
tags: ["Genre", "Theme"]
---
```

### Layout Application

Layouts are applied in the dynamic route files (`[...slug].astro`), not in frontmatter:

- `src/pages/blog/[...slug].astro` - Uses `PostLayout`
- `src/pages/life/[...slug].astro` - Uses `PostLayout`
- `src/pages/notes/[...slug].astro` - Uses `PostLayout`
- `src/pages/reading/[...slug].astro` - Uses `ReadingLayout`

Example route pattern:
```astro
---
import { getCollection } from "astro:content";
import ReadingLayout from "../../layouts/ReadingLayout.astro";

const post = // ... fetch post logic
const { Content } = await post.render();
---
<ReadingLayout frontmatter={post.data}>
  <Content />
</ReadingLayout>
```

## Internationalization (i18n)

### Configuration

- **Default locale**: `en` (English)
- **Secondary locale**: `zh-tw` (Traditional Chinese)
- **Fallback**: `zh-tw` falls back to `en`

Configured in:
- `astro.config.mjs` - Astro i18n settings
- `src/i18n/languages.ts` - Language metadata

### Routing Structure

```
pages/
├── index.astro           # Home page with recent posts from all collections
├── blog/
│   ├── index.astro         # Blog listing
│   └── [...slug].astro     # Individual blog posts
├── life/
│   ├── index.astro         # Life posts listing
│   └── [...slug].astro     # Individual life posts
├── reading/
│   ├── index.astro         # Reading reflections listing
│   └── [...slug].astro     # Individual reading reflections
├── notes/
│   ├── index.astro         # Notes listing
│   └── [...slug].astro     # Individual notes
├── tags/
│   └── [tag]/
│       └── [...page].astro  # Tag-based filtering
└── rss.xml.js           # RSS feed generation
```

## Component Architecture

### Layouts
- `Layout.astro` - Base layout with HTML structure
- `PostLayout.astro` - Wrapper for blog, life, and notes content
- `ReadingLayout.astro` - Specialized layout for reading reflections with book metadata showcase (cover, author, rating)
- `Head.astro` - SEO metadata and meta tags
- `Header.astro` - Site navigation
- `Footer.astro` - Site footer

### Panels
Dashboard-style panel components in `src/components/Panels/`:
- `Panel.astro` - Base panel wrapper
- `ProfilePanel.astro` - User profile
- `PostPanel.astro` - Recent posts
- `NotesPanel.astro` - Recent notes
- `SearchPanel.astro` - Search integration
- `GitStatsPanel.astro` - GitHub statistics
- `GitTopLangPanel.astro` - Top programming languages
- `YoutubePanel.astro` - YouTube content
- `ControlPanel.astro` - Settings/controls

### UI Components
- `FormattedDateTime.astro` - Date formatting with i18n
- `LanguageSwitch.astro` - Language toggle
- `ThemeToggle.astro` - Dark/light mode toggle
- `PostCard.astro` - Card component for blog, life, and notes posts
- `ReadingCard.astro` - Specialized card component for reading reflections with book metadata (cover, author, rating)
- `PostList/` - Blog/notes listing components
- `Icons/` - Gradient animated social icons (GitHub, LinkedIn, Email, RSS)

## Styling System

### TailwindCSS Configuration

Custom theme extensions in `tailwind.config.cjs`:
- **Fonts**: Lato, Noto Sans TC (for Chinese characters)
- **Dark mode**: Class-based (`class` strategy)
- **Typography plugin**: Custom checkbox list styling for markdown

### Dark Mode

Implemented using Tailwind's class-based dark mode. Toggle component in `src/components/ThemeToggle.astro`.

### Tailwind v4 Best Practices

This project uses **Tailwind CSS v4** with CSS-first configuration.

**Component Strategy:**
1. ✅ Use utility classes directly in Astro/React components (preferred)
2. ✅ Use `@utility` directive for custom reusable utilities (replaces v3's `@layer utilities`)
3. ✅ Leverage CSS variables for dynamic values
4. ❌ Avoid `<style>` blocks in component files
5. ❌ Don't use props to dynamically construct classes - use complete class names

**Custom Utilities (v4 syntax):**
```css
/* Simple utility */
@utility btn {
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
}

/* Functional utility with arguments */
@utility tab-* {
  tab-size: --value(--tab-size-*);
}
```

**State-Based Styling:**
- Use `group` + `group-hover:` for parent state
- Use `peer` + `peer-checked:` for sibling state

## Build & Deployment

### GitHub Actions Workflows

1. **deploy-astro-gh-pages.yml** - Main deployment workflow
   - Triggers on push to `main` branch
   - Uses pnpm 10+ with pnpm/action-setup@v4
   - Builds site with Astro
   - Runs Pagefind to generate search index
   - Deploys to GitHub Pages

2. **check-with-lighthouse-ci.yml** - Performance monitoring
   - Manual trigger (`workflow_dispatch`)
   - Runs Lighthouse CI for performance audits
   - Configurations in `lighthouserc.json` and `lighthouserc-desktop.json`

### Build Process

The build process is:
1. Install dependencies with pnpm (using `--frozen-lockfile` in CI)
2. Run `pnpm build` (generates `dist/` directory)
3. Run `pnpm pagefind` (indexes built site for search)
4. Deploy `dist/` to GitHub Pages

### Important Build Notes

- Uses pnpm with `node_modules` (standard npm-style installation)
- pnpm version is managed by pnpm/action-setup in CI
- CI uses pnpm 10+ explicitly
- Build artifacts go to `dist/` directory
- Node.js caching is enabled in CI workflows via `cache: "pnpm"`

## Markdown Configuration

### Syntax Highlighting

- Theme: Dracula
- Engine: Shiki (built into Astro)
- No word wrap (horizontal scrolling for long code lines)

### Plugins Applied

All markdown is processed with:
- GitHub Flavored Markdown support
- Automatic line breaks (remark-breaks)
- Auto-generated heading IDs (rehype-slug)
- Clickable heading anchors with "#" symbol

## Site Configuration

Site-level constants in `src/constants.ts`:
- `DEFAULT_SITE_TITLE`: "GeneX.io Workspace"
- `DEFAULT_SITE_DESCRIPTION`: Site description for SEO

Astro config (`astro.config.mjs`):
- **Site URL**: https://genexu.github.io
- **Integrations**: Tailwind, React, Partytown (for analytics), Sitemap
- **Vite config**: react-icons marked as non-external for SSR

## TypeScript Configuration

Extends Astro's strict TypeScript config with React JSX support:
```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

## Development Practices

### Adding New Content

1. Create markdown file in appropriate content collection directory (`src/content/blog/[lang]/` or `src/content/notes/[lang]/`)
2. Include required frontmatter (NO layout field - layouts are applied in route files)
3. Use appropriate language code in directory structure
4. Content automatically appears in listings via Astro Content Collections API

### Creating Reading Reflections

Reading reflections require special handling due to book-specific metadata and images. Follow this workflow:

#### 1. Prepare Images

**Book Cover:**
- Save to: `public/images/book-covers/{book-slug}.jpg`
- Recommended size: 2:3 aspect ratio (e.g., 210x315px or similar)

**Content Images (quotes, diagrams, etc.):**
- Create folder: `public/images/reading/{book-slug}/`
- Use descriptive names: `quote-1.jpg`, `persistence.jpg`, `culture.jpg`, etc.
- Keep organized by topic or section

#### 2. Create Markdown File

**File Location:**
- `src/content/reading/zh-tw/{book-slug}.md` (for Traditional Chinese)
- `src/content/reading/en/{book-slug}.md` (for English)

**Frontmatter Template:**
```yaml
---
title: "Book Title"
description: "Brief reflection summary"
author: "Author Name"
rating: 4.5
cover: "/images/book-covers/{book-slug}.jpg"
pubDate: "Feb 18 2026"
tags: ["Genre", "Theme", "Topic"]
---
```

**Note:**
- Use **book title** as the `title` field (not "My thoughts on..." or reflection title)
- The `author` field is for the book's author, not the reflection author

#### 3. Content Structure

**Standard Reading Reflection Structure:**

All reading reflections follow this consistent heading hierarchy:

```markdown
## Core Content Overview (核心內容概述)

### Story Summary (故事簡介)
Brief story/content summary for fiction books

[For non-fiction books, replace with concept-based subsections instead of 故事簡介]

## Highlights (精彩亮點分享)

### Touching Quotes (一段打動你的文字)
Extract actual text from quote images as blockquotes

### Interesting or Unexpected Parts (有趣或意想不到的部分)
Surprising elements or unexpected insights

### Key Insights or Values (主要啟發或價值) [OPTIONAL]
Main takeaways - can be omitted if not applicable

## Personal Reflection & Practice (個人感受與實踐)

### Impact on Me (這本書對我的影響)
How the book affected you

### Practical Application (實際應用)
Real-world applications or actions taken

## Extended Thinking (延伸思考)

### Thought-Provoking Questions (引發思考的問題)
Questions for readers to reflect on

## Recommendations & Summary (推薦與總結)

**Suitable Readers (適合的讀者):**
Target audience

**Summary (總結):**
Final thoughts
```

**Template Flexibility:**
- The standard structure is a **guideline, not mandatory** — sections can be omitted if not applicable
- Do not force-fill sections just for structural completeness; content quality matters more
- Only flag structural issues that affect readability or violate heading hierarchy rules

**Heading Hierarchy Rules:**
- All main sections use `##` (H2)
- All subsections use `###` (H3)
- **NEVER use `####` (H4)** for standard sections
- Non-fiction books can use concept-based H3 subsections under "Core Content Overview" instead of "Story Summary"

**Quote Attribution Rules:**
- Do NOT add book title attribution (e.g., "—— 《Book Title》") for quotes from the book being reviewed
- The context already makes it clear the quote is from the book
- ONLY include attribution for quotes from OTHER sources (e.g., "—— 《Other Book》", "—— Author Name")
- Do NOT embed images of text - use blockquote markdown instead

**Rating Display:**
- The rating (e.g., 4.5/5) is ONLY in frontmatter metadata, NOT in markdown content
- DO NOT include explicit rating lines like "Rating: ★★★★☆ (4/5)" in the content body
- If source material has rating explanation text, merge it into the Summary section

#### 4. Handle Images and Media

**Text Quotes:**
- Extract text from images and format as blockquotes
- DO NOT embed images that only contain text
- Use this format:
  ```markdown
  > Quote text here
  >
  > —— 《Book Title》
  ```

**Concept Diagrams/Illustrations:**
- Keep as images when they illustrate concepts visually
- Use descriptive alt text:
  ```markdown
  ![Description of diagram](/images/reading/{book-slug}/diagram-name.jpg)
  ```

**YouTube Videos:**
- Embed when relevant (e.g., related music, author talks)
- Use responsive iframe wrapper:
  ```html
  <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 2rem 0;">
    <iframe
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 0.75rem;"
      src="https://www.youtube.com/embed/{VIDEO_ID}"
      title="Video title"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen>
    </iframe>
  </div>
  ```

#### 5. Importing from Confluence

When importing reading reflections from Confluence:

1. **Fetch content** using Atlassian MCP with `contentFormat: "markdown"`
2. **Check for images** in ADF format to see how many images exist
3. **Download images** from Confluence to `/Users/gene_xu/Downloads`
4. **Organize images:**
   - Book cover → `public/images/book-covers/{book-slug}.jpg`
   - Other images → `public/images/reading/{book-slug}/`
5. **Extract text from quote images** - do not embed them as images
6. **Keep visual diagrams** as images with proper paths

#### 6. Verification Checklist

Before committing:
- [ ] Book cover exists at `/images/book-covers/{book-slug}.jpg`
- [ ] All content images organized in `/images/reading/{book-slug}/`
- [ ] Text quotes extracted as blockquotes (not image embeds)
- [ ] All image paths use absolute paths starting with `/images/`
- [ ] Frontmatter includes all required fields (title, author, rating, etc.)
- [ ] NO `layout` field in frontmatter
- [ ] File saved in correct language directory (`zh-tw/` or `en/`)

### Adding New Components

- Place Astro components in `src/components/`
- React components can be used but prefer Astro components for static content
- Follow existing component patterns (e.g., Panel pattern for dashboard widgets)

### Working with i18n

- All user-facing pages should support both locales
- Use `[lang]` dynamic route segment for internationalized pages
- Language switching component handles locale transitions
- Content files must exist in both `en/` and `zh-tw/` directories

### Search Functionality

- Search powered by Pagefind (static search)
- Must run `pnpm pagefind` after building to generate search index
- SearchPanel component integrates with Pagefind
- Search data generated in `dist/pagefind/` directory

### Git Commit Guidelines

- **Language**: All commit messages MUST be in English only
- Follow conventional commit format: `type: description`
- Common types: `feat`, `fix`, `docs`, `refactor`, `chore`, `style`
- Keep commit messages concise and descriptive

## Common Gotchas

1. **pnpm Lockfile**: Always commit `pnpm-lock.yaml`. CI uses `--frozen-lockfile` to ensure reproducible builds.
2. **Search Index**: Always run `pnpm pagefind` after `pnpm build` before deploying manually.
3. **Content Collection Layouts**: The `layout` frontmatter field is NOT supported in content collections (Astro 5). Layouts are applied in the route files (`[...slug].astro`) by wrapping the `<Content />` component. Do not add `layout` to markdown frontmatter.
4. **React Icons**: Configured as non-external for SSR - don't change this Vite config.
5. **Language Routing**: All pages under `[lang]/` - root `/` should redirect to default locale.
6. **Dark Mode**: Uses class-based strategy, not media query - ensure class toggling works properly.
7. **Build Scripts**: Some dependencies (esbuild, sharp) may show build script warnings - these can be safely ignored or approved with `pnpm approve-builds`.
