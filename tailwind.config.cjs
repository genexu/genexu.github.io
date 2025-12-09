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
			colors: {
				accent: {
					50: '#f0f9ff',
					100: '#e0f2fe',
					200: '#bae6fd',
					300: '#7dd3fc',
					400: '#38bdf8',
					500: '#0ea5e9',
					600: '#0284c7',
					700: '#0369a1',
					800: '#075985',
					900: '#0c4a6e',
				},
			},
			typography: {
				DEFAULT: {
					css: {
						'ul > li:has(input[type="checkbox"])': {
							listStyle: "none",
						},
						'ul > li > input[type="checkbox"]:first-child': {
							margin: "0 16px 0 -32px !important",
						},
						maxWidth: '75ch',
						color: 'inherit',
						a: {
							color: '#0ea5e9',
							'&:hover': {
								color: '#0284c7',
							},
							textDecoration: 'none',
							fontWeight: '500',
						},
						'h1, h2, h3, h4': {
							fontWeight: '700',
							letterSpacing: '-0.025em',
						},
						code: {
							fontWeight: '500',
							backgroundColor: 'rgba(100, 116, 139, 0.1)',
							padding: '0.125rem 0.375rem',
							borderRadius: '0.25rem',
							fontSize: '0.875em',
						},
						'code::before': {
							content: '""',
						},
						'code::after': {
							content: '""',
						},
					},
				},
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-in-out',
				'slide-up': 'slideUp 0.5s ease-out',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				slideUp: {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
