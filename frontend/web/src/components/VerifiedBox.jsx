import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../../api.js";
import { useNavigate } from "react-router-dom";

import "../styles.scss";

const navigate = useNavigate();

function VerifiedBox({ children }) {
	const [show, setShow] = useState(true);

	// On componentDidMount set the timer
	useEffect(() => {
		const timeId = setTimeout(() => {
			// After 3 seconds set the show value to false
			navigate("/loading");
		}, 3000);

		return () => {
			clearTimeout(timeId);
		};
	}, []);

	// If show is false the component will return null and stop here
	if (!show) {
		return null;
	}

	return <div className="forgot-box forgot-box-sent">{children}</div>;
}

export default VerifiedBox;
