const Container = ({ children, ...rest }) => (
	<div className="w-full max-w-3xl mx-auto mt-20 px-4" {...rest}>
		<div className="bg-paper text-ink border border-mist/50 overflow-hidden">
			<div className="p-6 border-b border-mist/40">
				{children[0]}
			</div>
			{children[1]}
		</div>
	</div>
);

export default Container;
