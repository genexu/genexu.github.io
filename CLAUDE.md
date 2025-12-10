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

Two content collections defined in `src/content/config.ts`:

1. **blog** - Blog posts in `src/content/blog/`
2. **notes** - Notes in `src/content/notes/`

Both collections use the same schema:
- `title` (string, required)
- `description` (string, required)
- `pubDate` (date, required)
- `updatedDate` (date, optional)
- `tags` (string array, optional)

### Content Organization

```
src/content/
├── blog/
│   ├── en/           # English blog posts
│   └── zh-tw/        # Traditional Chinese blog posts
└── notes/
    ├── en/           # English notes
    └── zh-tw/        # Traditional Chinese notes
```

Each markdown file must include a frontmatter section with layout specified:
```yaml
---
layout: "../../../layouts/PostLayout.astro"
title: "Post Title"
description: "Post description"
pubDate: "Aug 29 2024"
tags: ["React", "TypeScript"]
---
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
├── index.astro           # Root redirects to /en
├── [lang]/              # Dynamic locale routes
│   ├── blog/
│   │   ├── index.astro     # Blog listing
│   │   └── [...slug].astro # Individual blog posts
│   ├── notes/
│   │   ├── index.astro     # Notes listing
│   │   └── [...slug].astro # Individual notes
│   ├── tags/
│   │   └── [tag]/
│   │       └── [...page].astro  # Tag-based filtering
│   └── index.astro       # Home page for locale
└── rss.xml.js           # RSS feed generation
```

## Component Architecture

### Layouts
- `Layout.astro` - Base layout with HTML structure
- `PostLayout.astro` - Wrapper for blog/note content
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
2. Include required frontmatter with layout path
3. Use appropriate language code in directory structure
4. Content automatically appears in listings via Astro Content Collections API

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

## Common Gotchas

1. **pnpm Lockfile**: Always commit `pnpm-lock.yaml`. CI uses `--frozen-lockfile` to ensure reproducible builds.
2. **Search Index**: Always run `pnpm pagefind` after `pnpm build` before deploying manually.
3. **Layout Paths**: Content frontmatter layout paths are relative (e.g., `../../../layouts/PostLayout.astro`).
4. **React Icons**: Configured as non-external for SSR - don't change this Vite config.
5. **Language Routing**: All pages under `[lang]/` - root `/` should redirect to default locale.
6. **Dark Mode**: Uses class-based strategy, not media query - ensure class toggling works properly.
7. **Build Scripts**: Some dependencies (esbuild, sharp) may show build script warnings - these can be safely ignored or approved with `pnpm approve-builds`.
