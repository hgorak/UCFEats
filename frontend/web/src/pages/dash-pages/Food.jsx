import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { ItemsContext } from "../../context/ItemsContext.jsx";
import Accordion from "react-bootstrap/Accordion";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";
import { IconContext } from "react-icons";
import { AiOutlinePlus } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";

import { API_URL } from "../../../api.js";
import "../../styles.scss";

function Food() {
	const { currentUser } = useContext(AuthContext);
	const { restaurantItems, setRestaurantItems } = useContext(ItemsContext);
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertVariant, setAlertVariant] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [allItems, setAllItems] = useState([]);

	useEffect(() => {
		fetchRawItems();
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

			window.setTimeout(() => {
				setShowAlert(false);
			}, 3000);
		}

		if (response.ok) {
			setAlertVariant("success");
			setAlertMessage(itemName + " added!");
			setShowAlert(true);

			window.setTimeout(() => {
				setShowAlert(false);
			}, 3000);
		}
	};

	// favorite or unfavorite an item
	// const toggleFavorite = (foodItemId, isCurrentlyFavorite) => {
	// 	const updatedFoodItems = restaurantItems.map(([restaurant, items]) =>
	// 		item.id === foodItemId ? { ...item, isFavorite: !isCurrentlyFavorite } : item
	// 	);

	// 	// Update the local state
	// 	setRestaurantItems(updatedFoodItems);

	// 	// Update the server or API with the new favorite status
	// 	if (!isCurrentlyFavorite) {
	// 		// If not currently favorite, add to favorites
	// 		fetch(API_URL + "/api/eats/favorite", {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify({ foodItemId }),
	// 		})
	// 			.then((response) => response.json())
	// 			.then((data) => console.log("Added to favorites:", data))
	// 			.catch((error) => console.error("Error adding to favorites:", error));
	// 	} else {
	// 		// If currently favorite, remove from favorites
	// 		fetch(API_URL + "/api/eats/favorite", {
	// 			method: "DELETE",
	// 		})
	// 			.then((response) => response.json())
	// 			.then((data) => console.log("Removed from favorites:", data))
	// 			.catch((error) => console.error("Error removing from favorites:", error));
	// 	}
	// };

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
			<Alert show={showAlert} variant={alertVariant}>
				{alertMessage}
			</Alert>
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
