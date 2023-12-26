import React, { useMemo, useState, useEffect } from "react";

const TimerType = {
	Days: "days",
	Countdown: "countdown",
};

const DaysAndCountdown = () => {
	const [now, setNow] = useState(new Date());

	const data = useMemo(
		() => [
			{
				type: TimerType.Days,
				date: new Date("2023-09-07"),
				label: "Quit Smoking",
			},
			{
				type: TimerType.Countdown,
				date: new Date("2024-06-30"),
				label: new Date("2024-06-30").toLocaleDateString("en", {
					year: "numeric",
					month: "long",
					day: "numeric",
				}),
			},
		],
		[]
	);

	useEffect(() => {
		const interval = setInterval(() => {
			setNow(new Date());
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	function getTimeDiffText(timeDiff) {
		const oneSecond = 1000;
		const oneMinute = oneSecond * 60;
		const oneHour = oneMinute * 60;
		const oneDay = oneHour * 24;

		const days = Math.floor(timeDiff / oneDay);
		const hours = Math.floor((timeDiff % oneDay) / oneHour);
		const minutes = Math.floor((timeDiff % oneHour) / oneMinute);
		const seconds = Math.floor((timeDiff % oneMinute) / oneSecond);
		return `${days}d ${hours}h ${minutes}m ${seconds}s`;
	}

	return (
		<div className="flex flex-col justify-center w-full h-full">
			<h3 className="text-lg underline">Days & Countdown</h3>
			{data.map((item, index) => {
				const { type, date, label } = item;
				let timeDiff = type === TimerType.Days ? now - date : date - now;
				let timeDiffText = getTimeDiffText(timeDiff);
				let timeDiffSuffix = type === TimerType.Days ? "ago" : "left";

				return (
					<div
						key={index}
						className="grid grid-cols-2 gap-2 py-2"
					>
						<div className="text-sm">{label}</div>
						<div className="text-sm">
							{timeDiffText} {timeDiffSuffix}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default DaysAndCountdown;
