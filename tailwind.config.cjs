const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				sans: ["Lato", "Noto Sans TC", ...defaultTheme.fontFamily.sans],
			},
			typography: {
				DEFAULT: {
					// Checkbox does not render as expected
					// https://github.com/tailwindlabs/tailwindcss-typography/issues/297
					css: {
						'ul > li:has(input[type="checkbox"])': {
							listStyle: "none",
						},
						'ul > li > input[type="checkbox"]:first-child': {
							margin: "0 16px 0 -32px !important",
						},
					},
				},
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
