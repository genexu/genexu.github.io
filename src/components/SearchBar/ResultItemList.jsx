const ResultItemList = ({ items }) => (
	<div className="p-2">
		{`${items.length} results found.`}
		{items.map((item) => (
			<a href={item.url} target="_black">
				<div className="p-2 my-2 border border-slate-600 rounded hover:bg-black/10 dark:hover:bg-black/30">
					<h1 className=" text-lg underline">{item.meta.title}</h1>
					<p dangerouslySetInnerHTML={{ __html: item.excerpt }} />
				</div>
			</a>
		))}
	</div>
);

export default ResultItemList;
