import { defaultLanguage, secondaryLanguage } from "./languages";

export function getPageLangFromSlug(slug: string) {
	const lang = slug.split("/")[0];
	return lang;
}

export function deconstructSlug(slug: string) {
	const [lang, ...rest] = slug.split("/");
	return { lang, slugWithoutLang: rest.join("/") };
}

export function getPostsGroupedByLang(posts: any[]) {
	// We can enhance this when we have more languages
	return {
		[defaultLanguage]: posts.filter((post) => getPageLangFromSlug(post.slug) === "en"),
		"zh-tw": posts.filter((post) => getPageLangFromSlug(post.slug) === "zh-tw"),
	};
}

export function getPostsByLang(posts: any[], lang: string) {
	const postsGroupedByLang = getPostsGroupedByLang(posts);
	return postsGroupedByLang[lang];
}

// This function is used to replace the default language posts with the translated posts
// When we're on the specific language page, we want to show the translated posts first, and then the default language posts
export function getPostsReplacedByTranslatedPost(posts: any[], lang: string) {
	const postsGroupedByLang = getPostsGroupedByLang(posts);
	const defaultLangPosts = postsGroupedByLang[defaultLanguage];
	const secondaryLangPosts = postsGroupedByLang[secondaryLanguage];
	const currentLangPosts = postsGroupedByLang[lang];

	const basePosts = defaultLangPosts.length > secondaryLangPosts.length ? defaultLangPosts : secondaryLangPosts;
	
	const resultPosts = basePosts.map((post) => {
		const { slugWithoutLang } = deconstructSlug(post.slug);
		const translatedPost = currentLangPosts.find((post) => {
			const { slugWithoutLang: currentLangSlugWithoutLang } = deconstructSlug(post.slug);
			return currentLangSlugWithoutLang === slugWithoutLang;
		});
		if (translatedPost) return translatedPost;
		return post;
	});

	return resultPosts;
}
