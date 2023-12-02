import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { IconContext } from "react-icons";
import { AiOutlinePlus } from "react-icons/ai";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

import { API_URL } from "../../../api.js";

function RestaurantItems() {
	const { currentUser } = useContext(AuthContext);
	const { restaurantName } = useParams();
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [alerts, setAlerts] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		fetchItems();

		const hideAlerts = () => {
			setTimeout(() => {
				setAlerts((prevAlerts) => prevAlerts.slice(1));
			}, 3000); // Adjust the delay (in milliseconds) as needed
		};

		if (alerts.length > 0) {
			hideAlerts();
		}
		setLoading(false);
	}, [alerts]);

	const fetchItems = async () => {
		const response = await fetch(API_URL + "/api/items/", {
			method: "POST",
			headers: {
				"Content-Type": "application/JSON",
				Authorization: "Bearer " + currentUser.token,
			},
			body: JSON.stringify({ name: restaurantName }),
		});

		const items = await response.json();

		if (!response.ok) {
			console.log(items.error);
		} else {
			const favoritesResponse = await fetch(API_URL + "/api/eats/favorite", {
				method: "GET",
				headers: {
					"Content-Type": "application/JSON",
					Authorization: "Bearer " + currentUser.token,
				},
			});

			const favoriteIDs = await favoritesResponse.json();
			console.log(favoriteIDs);

			items.forEach((item) => {
				item.favorited = favoriteIDs.includes(item._id);
			});

			setItems(items);
		}
	};

	// record an eat and show success or error alert
	const addEat = async (index) => {
		const itemName = items[index].Name;
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

	const addFavorite = async (index) => {
		const itemName = items[index].Name;
		console.log(itemName);

		const response = await fetch(API_URL + "/api/eats/favorite", {
			method: "POST",
			headers: {
				"Content-Type": "application/JSON",
				Authorization: "Bearer " + currentUser.token,
			},
			body: JSON.stringify({ name: itemName }),
		});

		const json = await response.json();

		if (!response.ok) {
			console.log(json.error);
		}

		if (response.ok) {
			const newAlert = {
				id: Date.now(),
				title: "Eat Favorited!",
				body: itemName + " has been favorited!",
			};

			setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
		}
	};

	const deleteFavorite = async (index) => {
		const itemName = items[index].Name;
		console.log(itemName);

		const response = await fetch(API_URL + "/api/eats/favorite", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/JSON",
				Authorization: "Bearer " + currentUser.token,
			},
			body: JSON.stringify({ name: itemName }),
		});

		const json = await response.json();

		if (!response.ok) {
			console.log(json.error);
		}

		if (response.ok) {
			const newAlert = {
				id: Date.now(),
				title: "Eat Unfavorited!",
				body: itemName + " has been removed from favorites!",
			};

			setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
		}
	};

	const handleFavorite = (favorited, index) => {
		favorited ? deleteFavorite(index) : addFavorite(index);
	};

	const handleCloseAlert = (id) => {
		setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
	};

	const handleSearch = (query) => {
		const filteredResults = items.filter((item) =>
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
		<div>
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
						<Toast.Body>{alert.body}</Toast.Body>
					</Toast>
				))}
			</ToastContainer>
			<input class="search-bar" onChange={handleChange}></input>
			<div className="grid-container">
				{searchQuery ? (
					<>
						{searchResults.map((item, index) => (
							<div className="item">
								<strong>{item.Name}</strong>
								<p>Calories: {item.Calories}</p>
								<p>Carbs: {item.Carbs}g</p>
								<p>Protein: {item.Protein}g</p>
								<p>Fat: {item.Fat}g</p>
								<div>
									<IconContext.Provider value={{ color: "black", size: "25px" }}>
										<button
											onClick={() => {
												addEat(index);
											}}
											className="add"
										>
											<AiOutlinePlus />
										</button>
										<button
											onClick={() => {
												item.favorited = !item.favorited;
												handleFavorite(!item.favorited, index);
											}}
											className="add"
										>
											{item.favorited ? <FaHeart /> : <FaRegHeart />}
										</button>
									</IconContext.Provider>
								</div>
							</div>
						))}
					</>
				) : (
					<>
						{items.map((item, index) => (
							<div className="item">
								<strong>{item.Name}</strong>
								<p>Calories: {item.Calories}</p>
								<p>Carbs: {item.Carbs}g</p>
								<p>Protein: {item.Protein}g</p>
								<p>Fat: {item.Fat}g</p>
								<div>
									<IconContext.Provider value={{ color: "black", size: "25px" }}>
										<button
											onClick={() => {
												addEat(index);
											}}
											className="add"
										>
											<AiOutlinePlus />
										</button>
										<button
											onClick={() => {
												item.favorited = !item.favorited;
												handleFavorite(!item.favorited, index);
											}}
											className="add"
										>
											{item.favorited ? <FaHeart /> : <FaRegHeart />}
										</button>
									</IconContext.Provider>
								</div>
							</div>
						))}
					</>
				)}
			</div>
		</div>
	);
}

export default RestaurantItems;
