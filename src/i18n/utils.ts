import type { CollectionEntry } from "astro:content";
import languages, { defaultLanguage } from "./languages";

type PostEntry = CollectionEntry<"blog" | "notes" | "life" | "reading">;

function getPageLangFromSlug(slug: string) {
	const lang = slug.split("/")[0];
	return lang;
}

export function deconstructSlug(slug: string) {
	const [lang, ...rest] = slug.split("/");
	return { lang, slugWithoutLang: rest.join("/") };
}

export function slugifyTag(tag: string) {
	return tag.replace(/\s+/g, "-");
}

function getPostsGroupedByLang(posts: PostEntry[]) {
	return {
		en: posts.filter((post) => getPageLangFromSlug(post.id) === "en"),
		"zh-tw": posts.filter((post) => getPageLangFromSlug(post.id) === "zh-tw"),
	};
}

export function getPostsByLang(posts: PostEntry[], lang: string) {
	const postsGroupedByLang = getPostsGroupedByLang(posts);
	return postsGroupedByLang[lang as keyof ReturnType<typeof getPostsGroupedByLang>];
}
