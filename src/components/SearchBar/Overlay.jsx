const Overlay = ({ children, ...rest }) => (
    <div className="fixed inset-0 z-50 bg-slate-900/80 dark:bg-slate-950/90 backdrop-blur-sm animate-fade-in" {...rest}>
        {children}
    </div>
)

export default Overlay;