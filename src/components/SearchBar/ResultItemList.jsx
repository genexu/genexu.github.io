const ResultItemList = ({ items }) => (
	<div className="max-h-[60vh] min-h-[140px] overflow-y-auto">
		{items.length > 0 && (
			<div className="px-6 py-3 border-b border-mist/40">
				<p className="eyebrow">
					{items.length} {items.length === 1 ? 'result' : 'results'}
				</p>
			</div>
		)}
		<div className="p-6 space-y-1">
			{items.length === 0 ? (
				<div className="text-center py-12">
					<p className="text-mist italic font-serif">Start typing to search...</p>
				</div>
			) : (
				items.map((item, index) => (
					<a
						key={index}
						href={item.url}
						className="block group py-4 border-b border-mist/30 last:border-b-0"
					>
						<h3 className="font-display text-xl text-ink group-hover:text-rust mb-1 transition-colors">
							{item.meta.title}
						</h3>
						<div
							className="search-excerpt text-sm text-ink-soft line-clamp-2"
							dangerouslySetInnerHTML={{ __html: item.excerpt }}
						/>
					</a>
				))
			)}
		</div>
	</div>
);

export default ResultItemList;
