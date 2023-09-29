import { useState, useEffect } from "react";

const DateTimeClock = () => {
	const [date, setDate] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => setDate(new Date()), 1000);
		return () => clearInterval(timer);
	}, []);

	return (
		<>
			{date.toISOString().slice(0, 10)} {date.toLocaleTimeString()}
		</>
	);
};

export default DateTimeClock;
