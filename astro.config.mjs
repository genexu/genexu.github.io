import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";

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
	vite: {
		ssr: {
			noExternal: ["react-icons"],
		},
	},
});
