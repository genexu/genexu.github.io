const Overlay = ({ children, ...rest }) => (
	<div className="fixed inset-0 z-50 bg-black/75 search-overlay-enter" {...rest}>
		{children}
	</div>
);

export default Overlay;
