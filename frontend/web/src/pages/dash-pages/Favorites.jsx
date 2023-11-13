import React, { useState, useEffect, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { ItemsContext } from "../../context/ItemsContext.jsx";
import Accordion from "react-bootstrap/Accordion";

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
