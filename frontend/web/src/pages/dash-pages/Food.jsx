import React, { useState, useContext, useEffect } from "react";
import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { ItemsContext } from "../../context/ItemsContext.jsx";
import Accordion from "react-bootstrap/Accordion";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";
import { IconContext } from "react-icons";
import { AiOutlinePlus } from "react-icons/ai";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

import { API_URL } from "../../../api.js";

function Food() {
	const { currentUser } = useContext(AuthContext);
	//const { restaurantItems, setRestaurantItems } = useContext(ItemsContext);
	const [restaurantItems, setRestaurantItems] = useState([]);
	const [restaurants, setRestaurants] = useState([]);
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alerts, setAlerts] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [allItems, setAllItems] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		fetchRestaurants();
		navigate("/dashboard/food/Favorites");
	}, []);

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

	const fetchRestaurants = async () => {
		const response = await fetch(API_URL + "/api/stores/all", {
			method: "GET",
			headers: {
				"Content-Type": "application/JSON",
				Authorization: "Bearer " + currentUser.token,
			},
		});

		const restaurants = await response.json();

		if (!response.ok) {
			console.log("ERROR: failed to fetch restaurants");
		} else {
			setRestaurants(restaurants);
		}
	};

	// const fetchRestaurants = async (event) => {
	// 	const restaurantResponse = await fetch(API_URL + "/api/stores/all", {
	// 		method: "GET",
	// 		headers: {
	// 			"Content-Type": "application/JSON",
	// 			Authorization: "Bearer " + currentUser.token,
	// 		},
	// 	});

	// 	const restaurants = await restaurantResponse.json();

	// 	if (!restaurantResponse.ok) {
	// 		console.log("ERROR: failed to fetch restaurants");
	// 	}

	// 	if (restaurantResponse.ok) {
	// 		const favoritesResponse = await fetch(API_URL + "/api/eats/favorite", {
	// 			method: "GET",
	// 			headers: {
	// 				"Content-Type": "application/JSON",
	// 				Authorization: "Bearer " + currentUser.token,
	// 			},
	// 		});

	// 		const favoriteIDs = await favoritesResponse.json();
	// 		console.log(favoriteIDs);

	// 		const promises = restaurants.map(async (restaurant) => {
	// 			const itemResponse = await fetch(API_URL + "/api/items/", {
	// 				method: "POST",
	// 				headers: {
	// 					"Content-Type": "application/JSON",
	// 					Authorization: "Bearer " + currentUser.token,
	// 				},
	// 				body: JSON.stringify({
	// 					name: restaurant.Name,
	// 				}),
	// 			});

	// 			const items = await itemResponse.json();

	// 			items.forEach((item) => {
	// 				item.favorited = favoriteIDs.includes(item._id);
	// 			});

	// 			return { restaurant: restaurant, items: items };
	// 		});

	// 		const results = await Promise.all(promises);

	// 		console.log(results);

	// 		// Now 'results' array will have the items in the original order
	// 		const restaurantItemsMap = new Map(
	// 			results.map((result) => [result.restaurant.Name, result.items])
	// 		);

	// 		// Map associating restaurants with their items
	// 		setRestaurantItems(Array.from(restaurantItemsMap.entries()));

	// 		// console.log(
	// 		// 	"Data before storing in localStorage:",
	// 		// 	Array.from(restaurantItemsMap.entries())
	// 		// );

	// 		// localStorage.setItem(
	// 		// 	"restaurantItems",
	// 		// 	JSON.stringify(Array.from(restaurantItemsMap.entries()))
	// 		// );

	// 		// // localStorage.setItem("restaurantItems", restaurantItemsMap);
	// 		// navigate("/dashboard/");
	// 	}
	// };

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

	const addFavorite = async (items, itemIndex) => {
		const itemName = items[itemIndex].Name;
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

	const deleteFavorite = async (items, itemIndex) => {
		const itemName = items[itemIndex].Name;
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

	const handleFavorite = (favorited, items, itemIndex) => {
		favorited ? deleteFavorite(items, itemIndex) : addFavorite(items, itemIndex);
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
			<div className="restaurants">
				<NavLink to="/dashboard/food/Favorites">
					{({ isActive }) => (
						<button className={isActive ? "clicked" : "restaurant-container"}>
							Favorites
						</button>
					)}
				</NavLink>
				{restaurants.map((restaurant) => (
					<NavLink to={`/dashboard/food/${restaurant.Name}`}>
						{({ isActive }) => (
							<button className={isActive ? "clicked" : "restaurant-container"}>
								{restaurant.Name}
							</button>
						)}
					</NavLink>
				))}
			</div>
			<div className="items">
				<Outlet context={AuthContext} />
			</div>
		</div>
	);
}

export default Food;
