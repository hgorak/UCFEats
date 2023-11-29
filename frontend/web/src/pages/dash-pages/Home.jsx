import React, { useState, useEffect, useContext } from "react";
import { Link, useOutletContext } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import { AuthContext } from "../../context/AuthContext.jsx";
import TimeSince from "../../components/TimeSince.jsx";
import Placeholder from "react-bootstrap/Placeholder";
import {
	CircularProgressbar,
	CircularProgressbarWithChildren,
	buildStyles,
} from "react-circular-progressbar";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "react-circular-progressbar/dist/styles.css";

import { API_URL } from "../../../api.js";

Chart.register(CategoryScale);

function Home() {
	const { currentUser } = useContext(AuthContext);
	const [recentEats, setRecentEats] = useState([]);
	const [goals, setGoals] = useState([0, 0, 0, 0]);
	const [hasGoals, setHasGoals] = useState(false);
	const [currentMacros, setCurrentMacros] = useState([0, 0, 0, 0]);
	const [progress, setProgress] = useState([0, 0, 0, 0]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);
	const [chartData, setChartData] = useState({
		labels: ["Fats", "Carbs", "Protein"],
		datasets: [
			{
				label: "Breakdown of Macronutrients",
				data: [120, 150, 90],
			},
		],
	});

	useEffect(() => {
		getRecentEats();
		getMacroData();

		setTimeout(() => setLoading(false), 1000);
		// setLoading(false);
	}, []);

	const getMacroData = async () => {
		const macroResponse = await fetch(API_URL + "/api/eats/dailyMacros", {
			method: "GET",
			headers: {
				"Content-Type": "application/JSON",
				Authorization: "Bearer " + currentUser.token,
			},
		});

		const macroJson = await macroResponse.json();

		if (!macroResponse.ok) console.log(macroJson.error);
		else setCurrentMacros(macroJson);

		const goalResponse = await fetch(API_URL + "/api/eats/macroGoals", {
			method: "GET",
			headers: {
				"Content-Type": "application/JSON",
				Authorization: "Bearer " + currentUser.token,
			},
		});

		const goalJson = await goalResponse.json();

		if (!goalResponse.ok) {
			console.log(goalJson.error);
		} else {
			setGoals(goalJson);

			if (goalJson.some((item) => item !== 0)) setHasGoals(true);
		}

		let diff = [];

		for (var i = 0; i < macroJson.length; i++)
			diff.push(Math.round(goalJson[i] - macroJson[i]));

		setProgress(diff);
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
					{!loading ? (
						<div>
							{!hasGoals ? (
								<div className="no-goals">
									<h2>Time to set some goals!</h2>
									<Link to="/dashboard/goals">
										<button>SET GOALS</button>
									</Link>
								</div>
							) : (
								<div className="goals">
									<div className="progress-bar">
										<CircularProgressbarWithChildren
											value={currentMacros[0]}
											maxValue={goals[0]}
											styles={buildStyles({
												// textSize: "10px",
												// textColor: progress[0] <= 0 ? "#28a745" : "",
												pathColor: progress[0] <= 0 ? "#28a745" : "",
											})}
										>
											<div className="dial-content">
												<strong>{Math.abs(progress[0])}</strong>
												<br></br>
												{progress[0] > 0 ? "Remaining" : "Over"}
											</div>
										</CircularProgressbarWithChildren>
										<span>Calories</span>
									</div>
									<div className="progress-bar">
										<CircularProgressbarWithChildren
											value={currentMacros[2]}
											maxValue={goals[2]}
											styles={buildStyles({
												textSize: "10px",
												textColor: progress[2] <= 0 ? "#28a745" : "",
												pathColor: progress[2] <= 0 ? "#28a745" : "",
											})}
										>
											<div className="dial-content">
												<strong>{Math.abs(progress[2])}g</strong>
												<br></br>
												{progress[2] > 0 ? "Remaining" : "Over"}
											</div>
										</CircularProgressbarWithChildren>
										<span>Carbs</span>
									</div>
									<div className="progress-bar">
										<CircularProgressbarWithChildren
											value={currentMacros[3]}
											maxValue={goals[3]}
											styles={buildStyles({
												textSize: "10px",
												textColor: progress[3] <= 0 ? "#28a745" : "",
												pathColor: progress[3] <= 0 ? "#28a745" : "",
											})}
										>
											<div className="dial-content">
												<strong>{Math.abs(progress[3])}g</strong>
												<br></br>
												{progress[3] > 0 ? "Remaining" : "Over"}
											</div>
										</CircularProgressbarWithChildren>
										<span>Protein</span>
									</div>
									<div className="progress-bar">
										<CircularProgressbarWithChildren
											value={currentMacros[1]}
											maxValue={goals[1]}
											styles={buildStyles({
												textSize: "10px",
												textColor: progress[1] <= 0 ? "#28a745" : "",
												pathColor: progress[1] <= 0 ? "#28a745" : "",
											})}
										>
											<div className="dial-content">
												<strong>{Math.abs(progress[1])}g</strong>
												<br></br>
												{progress[1] > 0 ? "Remaining" : "Over"}
											</div>
										</CircularProgressbarWithChildren>
										<span>Fats</span>
									</div>
								</div>
							)}
						</div>
					) : (
						<div></div>
					)}
				</div>
				<div className="chart">
					<div className="chart-container">
						<Doughnut
							data={chartData}
							options={{
								plugins: {
									title: {
										display: true,
										text: "Breakdown of Macronutrients",
									},
								},
							}}
						/>
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
