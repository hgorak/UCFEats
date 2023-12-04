import React, { useState, useContext, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";

import { API_URL } from "../../../api.js";

function Food() {
	const { currentUser } = useContext(AuthContext);
	const [restaurants, setRestaurants] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		fetchRestaurants();
		navigate("/dashboard/food/Favorites");
	}, []);

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
