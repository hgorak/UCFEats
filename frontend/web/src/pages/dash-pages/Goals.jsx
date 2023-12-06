import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { API_URL } from "../../../api.js";

function Goals() {
	const { currentUser } = useContext(AuthContext);
	const [calories, setCalories] = useState(0);
	const [protein, setProtein] = useState(0);
	const [fats, setFats] = useState(0);
	const [carbs, setCarbs] = useState(0);
	const [alerts, setAlerts] = useState([]);

	useEffect(() => {
		fetchGoals();

		const hideAlerts = () => {
			setTimeout(() => {
				setAlerts((prevAlerts) => prevAlerts.slice(1));
			}, 3000); // Adjust the delay (in milliseconds) as needed
		};

		if (alerts.length > 0) {
			hideAlerts();
		}
	}, []);

	const fetchGoals = async () => {
		const response = await fetch(API_URL + "/api/eats/macroGoals", {
			method: "GET",
			headers: {
				"Content-Type": "application/JSON",
				Authorization: "Bearer " + currentUser.token,
			},
		});

		const json = await response.json();

		if (!response.ok) {
			console.log("ERROR IN FETCHING GOALS");
		}

		if (response.ok) {
			setCalories(json[0]);
			setFats(json[1]);
			setCarbs(json[2]);
			setProtein(json[3]);
		}
	};

	const handleUpdate = async (event) => {
		event.preventDefault();
		const response = await fetch(API_URL + "/api/eats/setMacroGoal", {
			method: "POST",
			headers: {
				"Content-Type": "application/JSON",
				Authorization: "Bearer " + currentUser.token,
			},
			body: JSON.stringify({
				calories: calories,
				fat: fats,
				carbs: carbs,
				protein: protein,
			}),
		});

		const json = await response.json();

		if (!response.ok) {
			console.log("ERROR IN FETCHING GOALS");
		}

		if (response.ok) {
			const newAlert = {
				id: Date.now(),
				title: "Goals Updated!",
			};

			setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
		}
	};

	return (
		<div className="goals">
			<ToastContainer
				position="top-end"
				className="p-3"
				style={{
					position: "fixed",
					top: "10px",
					right: "10px",
				}}
			>
				{alerts.map((alert) => (
					<Toast
						key={alert.id}
						show
						onClose={() => handleCloseAlert(alert.id)}
						delay={3000}
						autohide
						className="toast-slide"
					>
						<Toast.Header>
							<strong className="me-auto">{alert.title}</strong>
						</Toast.Header>
					</Toast>
				))}
			</ToastContainer>
			<div className="update">
				<h3>Update your Goals</h3>
				<span>
					To help us update your personalized dietary goals, please update your goals by
					making any changes to the values below.
				</span>
				<Form noValidate onSubmit={handleUpdate}>
					<Form.Group>
						<FloatingLabel label="Calories">
							<Form.Control
								required
								type="number"
								onChange={(e) => {
									setCalories(e.target.value);
								}}
								value={calories}
							/>
							<Form.Control.Feedback type="invalid">
								Please enter a calorie goal.
							</Form.Control.Feedback>
						</FloatingLabel>
					</Form.Group>
					<Form.Group>
						<FloatingLabel label="Carbohydrates (g)">
							<Form.Control
								required
								type="number"
								onChange={(e) => {
									setCarbs(e.target.value);
								}}
								value={carbs}
							/>
							<Form.Control.Feedback type="invalid">
								Please enter a carbohydrate goal.
							</Form.Control.Feedback>
						</FloatingLabel>
					</Form.Group>
					<Form.Group>
						<FloatingLabel label="Protein (g)">
							<Form.Control
								required
								type="number"
								onChange={(e) => {
									setProtein(e.target.value);
								}}
								value={protein}
							/>
							<Form.Control.Feedback type="invalid">
								Please enter a protein goal.
							</Form.Control.Feedback>
						</FloatingLabel>
					</Form.Group>
					<Form.Group>
						<FloatingLabel label="Fats (g)">
							<Form.Control
								required
								type="number"
								onChange={(e) => {
									setFats(e.target.value);
								}}
								value={fats}
							/>
							<Form.Control.Feedback type="invalid">
								Please enter a fat goal.
							</Form.Control.Feedback>
						</FloatingLabel>
					</Form.Group>
					<button type="submit">Update</button>
				</Form>
			</div>
		</div>
	);
}

export default Goals;
