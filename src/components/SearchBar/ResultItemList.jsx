const ResultItemList = ({ items }) => (
	<div className="max-h-[60vh] overflow-y-auto">
		{items.length > 0 && (
			<div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
				<p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
					{items.length} {items.length === 1 ? 'result' : 'results'} found
				</p>
			</div>
		)}
		<div className="p-4 space-y-2">
			{items.length === 0 ? (
				<div className="text-center py-12">
					<svg className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
					<p className="text-slate-500 dark:text-slate-400">Start typing to search...</p>
				</div>
			) : (
				items.map((item, index) => (
					<a
						key={index}
						href={item.url}
						className="block group"
					>
						<div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-accent-500 dark:hover:border-accent-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all duration-200">
							<h3 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 mb-2 transition-colors">
								{item.meta.title}
							</h3>
							<div
								className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2"
								dangerouslySetInnerHTML={{ __html: item.excerpt }}
							/>
						</div>
					</a>
				))
			)}
		</div>
	</div>
);

export default ResultItemList;
