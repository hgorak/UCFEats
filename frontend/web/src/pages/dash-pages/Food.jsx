import React, { useState, useEffect, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import Accordion from "react-bootstrap/Accordion";

import { API_URL } from "../../../api.js";
import "../../styles.scss";

const Food = () => {
	const { currentUser } = useContext(AuthContext);
	const [fetched, setFetched] = useState(false);
	const [data, setData] = useState(new Map());
	const [restaurants, setRestaurants] = useState([]);

	useEffect(() => {
		if (!fetched) {
			fetchRestaurants();
		}
	}, [fetched, data]);

	const fetchRestaurants = async (event) => {
		setFetched(false);
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

		// console.log(restaurants);
		if (restaurantResponse.ok) {
			setRestaurants(restaurants);

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
					// console.log(items);

					// Store items in the Map with restaurant as the key
					restaurantItemsMap.set(restaurant.Name, items);
				})
			);

			// Now you have a Map associating restaurants with their items
			setData(restaurantItemsMap);
			setFetched(true);
		}
	};

	return (
		<div className="food">
			<div className="food-header">
				<h1>Restaurants</h1>
				<input placeholder="Search" />
			</div>

			<Accordion>
				{fetched &&
					Array.from(data.entries()).map(([restaurantName, items], index) => (
						<Accordion.Item eventKey={index}>
							<Accordion.Header>{restaurantName}</Accordion.Header>
							<Accordion.Body>
								<table className="food-table">
									<thead>
										<th>Name</th>
										<th>Calories</th>
										<th>Price</th>
										<th>Protein</th>
										<th>Carbohydrates</th>
										<th>Fats</th>
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
											</tr>
										))}
									</tbody>
								</table>
							</Accordion.Body>
						</Accordion.Item>
					))}
			</Accordion>
		</div>
	);
};

export default Food;
