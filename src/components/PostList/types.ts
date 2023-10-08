export type Post = {
	data: {
		title: string;
		description: string;
		pubDate: Date;
		tags: string[];
	};
	params: {
		lang: string;
		slug: string;
	};
};