import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { DEFAULT_SITE_TITLE, DEFAULT_SITE_DESCRIPTION } from "../constants";

// Follow the RSS spec:
// https://www.w3schools.com/xml/xml_rss.asp
export async function GET(context) {
	const posts = await getCollection("blog");
	return rss({
		title: DEFAULT_SITE_TITLE,
		description: DEFAULT_SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/blog/${post.slug}`,
		})),
	});
}
