const Overlay = ({ children, ...rest }) => (
	<div className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-[2px]" {...rest}>
		{children}
	</div>
);

export default Overlay;
