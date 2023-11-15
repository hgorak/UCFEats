import React, { useContext } from "react";
import { ItemsContext } from "../../context/ItemsContext.jsx";
import { API_URL } from "../../../api.js";
import "../../styles.scss";

const Favorites = () => {
	const { restaurantItems, setRestaurantItems } = useContext(ItemsContext);

	return (
		<div className="food">
			<div className="food-header">
				<div class="food-hero">
					<h2>Favorites</h2>
					<span>Your favorite items. Don't worry. We won't judge.</span>
				</div>
			</div>
		</div>
	);
};

export default Favorites;
