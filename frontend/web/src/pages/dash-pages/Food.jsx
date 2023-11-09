import React, { useState, useEffect, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { ItemsContext } from "../../context/ItemsContext.jsx";
import Accordion from "react-bootstrap/Accordion";

import { API_URL } from "../../../api.js";
import "../../styles.scss";

const Food = () => {
	const { currentUser } = useContext(AuthContext);
	const [fetched, setFetched] = useState(false);
	const [itemsFetched, setItemsFetched] = useState(false);
	const [data, setData] = useState(new Map());
	const [restaurants, setRestaurants] = useState([]);
	const [selectedRestaurant, setSelectedRestaurant] = useState(null);

	const { restaurantItems, setRestaurantItems } = useContext(ItemsContext);

	return (
		<div className="food">
			<div className="food-header">
				<h1>Restaurants</h1>
				<input placeholder="Search" />
			</div>

			<Accordion>
				{Array.from(restaurantItems.entries()).map(([restaurantName, items], index) => (
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
