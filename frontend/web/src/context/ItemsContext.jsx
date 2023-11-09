import { createContext, useState, useContext, useEffect } from "react";

export const ItemsContext = createContext();

export function ItemsContextProvider({ children }) {
	const storedRestaurantItems = JSON.parse(localStorage.getItem("restaurantItems"));
	const [restaurantItems, setRestaurantItems] = useState(storedRestaurantItems || new Map());

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
				// get items per restaurant
				const restaurantItemsMap = new Map();

				await Promise.all(
					restaurants.map(async (restaurant) => {
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

						// Store items in the Map with restaurant as the key
						restaurantItemsMap.set(restaurant.Name, items);
					})
				);

				// Map associating restaurants with their items
				setRestaurantItems(restaurantItemsMap);

				localStorage.setItem(
					"restaurantItems",
					JSON.stringify(Array.from(restaurantItemsMap.entries()))
				);
				navigate("/dashboard");
			}
		};

		if (!storedRestaurantItems) {
			fetchRestaurants();
		}

		console.log("in context");
		console.log(restaurantItems);
	}, [setRestaurantItems, storedRestaurantItems]);

	return (
		<ItemsContext.Provider value={{ restaurantItems, setRestaurantItems }}>
			{children}
		</ItemsContext.Provider>
	);
}
