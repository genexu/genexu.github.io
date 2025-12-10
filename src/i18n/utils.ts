import languages, { defaultLanguage } from "./languages";

export function getPageLangFromSlug(slug: string) {
	const lang = slug.split("/")[0];
	return lang;
}

export function deconstructSlug(slug: string) {
	const [lang, ...rest] = slug.split("/");
	return { lang, slugWithoutLang: rest.join("/") };
}

export function getPostsGroupedByLang(posts: any[]) {
	return {
		en: posts.filter((post) => getPageLangFromSlug(post.slug) === "en"),
		"zh-tw": posts.filter((post) => getPageLangFromSlug(post.slug) === "zh-tw"),
	};
}

export function getPostsByLang(posts: any[], lang: string) {
	const postsGroupedByLang = getPostsGroupedByLang(posts);
	return postsGroupedByLang[lang];
}

// Deprecated: Use Astro.currentLocale instead
// This function is kept for backward compatibility
export function getLangFromUrl(url: URL) {
	const [, lang] = url.pathname.split("/");
	if (lang in languages) return lang;
	return defaultLanguage;
}
