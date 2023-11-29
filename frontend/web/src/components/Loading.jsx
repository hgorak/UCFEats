import React, { useContext, useEffect } from "react";
import { ItemsContext } from "../context/ItemsContext";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../../api.js";

const Loading = () => {
	const { currentUser } = useContext(AuthContext);
	const { restaurantItems, setRestaurantItems } = useContext(ItemsContext);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchRestaurants = async (event) => {
			const restaurantResponse = await fetch(API_URL + "/api/stores/all", {
				method: "GET",
				headers: {
					"Content-Type": "application/JSON",
					Authorization: "Bearer " + currentUser.token,
				},
			});

			const restaurants = await restaurantResponse.json();

			if (!restaurantResponse.ok) {
				console.log("ERROR: failed to fetch restaurants");
			}

			if (restaurantResponse.ok) {
				const promises = restaurants.map(async (restaurant) => {
					const itemResponse = await fetch(API_URL + "/api/items/", {
						method: "POST",
						headers: {
							"Content-Type": "application/JSON",
							Authorization: "Bearer " + currentUser.token,
						},
						body: JSON.stringify({
							name: restaurant.Name,
						}),
					});

					const items = await itemResponse.json();

					return { restaurant: restaurant, items: items };
				});

				const results = await Promise.all(promises);

				// Now 'results' array will have the items in the original order
				const restaurantItemsMap = new Map(
					results.map((result) => [result.restaurant.Name, result.items])
				);

				// Map associating restaurants with their items
				setRestaurantItems(Array.from(restaurantItemsMap.entries()));

				console.log(
					"Data before storing in localStorage:",
					Array.from(restaurantItemsMap.entries())
				);

				localStorage.setItem(
					"restaurantItems",
					JSON.stringify(Array.from(restaurantItemsMap.entries()))
				);

				// localStorage.setItem("restaurantItems", restaurantItemsMap);
				navigate("/dashboard/");
			}
		};

		fetchRestaurants();
	}, [setRestaurantItems]);

	return <div className="loading">Whipping Up a Culinary Adventure...</div>;
};

export default Loading;
