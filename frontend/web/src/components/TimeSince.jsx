import React, { useEffect, useState } from "react";
import moment from "moment-timezone";

const TimeSince = ({ timestamp }) => {
	const [timeSince, setTimeSince] = useState("");

	useEffect(() => {
		const convertTimestampToTimeSince = () => {
			const utcMoment = moment.utc(timestamp);
			const estMoment = utcMoment.tz("America/New_York"); // Eastern Standard Time (EST)

			const duration = moment.duration(estMoment.diff(moment()));
			const hours = Math.abs(duration.hours());
			const minutes = Math.abs(duration.minutes());

			let timeSinceString = "";

			if (hours > 0) {
				timeSinceString += `${hours} ${hours === 1 ? "hr" : "hrs"}`;
			}

			if (minutes > 0) {
				timeSinceString += `${hours > 0 ? " and " : ""}${minutes} ${
					minutes === 1 ? "min" : "mins"
				}`;
			}

			setTimeSince(timeSinceString.length > 0 ? timeSinceString + " ago" : "Just now");
		};

		convertTimestampToTimeSince();
	}, [timestamp]);

	return <div>{timeSince}</div>;
};

export default TimeSince;
