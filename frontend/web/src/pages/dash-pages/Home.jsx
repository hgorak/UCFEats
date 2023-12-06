import React, { useState, useEffect, useContext } from "react";
import { Link, useOutletContext } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import { AuthContext } from "../../context/AuthContext.jsx";
import TimeSince from "../../components/TimeSince.jsx";
import Placeholder from "react-bootstrap/Placeholder";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import {
	CircularProgressbar,
	CircularProgressbarWithChildren,
	buildStyles,
} from "react-circular-progressbar";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { FaRegTrashAlt } from "react-icons/fa";
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
	const [showDelete, setShowDelete] = useState(false);
	const [deleteName, setDeleteName] = useState("");
	const [deleteTimestamp, setDeleteTimestamp] = useState("");
	const [loading, setLoading] = useState(true);
	const [chartData, setChartData] = useState([]);

	useEffect(() => {
		getRecentEats();
		getMacroData();
		setTimeout(() => setLoading(false), 500);
		// setLoading(false);
	}, [recentEats]);

	const getMacroData = async () => {
		const macroResponse = await fetch(API_URL + "/api/eats/dailyMacros", {
			method: "GET",
			headers: {
				"Content-Type": "application/JSON",
				Authorization: "Bearer " + currentUser.token,
			},
		});

		const macroJson = await macroResponse.json();
		var chartMacros = JSON.parse(JSON.stringify(macroJson));

		if (!macroResponse.ok) {
			console.log(macroJson.error);
		} else {
			console.log("macros: " + macroJson);
			setCurrentMacros(macroJson);
			chartMacros.shift();
			setChartData(chartMacros);
		}

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
			if (goalJson.some((item) => item !== 0)) setHasGoals(true);
			setGoals(goalJson);
			console.log("goals: " + goalJson);
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

	const deleteEat = async (itemName, timestamp) => {
		const response = await fetch(API_URL + "/api/eats/", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/JSON",
				Authorization: "Bearer " + currentUser.token,
			},
			body: JSON.stringify({
				name: itemName,
				time: timestamp,
			}),
		});

		const json = await response.json();

		if (!response.ok) {
			console.log(json.error);
		} else {
			console.log("deleted: " + itemName);
			recentEats = recentEats.filter((eat) => eat.Name !== itemName);
		}
	};

	const handleDelete = (itemName, timestamp) => {
		setDeleteName(itemName);
		setDeleteTimestamp(timestamp);

		setShowDelete(true);
	};

	const handleClose = () => {
		setDeleteName(null);
		setDeleteTimestamp(null);

		setShowDelete(false);
	};

	return (
		<div className="home">
			<Modal show={showDelete} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Delete Eat</Modal.Title>
				</Modal.Header>
				<Modal.Body>Are you sure you want to delete {deleteName}?</Modal.Body>
				<Modal.Footer>
					<Button
						variant="primary"
						onClick={() => {
							deleteEat(deleteName, deleteTimestamp);
							handleClose();
						}}
					>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
			<div className="charts">
				<div className="charts-hero">
					{!loading ? (
						<>
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
												pathColor: progress[0] <= 0 ? "#28a745" : "#966fd6",
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
												// textColor: progress[2] <= 0 ? "#28a745" : "",
												pathColor: progress[2] <= 0 ? "#28a745" : "#ff6182",
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
												// textColor: progress[3] <= 0 ? "#28a745" : "",
												pathColor: progress[3] <= 0 ? "#28a745" : "#ff9f40",
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
												// textColor: progress[1] <= 0 ? "#28a745" : "",
												pathColor: progress[1] <= 0 ? "#28a745" : "#35a1ec",
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
						</>
					) : (
						<div className="loading">
							<Spinner animation="border" />
						</div>
					)}
				</div>
				<div className="chart">
					{!loading && (
						<div className="chart-container">
							<h3>Macronutrient Breakdown</h3>
							<Doughnut
								data={{
									labels: ["Fats", "Carbs", "Protein"],
									datasets: [
										{
											label: "Breakdown of Macronutrients",
											data: chartData,
										},
									],
								}}
								options={{
									plugins: {
										title: {
											display: false,
											text: "Breakdown of Macronutrients",
										},
									},
								}}
							/>
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
								<Placeholder
									as={ListGroup.Item}
									animation="glow"
									style={{ border: "none" }}
								>
									<Placeholder xs={12} />
									<Placeholder xs={4} />
								</Placeholder>
								<Placeholder
									as={ListGroup.Item}
									animation="glow"
									style={{ border: "none" }}
								>
									<Placeholder xs={12} />
									<Placeholder xs={4} />
								</Placeholder>
								<Placeholder
									as={ListGroup.Item}
									animation="glow"
									style={{ border: "none" }}
								>
									<Placeholder xs={12} />
									<Placeholder xs={4} />
								</Placeholder>
								<Placeholder
									as={ListGroup.Item}
									animation="glow"
									style={{ border: "none" }}
								>
									<Placeholder xs={12} />
									<Placeholder xs={4} />
								</Placeholder>
								<Placeholder
									as={ListGroup.Item}
									animation="glow"
									style={{ border: "none" }}
								>
									<Placeholder xs={12} />
									<Placeholder xs={4} />
								</Placeholder>
								<Placeholder
									as={ListGroup.Item}
									animation="glow"
									style={{ border: "none" }}
								>
									<Placeholder xs={12} />
									<Placeholder xs={4} />
								</Placeholder>
								<Placeholder
									as={ListGroup.Item}
									animation="glow"
									style={{ border: "none" }}
								>
									<Placeholder xs={12} />
									<Placeholder xs={4} />
								</Placeholder>
								<Placeholder
									as={ListGroup.Item}
									animation="glow"
									style={{ border: "none" }}
								>
									<Placeholder xs={12} />
									<Placeholder xs={4} />
								</Placeholder>
								<Placeholder
									as={ListGroup.Item}
									animation="glow"
									style={{ border: "none" }}
								>
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
										<div className="subsubheading">
											<TimeSince timestamp={item.timestamp} />
											<div className="trash">
												<button
													onClick={() => {
														handleDelete(item.itemName, item.timestamp);
														// deleteEat(item.itemName, item.timestamp);
													}}
													className="add"
												>
													<FaRegTrashAlt />
												</button>
											</div>
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
