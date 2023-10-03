import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

// https://astro.build/config
export default defineConfig({
	site: "https://genexu.github.io",
	integrations: [
		tailwind(),
		react(),
		partytown({
			config: {
				forward: ["dataLayer.push"],
			},
		}),
		sitemap(),
	],
	markdown: {
		// https://docs.astro.build/en/guides/markdown-content/#markdown-plugins
		remarkPlugins: [remarkGfm, remarkBreaks],
		rehypePlugins: [],
		shikiConfig: {
			// Choose from Shiki's built-in themes (or add your own)
			// https://github.com/shikijs/shiki/blob/main/docs/themes.md
			theme: "dracula",
			// Add custom languages
			// Note: Shiki has countless langs built-in, including .astro!
			// https://github.com/shikijs/shiki/blob/main/docs/languages.md
			langs: [],
			// Enable word wrap to prevent horizontal scrolling
			wrap: true,
		},
	},
	vite: {
		ssr: {
			noExternal: ["react-icons"],
		},
	},
});
