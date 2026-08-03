const Container = ({ children, ...rest }) => (
	<div className="w-full max-w-3xl mx-auto mt-10 md:mt-20 px-4 leading-normal" {...rest}>
		<div className="bg-paper text-ink border border-mist/50 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45)] overflow-hidden min-h-[220px]">
			<div className="p-6 border-b border-mist/40">
				{children[0]}
			</div>
			{children[1]}
		</div>
	</div>
);

export default Container;
