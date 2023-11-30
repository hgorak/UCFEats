import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { ItemsContext } from "../../context/ItemsContext.jsx";
import Accordion from "react-bootstrap/Accordion";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";
import { IconContext } from "react-icons";
import { AiOutlinePlus } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

import { API_URL } from "../../../api.js";

function Food() {
	const { currentUser } = useContext(AuthContext);
	const { restaurantItems, setRestaurantItems } = useContext(ItemsContext);
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alerts, setAlerts] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [allItems, setAllItems] = useState([]);

	useEffect(() => {
		fetchRawItems();

		// Automatically hide toasts after a delay
		const hideAlerts = () => {
			setTimeout(() => {
				setAlerts((prevAlerts) => prevAlerts.slice(1));
			}, 3000); // Adjust the delay (in milliseconds) as needed
		};

		if (alerts.length > 0) {
			hideAlerts();
		}
	}, [alerts]);

	const fetchRawItems = async () => {
		const response = await fetch(API_URL + "/api/items/all", {
			method: "GET",
			headers: {
				"Content-Type": "application/JSON",
				Authorization: "Bearer " + currentUser.token,
			},
		});

		const json = await response.json();

		if (!response.ok) {
			console.log("ERROR IN FETCHING ALL");
		}

		if (response.ok) {
			setAllItems(json);
		}
	};

	// record an eat and show success or error alert
	const addEat = async (items, itemIndex) => {
		const itemName = items[itemIndex].Name;
		console.log(itemName);
		const response = await fetch(API_URL + "/api/eats/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/JSON",
				Authorization: "Bearer " + currentUser.token,
			},
			body: JSON.stringify({ name: itemName }),
		});

		const json = await response.json();

		console.log(json);
		if (!response.ok) {
			setAlertVariant("danger");
			setAlertMessage(json.error);
			setShowAlert(true);
		}

		if (response.ok) {
			// setAlertVariant("success");
			// setAlertMessage(itemName + " added!");

			const newAlert = {
				id: Date.now(),
				title: "Eat Recorded!",
				body: itemName + " has been added!",
			};

			setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
		}
	};

	const handleCloseAlert = (id) => {
		setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
	};

	const handleSearch = (query) => {
		const filteredResults = allItems.filter((item) =>
			Object.values(item).some((value) =>
				String(value).toLowerCase().includes(query.toLowerCase())
			)
		);

		setSearchResults(filteredResults);
	};

	const handleChange = (e) => {
		const query = e.target.value;
		setSearchQuery(query);
		handleSearch(query);
	};

	return (
		<div className="food">
			<div className="food-header">
				<div class="food-hero">
					<h2>Restaurants</h2>
					<span>All of UCF's food options. All in one place.</span>
				</div>
			</div>
			{/* <Alert show={showAlert} variant={alertVariant}>
				{alertMessage}
			</Alert> */}
			<ToastContainer
				position="top-end"
				className="p-3"
				style={{
					position: "fixed",
					top: "10px",
					right: "10px",
					// marginTop: `${alerts.length * 60}px`, // Adjust the margin to stack toasts
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
						<Toast.Body>{alert.body}</Toast.Body>
					</Toast>
				))}
			</ToastContainer>
			<input class="search-bar" onChange={handleChange}></input>
			{!searchQuery ? (
				<Accordion>
					{restaurantItems.map(([restaurant, items], index) => (
						<Accordion.Item eventKey={index} key={index}>
							<Accordion.Header>{restaurant}</Accordion.Header>
							<Accordion.Body>
								<table className="food-table">
									<thead>
										<th>Name</th>
										<th>Calories</th>
										<th>Price</th>
										<th>Protein</th>
										<th>Carbohydrates</th>
										<th>Fats</th>
										<th></th>
									</thead>
									<tbody>
										{items.map((item, itemIndex) => (
											<tr>
												<td className="name">{item.Name}</td>
												<td className="calories">{item.Calories}</td>
												<td className="price">${item.Price}</td>
												<td className="protein">{item.Protein}g</td>
												<td className="carbs">{item.Carbs}g</td>
												<td className="fats">{item.Fat}g</td>
												<td className="buttons">
													<IconContext.Provider
														value={{ color: "black", size: "25px" }}
													>
														<button
															onClick={() => {
																addEat(items, itemIndex);
															}}
															className="add"
														>
															<AiOutlinePlus />
														</button>
														<button
															// onClick={() => {
															// 	addEat(items, itemIndex);
															// }}
															className="add"
														>
															<FaRegHeart />
														</button>
													</IconContext.Provider>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</Accordion.Body>
						</Accordion.Item>
					))}
				</Accordion>
			) : (
				<div>
					<ListGroup>
						{searchResults.map((result) => (
							<ListGroup.Item>
								<div className="item">
									<div className="subheading">
										<strong>{result.Name}</strong>
										{result.locationName}
									</div>
								</div>
							</ListGroup.Item>
						))}
					</ListGroup>
				</div>
			)}
		</div>
	);
}

export default Food;
