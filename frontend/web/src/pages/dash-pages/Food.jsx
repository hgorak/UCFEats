import React, { useState, useContext, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";

import cfa from "../../images/cfa.png";
import dunkin from "../../images/dunkin.jpg";
import einstein from "../../images/einstein.jpg";
import huey from "../../images/huey.png";
import panda from "../../images/panda.png";
import qdoba from "../../images/qdoba.jpg";
import smoothie from "../../images/smoothie.jpg";
import starbucks from "../../images/starbucks.png";
import steak from "../../images/steak.png";

import { API_URL } from "../../../api.js";

const imgs = [cfa, dunkin, einstein, huey, panda, qdoba, smoothie, starbucks, steak];

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
						<button
							className={
								isActive ? "restaurant-container clicked" : "restaurant-container"
							}
						>
							Favorites
						</button>
					)}
				</NavLink>
				{restaurants.map((restaurant, index) => (
					<NavLink to={`/dashboard/food/${restaurant.Name}`}>
						{({ isActive }) => (
							<button
								className={
									isActive
										? "restaurant-container clicked"
										: `restaurant-container restaurant-${index}`
								}
							>
								<img
									className={`img-${index}`}
									src={imgs[index]}
									alt={`${restaurant.Name} logo`}
								/>
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
