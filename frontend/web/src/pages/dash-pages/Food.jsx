import React, { useState, useEffect, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import Accordion from "react-bootstrap/Accordion";

import { API_URL } from "../../../api.js";
import "../../styles.scss";

const Food = () => {
	const { currentUser } = useContext(AuthContext);
	// const cfa = [
	//     {
	//         "_id": "652715a2fc9fddd7e9e59275",
	//         "Name": "Chicken Sandwich",
	//         "Price": 4.95,
	//         "Calories": 420,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "65271784fc9fddd7e9e59277",
	//         "Name": "Spicy Chicken Sandwich",
	//         "Price": 5.25,
	//         "Calories": 450,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "652717a4fc9fddd7e9e59278",
	//         "Name": "8-ct Nuggets",
	//         "Price": 4.99,
	//         "Calories": 250,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "653fee54206d98417ee5147e",
	//         "Name": "Chicken Biscuit",
	//         "Price": 3.65,
	//         "Calories": 460,
	//         "Fat": 23,
	//         "Carbs": 45,
	//         "Protein": 19,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "653fef07206d98417ee5147f",
	//         "Name": "Spicy Chicken Biscuit",
	//         "Price": 3.89,
	//         "Calories": 450,
	//         "Fat": 22,
	//         "Carbs": 44,
	//         "Protein": 19,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "653fef79206d98417ee51481",
	//         "Name": "4-ct Chick-n-Minis",
	//         "Price": 4.65,
	//         "Calories": 360,
	//         "Fat": 13,
	//         "Carbs": 41,
	//         "Protein": 20,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "653feffc206d98417ee51482",
	//         "Name": "10-ct Chick-n-Minis",
	//         "Price": 11.59,
	//         "Calories": 910,
	//         "Fat": 34,
	//         "Carbs": 103,
	//         "Protein": 49,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "653ff0a0206d98417ee51483",
	//         "Name": "Egg White Grill",
	//         "Price": 4.99,
	//         "Calories": 300,
	//         "Fat": 8,
	//         "Carbs": 31,
	//         "Protein": 28,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "653ff0fa206d98417ee51484",
	//         "Name": "Hash Brown Scramble Burrito w/ nuggets",
	//         "Price": 4.95,
	//         "Calories": 700,
	//         "Fat": 40,
	//         "Carbs": 51,
	//         "Protein": 34,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "653ff254206d98417ee51485",
	//         "Name": "Hash Brown Scramble Burrito w/ sausage",
	//         "Price": 4.95,
	//         "Calories": 720,
	//         "Fat": 47,
	//         "Carbs": 46,
	//         "Protein": 28,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "653ff296206d98417ee51486",
	//         "Name": "Hash Brown Scramble Burrito w/ grilled filet",
	//         "Price": 4.95,
	//         "Calories": 650,
	//         "Fat": 36,
	//         "Carbs": 46,
	//         "Protein": 36,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "653ff3172f2a89a6c0fe8d88",
	//         "Name": "Hash Brown Scramble Burrito w/ spicy chicken",
	//         "Price": 4.95,
	//         "Calories": 660,
	//         "Fat": 37,
	//         "Carbs": 54,
	//         "Protein": 28,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "653ff3512f2a89a6c0fe8d89",
	//         "Name": "Hash Brown Scramble Burrito w/ bacon",
	//         "Price": 4.95,
	//         "Calories": 680,
	//         "Fat": 42,
	//         "Carbs": 46,
	//         "Protein": 30,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "653ff3882f2a89a6c0fe8d8a",
	//         "Name": "Hash Brown Scramble Burrito w/ no meat",
	//         "Price": 3.45,
	//         "Calories": 580,
	//         "Fat": 34,
	//         "Carbs": 47,
	//         "Protein": 22,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "653ff3b32f2a89a6c0fe8d8b",
	//         "Name": "Hash Brown Scramble Burrito w/ nuggets - no hash",
	//         "Price": 3.95,
	//         "Calories": 550,
	//         "Fat": 30,
	//         "Carbs": 38,
	//         "Protein": 33,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "653ff3f12f2a89a6c0fe8d8c",
	//         "Name": "Hash Brown Scramble Burrito w/ sausage - no hash",
	//         "Price": 3.95,
	//         "Calories": 570,
	//         "Fat": 37,
	//         "Carbs": 34,
	//         "Protein": 26,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "653ff41e2f2a89a6c0fe8d8d",
	//         "Name": "Hash Brown Scramble Burrito w/ grilled filet - no hash",
	//         "Price": 3.95,
	//         "Calories": 500,
	//         "Fat": 26,
	//         "Carbs": 34,
	//         "Protein": 35,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "653ff44e2f2a89a6c0fe8d8e",
	//         "Name": "Hash Brown Scramble Burrito w/ spicy chicken - no hash",
	//         "Price": 3.95,
	//         "Calories": 510,
	//         "Fat": 27,
	//         "Carbs": 41,
	//         "Protein": 27,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "653ff48c2f2a89a6c0fe8d8f",
	//         "Name": "Hash Brown Scramble Burrito w/ bacon - no hash",
	//         "Price": 3.95,
	//         "Calories": 540,
	//         "Fat": 32,
	//         "Carbs": 34,
	//         "Protein": 29,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "653ff4b82f2a89a6c0fe8d90",
	//         "Name": "Hash Brown Scramble Burrito w/ no meat - no hash",
	//         "Price": 3.05,
	//         "Calories": 440,
	//         "Fat": 24,
	//         "Carbs": 35,
	//         "Protein": 21,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "653ff4e32f2a89a6c0fe8d91",
	//         "Name": "Hash Brown Scramble Bowl w/ nuggets",
	//         "Price": 4.95,
	//         "Calories": 470,
	//         "Fat": 30,
	//         "Carbs": 19,
	//         "Protein": 29,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "653ff5482f2a89a6c0fe8d92",
	//         "Name": "Hash Brown Scramble Bowl w/ sausage",
	//         "Price": 4.95,
	//         "Calories": 480,
	//         "Fat": 37,
	//         "Carbs": 15,
	//         "Protein": 23,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "653ff5762f2a89a6c0fe8d93",
	//         "Name": "Hash Brown Scramble Bowl w/ grilled filet",
	//         "Price": 4.95,
	//         "Calories": 420,
	//         "Fat": 26,
	//         "Carbs": 15,
	//         "Protein": 31,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "653ff5a32f2a89a6c0fe8d94",
	//         "Name": "Hash Brown Scramble Bowl w/ spicy chicken",
	//         "Price": 4.95,
	//         "Calories": 490,
	//         "Fat": 32,
	//         "Carbs": 22,
	//         "Protein": 28,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "653ff5c32f2a89a6c0fe8d95",
	//         "Name": "Hash Brown Scramble Bowl w/ bacon",
	//         "Price": 4.95,
	//         "Calories": 450,
	//         "Fat": 32,
	//         "Carbs": 15,
	//         "Protein": 25,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "653ff5e52f2a89a6c0fe8d96",
	//         "Name": "Hash Brown Scramble Bowl w/ no meat",
	//         "Price": 3.45,
	//         "Calories": 350,
	//         "Fat": 24,
	//         "Carbs": 16,
	//         "Protein": 17,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "653ff61a2f2a89a6c0fe8d97",
	//         "Name": "Hash Brown Scramble Bowl w/ nuggets - no hash",
	//         "Price": 3.95,
	//         "Calories": 320,
	//         "Fat": 20,
	//         "Carbs": 7,
	//         "Protein": 28,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "653ff67c2f2a89a6c0fe8d98",
	//         "Name": "Hash Brown Scramble Bowl w/ sausage - no hash",
	//         "Price": 3.95,
	//         "Calories": 340,
	//         "Fat": 27,
	//         "Carbs": 2,
	//         "Protein": 21,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "653ff6a02f2a89a6c0fe8d99",
	//         "Name": "Hash Brown Scramble Bowl w/ grilled filet - no hash",
	//         "Price": 3.95,
	//         "Calories": 270,
	//         "Fat": 16,
	//         "Carbs": 2,
	//         "Protein": 30,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "653ff6c82f2a89a6c0fe8d9a",
	//         "Name": "Hash Brown Scramble Bowl w/ spicy chicken - no hash",
	//         "Price": 3.95,
	//         "Calories": 340,
	//         "Fat": 21,
	//         "Carbs": 10,
	//         "Protein": 27,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "653ff6f42f2a89a6c0fe8d9b",
	//         "Name": "Hash Brown Scramble Bowl w/ bacon - no hash",
	//         "Price": 3.95,
	//         "Calories": 300,
	//         "Fat": 22,
	//         "Carbs": 2,
	//         "Protein": 24,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "653ff71b2f2a89a6c0fe8d9c",
	//         "Name": "Hash Brown Scramble Bowl w/ no meat - no hash",
	//         "Price": 3.05,
	//         "Calories": 330,
	//         "Fat": 20,
	//         "Carbs": 9,
	//         "Protein": 29,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "65400e163d72cc6726f22a78",
	//         "Name": "Chicken, Egg and Cheese Biscuit",
	//         "Price": 4.55,
	//         "Calories": 550,
	//         "Fat": 28,
	//         "Carbs": 48,
	//         "Protein": 27,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "65400e5f3d72cc6726f22a79",
	//         "Name": "Bacon, Egg and Cheese Biscuit",
	//         "Price": 3.95,
	//         "Calories": 420,
	//         "Fat": 23,
	//         "Carbs": 38,
	//         "Protein": 16,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "65400e9a3d72cc6726f22a7a",
	//         "Name": "Sausage, Egg and Cheese Biscuit",
	//         "Price": 3.95,
	//         "Calories": 620,
	//         "Fat": 42,
	//         "Carbs": 38,
	//         "Protein": 22,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "65400ec53d72cc6726f22a7b",
	//         "Name": "Chicken, Egg and Cheese Muffin",
	//         "Price": 4.75,
	//         "Calories": 420,
	//         "Fat": 19,
	//         "Carbs": 37,
	//         "Protein": 27,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "65400f113d72cc6726f22a7c",
	//         "Name": "Bacon, Egg and Cheese Muffin",
	//         "Price": 4.15,
	//         "Calories": 310,
	//         "Fat": 13,
	//         "Carbs": 30,
	//         "Protein": 17,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "65400f683d72cc6726f22a7d",
	//         "Name": "Sausage, Egg and Cheese Muffin",
	//         "Price": 4.15,
	//         "Calories": 500,
	//         "Fat": 33,
	//         "Carbs": 30,
	//         "Protein": 23,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "65400fb33d72cc6726f22a7e",
	//         "Name": "Small Hash Browns",
	//         "Price": 1.59,
	//         "Calories": 270,
	//         "Fat": 18,
	//         "Carbs": 23,
	//         "Protein": 3,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "65400fde3d72cc6726f22a7f",
	//         "Name": "Large Hash Browns",
	//         "Price": 2.09,
	//         "Calories": 420,
	//         "Fat": 29,
	//         "Carbs": 35,
	//         "Protein": 4,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "6540100b3d72cc6726f22a80",
	//         "Name": "Greek Yogurt Parfait w/ Cookie Crumbs",
	//         "Price": 4.79,
	//         "Calories": 240,
	//         "Fat": 8,
	//         "Carbs": 31,
	//         "Protein": 12,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "6540104d3d72cc6726f22a81",
	//         "Name": "Greek Yogurt Parfait w/ Granola",
	//         "Price": 4.79,
	//         "Calories": 270,
	//         "Fat": 9,
	//         "Carbs": 36,
	//         "Protein": 13,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "654010973d72cc6726f22a82",
	//         "Name": "Small Fruit Cup",
	//         "Price": 3.15,
	//         "Calories": 50,
	//         "Fat": 0,
	//         "Carbs": 13,
	//         "Protein": 1,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "654010ce3d72cc6726f22a83",
	//         "Name": "Medium Fruit Cup",
	//         "Price": 4.09,
	//         "Calories": 60,
	//         "Fat": 0,
	//         "Carbs": 15,
	//         "Protein": 1,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "6540110a3d72cc6726f22a84",
	//         "Name": "Buttered Biscuit",
	//         "Price": 1.49,
	//         "Calories": 290,
	//         "Fat": 15,
	//         "Carbs": 37,
	//         "Protein": 4,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "654011453d72cc6726f22a85",
	//         "Name": "English Muffin",
	//         "Price": 1.69,
	//         "Calories": 140,
	//         "Fat": 2,
	//         "Carbs": 29,
	//         "Protein": 5,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     },
	//     {
	//         "_id": "654011713d72cc6726f22a86",
	//         "Name": "4-ct Mini Yeast Rolls",
	//         "Price": 2.09,
	//         "Calories": 240,
	//         "Fat": 8,
	//         "Carbs": 36,
	//         "Protein": 6,
	//         "loc_id": "6527169afc9fddd7e9e59276"
	//     }
	// ];
	const [cfa, setCfa] = useState([]);
	const [restaurants, setRestaurants] = useState([]);

	const getRestaurantNames = async (event) => {
		const response = await fetch(API_URL + "/api/stores/", {
			method: "GET",
			headers: {
				"Content-Type": "application/JSON",
				Authorization: "Bearer " + currentUser.token,
			},
		});

		const json = await response.json();

		if (!response.ok) {
			console.log("ERROR: failed to fetch restaurants");
		}

		if (response.ok) {
			console.log(response);
		}
	};

	const getFoodItems = async (event) => {
		// console.log("running!");

		const response = await fetch(API_URL + "/api/items/", {
			method: "POST",
			headers: {
				"Content-Type": "application/JSON",
				Authorization: "Bearer " + currentUser.token,
			},
			body: JSON.stringify({
				name: "Chick-fil-a",
			}),
		});

		const json = await response.json();

		console.log(json);
		if (!response.ok) {
			console.log("ERROR: failed to fetch items");
		}

		if (response.ok) {
			setCfa(json);
		}
	};

	useEffect(() => {
		console.log("effect is working");
		getFoodItems();
	}, []);

	return (
		<div className="food">
			<h1>Restaurants</h1>
			<Accordion>
				<Accordion.Header>Chick-Fil-A</Accordion.Header>
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
							{cfa.map((item) => (
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
					{/* {cfa.map((item) => (
						<ul>
							<li>
								{item.Name} | {item.Calories} calories | ${item.Price}
							</li>
						</ul>
					))} */}
				</Accordion.Body>
			</Accordion>
		</div>
	);
};

export default Food;
