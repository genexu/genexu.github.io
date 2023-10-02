const Overlay = ({ children, ...rest }) => (
    <div className="w-screen h-screen absolute left-0 top-0 backdrop-brightness-50" {...rest}>
        {children}
    </div>
)

export default Overlay;