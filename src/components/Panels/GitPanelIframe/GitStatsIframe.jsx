import React, { useEffect, useState } from "react";

const GitStatsIframe = () => {
    const statsThemeMapping = {
        dark: 'algolia',
        light: 'default'
    }

	const [statsTheme, setStatsTheme] = useState('algolia');

	useEffect(() => {
		function setStatsThemeByLocalStorage() {
			const theme = localStorage.getItem("theme");
			setStatsTheme(statsThemeMapping[theme]);
		}

		window.addEventListener("storage", setStatsThemeByLocalStorage);

		const theme = localStorage.getItem("theme");
		setStatsTheme(statsThemeMapping[theme]);

		return () => window.removeEventListener("storage", setStatsThemeByLocalStorage);
	}, []);

	return (
		<iframe
			className="w-full aspect-video"
			src={`https://github-readme-stats.vercel.app/api/top-langs/?username=genexu&theme=${statsTheme}&layout=compact`}
			frameBorder="0"
			allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
			allowFullScreen
		></iframe>
	);
};

export default GitStatsIframe;
