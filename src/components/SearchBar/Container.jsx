const Container = ({ children, ...rest }) => (
	<div className="w-full mx-auto md:w-4/5 lg:w-2/5 mt-20 bg-slate-200 dark:bg-slate-800 rounded-md" {...rest}>
		{children}
	</div>
);

export default Container;
