import React, { useContext, useEffect, useState } from "react";
import { ItemsContext } from "../../context/ItemsContext.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import ListGroup from "react-bootstrap/ListGroup";

import { API_URL } from "../../../api.js";
import "../../styles.scss";

const Favorites = () => {
	const { currentUser } = useContext(AuthContext);
	const { restaurantItems, setRestaurantItems } = useContext(ItemsContext);
	const [loading, setLoading] = useState(true);
	const [favorites, setFavorites] = useState();
	const [allItems, setAllItems] = useState([]);

	useEffect(() => {
		getFavorites();
		setTimeout(() => setLoading(false), 1000);
	}, []);

	const getFavorites = async () => {
		const response = await fetch(API_URL + "/api/items/all", {
			method: "GET",
			headers: {
				"Content-Type": "application/JSON",
				Authorization: "Bearer " + currentUser.token,
			},
		});

		const allItems = await response.json();

		if (!response.ok) {
			console.log("ERROR IN FETCHING ALL");
		}

		if (response.ok) {
			const response = await fetch(API_URL + "/api/eats/favorite", {
				method: "GET",
				headers: {
					"Content-Type": "application/JSON",
					Authorization: "Bearer " + currentUser.token,
				},
			});

			const favoriteIDs = await response.json();
			console.log(favoriteIDs);

			if (!response.ok) {
				console.log("ERROR IN FETCHING favorites");
			}

			if (response.ok) {
				let favoriteItems = allItems.filter((item) => favoriteIDs.includes(item._id));
				setFavorites(favoriteItems);
			}
		}
	};

	return (
		<div className="favorites">
			<div className="food-header">
				<div class="food-hero">
					<h2>Favorites</h2>
					<span>Your favorite items. Don't worry. We won't judge.</span>
				</div>
			</div>
			<div>
				{!loading && (
					<ListGroup>
						{favorites.map((result) => (
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
				)}
			</div>
		</div>
	);
};

export default Favorites;
