import React, { useState, useEffect, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";

import { API_URL } from "../../../api.js";

function Home() {
	const { currentUser } = useContext(AuthContext);
	const [recentEats, setRecentEats] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// getRecentEats();
		getRecentEats();
	}, []);

	const getRecentEats = async () => {
		setError(null);

		try {
			const response = await fetch(API_URL + "/api/eats/recent", {
				method: "GET",
				headers: {
					"Content-Type": "application/JSON",
					Authorization: "Bearer " + currentUser.token,
				},
			});

			if (!response.ok) {
				const json = await response.json();
				setError(json.error);
			} else {
				const json = await response.json();
				setRecentEats(json);
				setLoading(false);
			}
		} catch (error) {
			setError("An error occurred while fetching data.");
			console.error(error);
			setLoading(false);
		}
	};

	const delay = () => {
		window.setTimeout(3000);
	};

	return (
		<div className="home">
			<div className="charts"></div>
			<div className="records">
				<div class="record-hero">
					<h2>Recent Eats</h2>
				</div>
				<div>
					<ol>
						{recentEats.map((item) => (
							<li>{item}</li>
						))}
					</ol>
				</div>
			</div>
		</div>
	);
}

export default Home;
