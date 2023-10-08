import { useState, useRef, useEffect, lazy } from "react";
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
				className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
				placeholder="Search Posts"
				onClick={handleTriggerSearch}
				readOnly
			/>
			{isOpen && (
				<Overlay onClick={handleOverlayClick}>
					<Container onClick={handleClickOnContainer}>
						<SearchInput
							ref={inputRef}
							className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							required
							placeholder="Search Posts"
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
