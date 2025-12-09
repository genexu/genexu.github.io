const Container = ({ children, ...rest }) => (
	<div className="w-full max-w-3xl mx-auto mt-20 px-4 animate-slide-up" {...rest}>
		<div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
			<div className="p-6 border-b border-slate-200 dark:border-slate-700">
				{children[0]}
			</div>
			{children[1]}
		</div>
	</div>
);

export default Container;
