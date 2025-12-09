import { forwardRef } from "react";

import { MdSearch } from "react-icons/md";

const SearchInput = forwardRef(({ ...rest }, ref) => (
	<div className="relative">
		<div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
			<MdSearch size={20} className="text-slate-400 dark:text-slate-500" />
		</div>
		<input
			ref={ref}
			type="search"
			{...rest}
		/>
	</div>
));

export default SearchInput;
