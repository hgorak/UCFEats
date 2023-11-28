import React, { useState, useEffect, useContext } from "react";
import { Link, useOutletContext } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import { AuthContext } from "../../context/AuthContext.jsx";
import TimeSince from "../../components/TimeSince.jsx";
import Placeholder from "react-bootstrap/Placeholder";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { API_URL } from "../../../api.js";

function Home() {
	const { currentUser } = useContext(AuthContext);
	const [recentEats, setRecentEats] = useState([]);
	// const [currentCalories, setCurrentCalories] = useState();
	// const [calorieGoal, setCalorieGoal] = useState();
	// const [currentFats, setCurrentFats] = useState();
	// const [fatsGoals, setFatsGoal] = useState();
	// const [currentCarbs, setCurrentCarbs] = useState();
	// const [carbsGoal, setCarbsGoal] = useState();
	// const [currentProtein, setCurrentProtein] = useState();
	// const [proteinGoal, setProteinGoal] = useState();
	const [goals, setGoals] = useState([]);
	const [currentMacros, setCurrentMacros] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getRecentEats();
		getCurrentMacros();
		getGoals();
		setLoading(false);
	}, []);

	const getGoals = async () => {
		const response = await fetch(API_URL + "/api/eats/macroGoals", {
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
			// setCalorieGoal(json[0]);
			// setFatsGoal(json[1]);
			// setCarbsGoal(json[2]);
			// setProteinGoal(json[3]);
			setGoals(json);
			console.log("goals: " + json);
			console.log("calorie goal: " + json[0]);
		}
	};

	const getCurrentMacros = async () => {
		const response = await fetch(API_URL + "/api/eats/dailyMacros", {
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
			// setCurrentCalories(json[0]);
			// setCurrentFats(json[1]);
			// setCurrentCarbs(json[2]);
			// setCurrentCalories(json[3]);
			setCurrentMacros(json);
			console.log("currents: " + json);
			console.log("calorie current: " + json[0]);
		}
	};
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
					{/* <div>
						<h2>All of UCF's best flavors and menus in one place</h2>
						<span>Find and enjoy your favorite eats here and track your nutrition</span>

						<Link to="/dashboard/food">
							<button>Explore</button>
						</Link>
					</div> */}
					{!loading && (
						<div className="goals">
							<div className="progress-bar">
								<CircularProgressbar
									value={currentMacros[0]}
									maxValue={goals[0]}
									text={`${goals[0] - currentMacros[0]} remaining`}
									styles={buildStyles({
										textSize: "10px",
									})}
								/>
								<span>Calories</span>
							</div>
							<div className="progress-bar">
								<CircularProgressbar
									value={currentMacros[2]}
									maxValue={goals[2]}
									text={`${goals[2] - currentMacros[2]}g remaining`}
									styles={buildStyles({
										textSize: "10px",
									})}
								/>
								<span>Carbs</span>
							</div>
							<div className="progress-bar">
								<CircularProgressbar
									value={currentMacros[3]}
									maxValue={goals[3]}
									text={`${goals[3] - currentMacros[3]}g remaining`}
									styles={buildStyles({
										textSize: "10px",
									})}
								/>
								<span>Protein</span>
							</div>
							<div className="progress-bar">
								<CircularProgressbar
									value={currentMacros[1]}
									maxValue={goals[1]}
									text={`${goals[1] - currentMacros[1]}g remaining`}
									styles={buildStyles({
										textSize: "10px",
									})}
								/>
								<span>Fats</span>
							</div>
						</div>
					)}
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
