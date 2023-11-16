import React, { useState, useEffect, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import { AuthContext } from "../../context/AuthContext.jsx";
import TimeSince from "../../components/TimeSince.jsx";
import Placeholder from "react-bootstrap/Placeholder";

import { API_URL } from "../../../api.js";

function Home() {
	const { currentUser } = useContext(AuthContext);
	const [recentEats, setRecentEats] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getRecentEats();
		setLoading(false);
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
				console.log(json);
			}
		} catch (error) {
			setError("An error occurred while fetching data.");
			console.error(error);
		}
	};

	return (
		<div className="home">
			<div className="charts"></div>
			<div className="records">
				<div className="record-hero">
					<h2>Recent Eats</h2>
				</div>
				<div className="record-data">
					<ListGroup variant="flush">
						{loading ? (
							<div>
								<Placeholder as={ListGroup.Item} animation="glow">
									<Placeholder xs={12} />
									<Placeholder xs={4} />
								</Placeholder>
								<Placeholder as={ListGroup.Item} animation="glow">
									<Placeholder xs={12} />
									<Placeholder xs={4} />
								</Placeholder>
								<Placeholder as={ListGroup.Item} animation="glow">
									<Placeholder xs={12} />
									<Placeholder xs={4} />
								</Placeholder>
								<Placeholder as={ListGroup.Item} animation="glow">
									<Placeholder xs={12} />
									<Placeholder xs={4} />
								</Placeholder>
								<Placeholder as={ListGroup.Item} animation="glow">
									<Placeholder xs={12} />
									<Placeholder xs={4} />
								</Placeholder>
								<Placeholder as={ListGroup.Item} animation="glow">
									<Placeholder xs={12} />
									<Placeholder xs={4} />
								</Placeholder>
								<Placeholder as={ListGroup.Item} animation="glow">
									<Placeholder xs={12} />
									<Placeholder xs={4} />
								</Placeholder>
								<Placeholder as={ListGroup.Item} animation="glow">
									<Placeholder xs={12} />
									<Placeholder xs={4} />
								</Placeholder>
								<Placeholder as={ListGroup.Item} animation="glow">
									<Placeholder xs={12} />
									<Placeholder xs={4} />
								</Placeholder>
							</div>
						) : (
							recentEats.map((item) => (
								<ListGroup.Item>
									<div className="item">
										<div className="subheading">
											<strong>{item.itemName}</strong>
											{item.locationName}
										</div>
										<div>
											<TimeSince timestamp={item.timestamp} />
										</div>
									</div>
								</ListGroup.Item>
							))
						)}
					</ListGroup>
				</div>
			</div>
		</div>
	);
}

export default Home;
