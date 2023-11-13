import React, { useState, useEffect, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { ItemsContext } from "../../context/ItemsContext.jsx";
import Accordion from "react-bootstrap/Accordion";
import { IconContext } from "react-icons";
import { AiOutlinePlus, AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { API_URL } from "../../../api.js";
import "../../styles.scss";

function Food() {
	const { currentUser } = useContext(AuthContext);
	const { restaurantItems, setRestaurantItems } = useContext(ItemsContext);
	const [error, setError] = useState("");

	const addEat = async (items, itemIndex) => {
		const itemName = items[itemIndex].Name;

		const response = await fetch(API_URL + "/api/items/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/JSON",
				Authorization: "Bearer " + currentUser.token,
			},
			body: JSON.stringify({ name: itemName }),
		});

		const json = await response.json();

		if (!response.ok) console.log(json.error);
	};

	return (
		<div className="food">
			<div className="food-header">
				<div class="food-hero">
					<h2>Eats</h2>
					<span>All of UCF's food options. All in one place.</span>
				</div>
			</div>

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
												</IconContext.Provider>
												<IconContext.Provider
													value={{ color: "black", size: "25px" }}
												>
													<button>
														<AiOutlineHeart />
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
		</div>
	);
}

export default Food;
