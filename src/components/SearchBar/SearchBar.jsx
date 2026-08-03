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
				className="block w-full px-4 py-3 pl-12 text-sm bg-transparent border-0 border-b border-mist/50 text-ink placeholder-mist italic font-serif focus:outline-none focus:border-rust transition-colors cursor-pointer"
				placeholder="Search..."
				onClick={handleTriggerSearch}
				readOnly
			/>
			{isOpen && (
				<Overlay onClick={handleOverlayClick}>
					<Container onClick={handleClickOnContainer}>
						<SearchInput
							ref={inputRef}
							className="block w-full px-4 py-4 pl-12 text-base bg-transparent border-0 border-b border-mist text-ink placeholder-mist italic font-serif focus:outline-none focus:border-rust transition-colors"
							required
							placeholder="Search..."
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
