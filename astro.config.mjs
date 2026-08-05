import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import { unified } from "@astrojs/markdown-remark";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import tailwindcss from "@tailwindcss/vite";

// ponytail: read zh-tw slugs at config load so sitemap i18n can pair alternates.
// Route files live at src/pages/{collection}/[...slug].astro and rely on
// fallbackType: "rewrite", so zh-tw HTMLs exist on disk but aren't declared as
// distinct routes. Feed them in via customPages instead of restructuring routes.
const site = "https://genexu.github.io";
const contentDir = fileURLToPath(new URL("./src/content", import.meta.url));
const collections = ["blog", "life", "notes", "reading"];

const zhTwPostPages = collections.flatMap((c) => {
	const dir = path.join(contentDir, c, "zh-tw");
	if (!fs.existsSync(dir)) return [];
	return fs
		.readdirSync(dir)
		.filter((f) => /\.mdx?$/.test(f))
		.map((f) => `${site}/zh-tw/${c}/${f.replace(/\.mdx?$/, "")}/`);
});

// ponytail: parse `tags: [...]` line only — every post keeps it single-line.
// Upgrade to gray-matter if multi-line or non-array tag frontmatter appears.
const tagSet = new Set();
for (const c of collections) {
	for (const lang of ["en", "zh-tw"]) {
		const dir = path.join(contentDir, c, lang);
		if (!fs.existsSync(dir)) continue;
		for (const f of fs.readdirSync(dir)) {
			if (!/\.mdx?$/.test(f)) continue;
			const src = fs.readFileSync(path.join(dir, f), "utf8");
			const m = src.match(/^tags:\s*\[([^\]]*)\]/m);
			if (!m) continue;
			for (const raw of m[1].matchAll(/"([^"]+)"|'([^']+)'/g)) {
				tagSet.add((raw[1] ?? raw[2]).replace(/\s+/g, "-"));
			}
		}
	}
}
const zhTwTagPages = [...tagSet].map(
	(slug) => `${site}/zh-tw/tags/${encodeURIComponent(slug)}/`
);

const zhTwCustomPages = [...zhTwPostPages, ...zhTwTagPages];

// https://astro.build/config
export default defineConfig({
  site: "https://genexu.github.io",
  integrations: [
    react(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          "zh-tw": "zh-TW",
          en: "en-US",
        },
      },
      customPages: zhTwCustomPages,
    }),
    icon(),
  ],
  markdown: {
    // https://docs.astro.build/en/guides/markdown-content/#markdown-plugins
    // https://docs.astro.build/en/guides/markdown-content/#customizing-a-plugin
    processor: unified({
      remarkPlugins: [remarkGfm, remarkBreaks],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "append",
            properties: {
              className: ["anchor"],
            },
            content: {
              type: "element",
              tagName: "span",
              // properties: {
              // 	className: ["icon", "icon-link"],
              // },
              children: [
                {
                  type: "text",
                  value: "#",
                },
              ],
            },
          },
        ],
      ],
    }),
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: "dracula",
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: [],
      // Enable word wrap to prevent horizontal scrolling
      wrap: false,
    },
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh-tw"],
    fallback: {
      "zh-tw": "en",
    },
    routing: {
      prefixDefaultLocale: false,
      fallbackType: "rewrite",
    },
  },
  vite: {
    ssr: {
      noExternal: ["react-icons"],
    },

    plugins: [tailwindcss()],
  },
});
