import { useState, useRef, useEffect } from "react";
import SearchInput from "./SearchInput";
import Overlay from "./Overlay";
import Container from "./Container";
import ResultItemList from "./ResultItemList";

const SearchBar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [pagefind, setPagefind] = useState(null);
	const [resultItems, setResultItems] = useState([]);
	const inputRef = useRef(null);

	// use local pagefind in development mode to avoid error
	const isDev = process.env.NODE_ENV === "development";
	const pagefindPath = isDev ? "./pagefind/pagefind.js" : "/pagefind/pagefind.js";

	useEffect(() => {
		if (!isOpen) return;
		inputRef.current.focus();
		if (pagefind !== null) return;

		async function loadPagefind() {
			const pf = await import(/* @vite-ignore */ pagefindPath);
			setPagefind(pf);
		}

		loadPagefind();
	}, [isOpen]);

	const handleTriggerSearch = () => {
		setIsOpen(true);
		// prevent body scroll
		const body = document.querySelector("body");
		body.classList.add("no-scroll");
	};

	const handleOverlayClick = () => {
		// allow body scroll
		const body = document.querySelector("body");
		body.classList.remove("no-scroll");
		// reset search result and close overlay
		setResultItems([]);
		setIsOpen(false);
	};

	const handleInputSearchValue = async (e) => {
		const query = e.target.value;
		const search = await pagefind.search(query);
		const { results } = search;
		const items = await Promise.all(results.map(async (result) => await result.data()));
		setResultItems(items);
	};

	const handleClickOnContainer = (e) => {
		e.stopPropagation();
	};

	return (
		<div>
			<SearchInput
				className="block w-full px-4 py-3 pl-12 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-400 focus:border-transparent transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer"
				placeholder="Search posts..."
				onClick={handleTriggerSearch}
				readOnly
			/>
			{isOpen && (
				<Overlay onClick={handleOverlayClick}>
					<Container onClick={handleClickOnContainer}>
						<SearchInput
							ref={inputRef}
							className="block w-full px-4 py-4 pl-12 text-base bg-white dark:bg-slate-800 border-2 border-accent-500 dark:border-accent-400 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-400 transition-all duration-200 shadow-lg"
							required
							placeholder="Search posts..."
							onChange={handleInputSearchValue}
						/>
						<ResultItemList items={resultItems} />
					</Container>
				</Overlay>
			)}
		</div>
	);
};

export default SearchBar;
