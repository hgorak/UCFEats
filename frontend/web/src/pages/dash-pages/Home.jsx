import React, { useState, useEffect, useContext } from "react";
import { Link, useOutletContext } from "react-router-dom";
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

		const response = await fetch(API_URL + "/api/eats/recent", {
			method: "GET",
			headers: {
				"Content-Type": "application/JSON",
				Authorization: "Bearer " + currentUser.token,
			},
		});

		if (!response.ok) {
			const json = await response.json();
			console.log(json.error);
		} else {
			const json = await response.json();
			setRecentEats(json);
			console.log("eats:" + json);
		}
	};

	return (
		<div className="home">
			<div className="charts">
				<div className="charts-hero">
					<div>
						<h2>All of UCF's best flavors and menus in one place</h2>
						<span>Find and enjoy your favorite eats here and track your nutrition</span>

						<Link to="/dashboard/food">
							<button>Explore</button>
						</Link>
					</div>
				</div>
			</div>
			<div className="records">
				<h2>Recent Eats</h2>
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
