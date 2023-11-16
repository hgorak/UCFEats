import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { ItemsContext } from "../../context/ItemsContext.jsx";
import Accordion from "react-bootstrap/Accordion";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";
import { IconContext } from "react-icons";
import { AiOutlinePlus } from "react-icons/ai";

import { API_URL } from "../../../api.js";
import "../../styles.scss";

const data = [
	{
		_id: "653feffc206d98417ee51482",
		Name: "10-ct Chick-n-Minis",
		Price: 11.59,
		Calories: 910,
		Fat: 34,
		Carbs: 103,
		Protein: 49,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654aac2f9e3cf4f0bd78e078",
		Name: "12-ct Grilled Nuggets",
		Price: 8.35,
		Calories: 200,
		Fat: 5,
		Carbs: 2,
		Protein: 38,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654aaacb9e3cf4f0bd78e073",
		Name: "12-ct Nuggets",
		Price: 6.95,
		Calories: 380,
		Fat: 17,
		Carbs: 16,
		Protein: 40,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654aad519e3cf4f0bd78e07a",
		Name: "2-ct Chick-n-Strips",
		Price: 3.59,
		Calories: 200,
		Fat: 9,
		Carbs: 11,
		Protein: 19,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654aadcd9e3cf4f0bd78e07b",
		Name: "3-ct Chick-n-Strips",
		Price: 5.35,
		Calories: 310,
		Fat: 14,
		Carbs: 16,
		Protein: 29,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654aacda9e3cf4f0bd78e079",
		Name: "30-ct Grilled Nuggets",
		Price: 20.85,
		Calories: 510,
		Fat: 11,
		Carbs: 4,
		Protein: 98,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654aaaf49e3cf4f0bd78e074",
		Name: "30-ct Nuggets",
		Price: 17.35,
		Calories: 950,
		Fat: 43,
		Carbs: 41,
		Protein: 100,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "653fef79206d98417ee51481",
		Name: "4-ct Chick-n-Minis",
		Price: 4.65,
		Calories: 360,
		Fat: 13,
		Carbs: 41,
		Protein: 20,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654aadf79e3cf4f0bd78e07c",
		Name: "4-ct Chick-n-Strips",
		Price: 6.69,
		Calories: 410,
		Fat: 19,
		Carbs: 22,
		Protein: 39,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654011713d72cc6726f22a86",
		Name: "4-ct Mini Yeast Rolls",
		Price: 2.09,
		Calories: 240,
		Fat: 8,
		Carbs: 36,
		Protein: 6,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654aab489e3cf4f0bd78e075",
		Name: "5-ct Grilled Nuggets",
		Price: 3.7,
		Calories: 80,
		Fat: 2,
		Carbs: 1,
		Protein: 16,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654aaa0c9e3cf4f0bd78e071",
		Name: "5-ct Nuggets",
		Price: 3.15,
		Calories: 160,
		Fat: 7,
		Carbs: 7,
		Protein: 17,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654aac109e3cf4f0bd78e077",
		Name: "8-ct Grilled Nuggets",
		Price: 5.85,
		Calories: 130,
		Fat: 3,
		Carbs: 1,
		Protein: 25,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654aaa5c9e3cf4f0bd78e072",
		Name: "8-ct Nuggets",
		Price: 4.99,
		Calories: 250,
		Fat: 11,
		Carbs: 11,
		Protein: 27,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "65400e5f3d72cc6726f22a79",
		Name: "Bacon, Egg and Cheese Biscuit",
		Price: 3.95,
		Calories: 420,
		Fat: 23,
		Carbs: 38,
		Protein: 16,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "65400f113d72cc6726f22a7c",
		Name: "Bacon, Egg and Cheese Muffin",
		Price: 4.15,
		Calories: 310,
		Fat: 13,
		Carbs: 30,
		Protein: 17,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654aba259e3cf4f0bd78e0a4",
		Name: "Bowl of Chicken Noodle Soup",
		Price: 6.09,
		Calories: 280,
		Fat: 6,
		Carbs: 38,
		Protein: 17,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654c136c4e9dcd8bddfd458a",
		Name: "Bowl of Chicken Tortilla Soup",
		Price: 8.39,
		Calories: 580,
		Fat: 16,
		Carbs: 65,
		Protein: 44,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654c144c4e9dcd8bddfd458d",
		Name: "Buddy Fruits Apple Sauce",
		Price: 2.39,
		Calories: 45,
		Fat: 0,
		Carbs: 12,
		Protein: 0,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "6540110a3d72cc6726f22a84",
		Name: "Buttered Biscuit",
		Price: 1.49,
		Calories: 290,
		Fat: 15,
		Carbs: 37,
		Protein: 4,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "653fee54206d98417ee5147e",
		Name: "Chicken Biscuit",
		Price: 3.65,
		Calories: 460,
		Fat: 23,
		Carbs: 45,
		Protein: 19,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654aa52d9e3cf4f0bd78e062",
		Name: "Chicken Sandwich",
		Price: 4.95,
		Calories: 420,
		Fat: 18,
		Carbs: 41,
		Protein: 29,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "65400e163d72cc6726f22a78",
		Name: "Chicken, Egg and Cheese Biscuit",
		Price: 4.55,
		Calories: 550,
		Fat: 28,
		Carbs: 48,
		Protein: 27,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "65400ec53d72cc6726f22a7b",
		Name: "Chicken, Egg and Cheese Muffin",
		Price: 4.75,
		Calories: 420,
		Fat: 19,
		Carbs: 37,
		Protein: 27,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654c15354e9dcd8bddfd458e",
		Name: "Chocolate Chunk Cookie",
		Price: 1.65,
		Calories: 370,
		Fat: 17,
		Carbs: 49,
		Protein: 5,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654c15634e9dcd8bddfd458f",
		Name: "Chocolate Fudge Brownie",
		Price: 2.25,
		Calories: 380,
		Fat: 21,
		Carbs: 48,
		Protein: 4,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654c16cf4e9dcd8bddfd4594",
		Name: "Chocolate Milkshake",
		Price: 4.49,
		Calories: 590,
		Fat: 22,
		Carbs: 90,
		Protein: 12,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654ab0019e3cf4f0bd78e082",
		Name: "Cobb Salad w/ Chick-n-Strips",
		Price: 9.49,
		Calories: 910,
		Fat: 63,
		Carbs: 40,
		Protein: 45,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654ab09d9e3cf4f0bd78e084",
		Name: "Cobb Salad w/ Filet",
		Price: 9.49,
		Calories: 850,
		Fat: 61,
		Carbs: 36,
		Protein: 40,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654ab0509e3cf4f0bd78e083",
		Name: "Cobb Salad w/ Grilled Filet (Cold)",
		Price: 9.49,
		Calories: 700,
		Fat: 51,
		Carbs: 25,
		Protein: 36,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654ab11e9e3cf4f0bd78e087",
		Name: "Cobb Salad w/ Grilled Filet (Warm)",
		Price: 9.49,
		Calories: 700,
		Fat: 51,
		Carbs: 25,
		Protein: 36,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654aafb59e3cf4f0bd78e080",
		Name: "Cobb Salad w/ Grilled Nuggets",
		Price: 9.49,
		Calories: 730,
		Fat: 52,
		Carbs: 24,
		Protein: 41,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654ab14f9e3cf4f0bd78e088",
		Name: "Cobb Salad w/ No Chicken",
		Price: 7.29,
		Calories: 600,
		Fat: 49,
		Carbs: 23,
		Protein: 16,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654aaf129e3cf4f0bd78e07e",
		Name: "Cobb Salad w/ Nuggets",
		Price: 9.49,
		Calories: 850,
		Fat: 61,
		Carbs: 34,
		Protein: 42,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654ab0d09e3cf4f0bd78e085",
		Name: "Cobb Salad w/ Spicy Filet",
		Price: 9.49,
		Calories: 880,
		Fat: 62,
		Carbs: 40,
		Protein: 39,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654aaf869e3cf4f0bd78e07f",
		Name: "Cobb Salad w/ Spicy Grilled Filet (Cold)",
		Price: 9.49,
		Calories: 710,
		Fat: 52,
		Carbs: 25,
		Protein: 36,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654c16ef4e9dcd8bddfd4595",
		Name: "Cookies & Cream Milkshake",
		Price: 4.49,
		Calories: 630,
		Fat: 26,
		Carbs: 90,
		Protein: 13,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654aae9e9e3cf4f0bd78e07d",
		Name: "Cool Wrap",
		Price: 7.95,
		Calories: 660,
		Fat: 45,
		Carbs: 32,
		Protein: 43,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654ab90b9e3cf4f0bd78e0a3",
		Name: "Cup of Chicken Noodle Soup",
		Price: 3.89,
		Calories: 170,
		Fat: 4,
		Carbs: 25,
		Protein: 10,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654c133c4e9dcd8bddfd4589",
		Name: "Cup of Chicken Tortilla Soup",
		Price: 5.45,
		Calories: 340,
		Fat: 11,
		Carbs: 38,
		Protein: 24,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654c1bf44e9dcd8bddfd459a",
		Name: "Dbl Stkburger w/ Cheese",
		Price: 4.79,
		Calories: 530,
		Fat: 32,
		Carbs: 32,
		Protein: 27,
		loc_id: "6527199619633bc5a06f2cb5",
	},
	{
		_id: "654aa5c79e3cf4f0bd78e063",
		Name: "Deluxe Sandwich w/ American",
		Price: 5.65,
		Calories: 490,
		Fat: 22,
		Carbs: 43,
		Protein: 32,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654aa6209e3cf4f0bd78e064",
		Name: "Deluxe Sandwich w/ Colby Jack",
		Price: 5.65,
		Calories: 510,
		Fat: 24,
		Carbs: 43,
		Protein: 34,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654aa67e9e3cf4f0bd78e066",
		Name: "Deluxe Sandwich w/ No Cheese",
		Price: 5.35,
		Calories: 430,
		Fat: 18,
		Carbs: 43,
		Protein: 29,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654aa6539e3cf4f0bd78e065",
		Name: "Deluxe Sandwich w/ Pepper Jack",
		Price: 5.65,
		Calories: 510,
		Fat: 24,
		Carbs: 43,
		Protein: 34,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "653ff0a0206d98417ee51483",
		Name: "Egg White Grill",
		Price: 4.99,
		Calories: 300,
		Fat: 8,
		Carbs: 31,
		Protein: 28,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654011453d72cc6726f22a85",
		Name: "English Muffin",
		Price: 1.69,
		Calories: 140,
		Fat: 2,
		Carbs: 29,
		Protein: 5,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654c17284e9dcd8bddfd4596",
		Name: "Frosted Coffee",
		Price: 4.39,
		Calories: 250,
		Fat: 6,
		Carbs: 43,
		Protein: 6,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "6540100b3d72cc6726f22a80",
		Name: "Greek Yogurt Parfait w/ Cookie Crumbs",
		Price: 4.79,
		Calories: 240,
		Fat: 8,
		Carbs: 31,
		Protein: 12,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "6540104d3d72cc6726f22a81",
		Name: "Greek Yogurt Parfait w/ Granola",
		Price: 4.79,
		Calories: 270,
		Fat: 9,
		Carbs: 36,
		Protein: 13,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654aa8c09e3cf4f0bd78e06e",
		Name: "Grilled Chicken Club w/ American",
		Price: 8.45,
		Calories: 490,
		Fat: 20,
		Carbs: 45,
		Protein: 35,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654aa86b9e3cf4f0bd78e06d",
		Name: "Grilled Chicken Club w/ Colby Jack",
		Price: 8.45,
		Calories: 520,
		Fat: 22,
		Carbs: 45,
		Protein: 38,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654aa91b9e3cf4f0bd78e070",
		Name: "Grilled Chicken Club w/ No Cheese",
		Price: 8.15,
		Calories: 440,
		Fat: 16,
		Carbs: 44,
		Protein: 32,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654aa8ec9e3cf4f0bd78e06f",
		Name: "Grilled Chicken Club w/ Pepper Jack",
		Price: 8.45,
		Calories: 520,
		Fat: 22,
		Carbs: 45,
		Protein: 37,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654aa82b9e3cf4f0bd78e06c",
		Name: "Grilled Chicken Sandwich",
		Price: 6.59,
		Calories: 390,
		Fat: 12,
		Carbs: 44,
		Protein: 28,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "653ff5c32f2a89a6c0fe8d95",
		Name: "Hash Brown Scramble Bowl w/ bacon",
		Price: 4.95,
		Calories: 450,
		Fat: 32,
		Carbs: 15,
		Protein: 25,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "653ff6f42f2a89a6c0fe8d9b",
		Name: "Hash Brown Scramble Bowl w/ bacon - no hash",
		Price: 3.95,
		Calories: 300,
		Fat: 22,
		Carbs: 2,
		Protein: 24,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "653ff5762f2a89a6c0fe8d93",
		Name: "Hash Brown Scramble Bowl w/ grilled filet",
		Price: 4.95,
		Calories: 420,
		Fat: 26,
		Carbs: 15,
		Protein: 31,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "653ff6a02f2a89a6c0fe8d99",
		Name: "Hash Brown Scramble Bowl w/ grilled filet - no hash",
		Price: 3.95,
		Calories: 270,
		Fat: 16,
		Carbs: 2,
		Protein: 30,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "653ff5e52f2a89a6c0fe8d96",
		Name: "Hash Brown Scramble Bowl w/ no meat",
		Price: 3.45,
		Calories: 350,
		Fat: 24,
		Carbs: 16,
		Protein: 17,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "653ff71b2f2a89a6c0fe8d9c",
		Name: "Hash Brown Scramble Bowl w/ no meat - no hash",
		Price: 3.05,
		Calories: 330,
		Fat: 20,
		Carbs: 9,
		Protein: 29,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "653ff4e32f2a89a6c0fe8d91",
		Name: "Hash Brown Scramble Bowl w/ nuggets",
		Price: 4.95,
		Calories: 470,
		Fat: 30,
		Carbs: 19,
		Protein: 29,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "653ff61a2f2a89a6c0fe8d97",
		Name: "Hash Brown Scramble Bowl w/ nuggets - no hash",
		Price: 3.95,
		Calories: 320,
		Fat: 20,
		Carbs: 7,
		Protein: 28,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "653ff5482f2a89a6c0fe8d92",
		Name: "Hash Brown Scramble Bowl w/ sausage",
		Price: 4.95,
		Calories: 480,
		Fat: 37,
		Carbs: 15,
		Protein: 23,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "653ff67c2f2a89a6c0fe8d98",
		Name: "Hash Brown Scramble Bowl w/ sausage - no hash",
		Price: 3.95,
		Calories: 340,
		Fat: 27,
		Carbs: 2,
		Protein: 21,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "653ff5a32f2a89a6c0fe8d94",
		Name: "Hash Brown Scramble Bowl w/ spicy chicken",
		Price: 4.95,
		Calories: 490,
		Fat: 32,
		Carbs: 22,
		Protein: 28,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "653ff6c82f2a89a6c0fe8d9a",
		Name: "Hash Brown Scramble Bowl w/ spicy chicken - no hash",
		Price: 3.95,
		Calories: 340,
		Fat: 21,
		Carbs: 10,
		Protein: 27,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "653ff3512f2a89a6c0fe8d89",
		Name: "Hash Brown Scramble Burrito w/ bacon",
		Price: 4.95,
		Calories: 680,
		Fat: 42,
		Carbs: 46,
		Protein: 30,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "653ff48c2f2a89a6c0fe8d8f",
		Name: "Hash Brown Scramble Burrito w/ bacon - no hash",
		Price: 3.95,
		Calories: 540,
		Fat: 32,
		Carbs: 34,
		Protein: 29,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "653ff296206d98417ee51486",
		Name: "Hash Brown Scramble Burrito w/ grilled filet",
		Price: 4.95,
		Calories: 650,
		Fat: 36,
		Carbs: 46,
		Protein: 36,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "653ff41e2f2a89a6c0fe8d8d",
		Name: "Hash Brown Scramble Burrito w/ grilled filet - no hash",
		Price: 3.95,
		Calories: 500,
		Fat: 26,
		Carbs: 34,
		Protein: 35,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "653ff3882f2a89a6c0fe8d8a",
		Name: "Hash Brown Scramble Burrito w/ no meat",
		Price: 3.45,
		Calories: 580,
		Fat: 34,
		Carbs: 47,
		Protein: 22,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "653ff4b82f2a89a6c0fe8d90",
		Name: "Hash Brown Scramble Burrito w/ no meat - no hash",
		Price: 3.05,
		Calories: 440,
		Fat: 24,
		Carbs: 35,
		Protein: 21,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "653ff0fa206d98417ee51484",
		Name: "Hash Brown Scramble Burrito w/ nuggets",
		Price: 4.95,
		Calories: 700,
		Fat: 40,
		Carbs: 51,
		Protein: 34,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "653ff3b32f2a89a6c0fe8d8b",
		Name: "Hash Brown Scramble Burrito w/ nuggets - no hash",
		Price: 3.95,
		Calories: 550,
		Fat: 30,
		Carbs: 38,
		Protein: 33,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "653ff254206d98417ee51485",
		Name: "Hash Brown Scramble Burrito w/ sausage",
		Price: 4.95,
		Calories: 720,
		Fat: 47,
		Carbs: 46,
		Protein: 28,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "653ff3f12f2a89a6c0fe8d8c",
		Name: "Hash Brown Scramble Burrito w/ sausage - no hash",
		Price: 3.95,
		Calories: 570,
		Fat: 37,
		Carbs: 34,
		Protein: 26,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "653ff3172f2a89a6c0fe8d88",
		Name: "Hash Brown Scramble Burrito w/ spicy chicken",
		Price: 4.95,
		Calories: 660,
		Fat: 37,
		Carbs: 54,
		Protein: 28,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "653ff44e2f2a89a6c0fe8d8e",
		Name: "Hash Brown Scramble Burrito w/ spicy chicken - no hash",
		Price: 3.95,
		Calories: 510,
		Fat: 27,
		Carbs: 41,
		Protein: 27,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654c16304e9dcd8bddfd4591",
		Name: "Icedream Cone",
		Price: 1.79,
		Calories: 180,
		Fat: 4,
		Carbs: 32,
		Protein: 4,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654c15d74e9dcd8bddfd4590",
		Name: "Icedream Cup",
		Price: 1.45,
		Calories: 140,
		Fat: 4,
		Carbs: 24,
		Protein: 4,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654c13c94e9dcd8bddfd458b",
		Name: "Kale Crunch Side",
		Price: 4.09,
		Calories: 170,
		Fat: 12,
		Carbs: 13,
		Protein: 4,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "65400fde3d72cc6726f22a7f",
		Name: "Large Hash Browns",
		Price: 2.09,
		Calories: 420,
		Fat: 29,
		Carbs: 35,
		Protein: 4,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654ab8a99e3cf4f0bd78e0a2",
		Name: "Large Mac & Cheese",
		Price: 7.89,
		Calories: 840,
		Fat: 53,
		Carbs: 53,
		Protein: 38,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654ab7aa9e3cf4f0bd78e09e",
		Name: "Large Waffle Potato Fries",
		Price: 2.85,
		Calories: 600,
		Fat: 35,
		Carbs: 65,
		Protein: 7,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654ab5199e3cf4f0bd78e095",
		Name: "Market Salad w/ Chick-n-Strips",
		Price: 9.69,
		Calories: 750,
		Fat: 43,
		Carbs: 57,
		Protein: 36,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654ab5cb9e3cf4f0bd78e098",
		Name: "Market Salad w/ Filet",
		Price: 9.69,
		Calories: 690,
		Fat: 41,
		Carbs: 53,
		Protein: 31,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654ab4ad9e3cf4f0bd78e093",
		Name: "Market Salad w/ Grilled Filet (Cold)",
		Price: 9.69,
		Calories: 540,
		Fat: 31,
		Carbs: 41,
		Protein: 28,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654ab6179e3cf4f0bd78e09a",
		Name: "Market Salad w/ Grilled Filet (Warm)",
		Price: 9.69,
		Calories: 550,
		Fat: 31,
		Carbs: 42,
		Protein: 28,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654ab5929e3cf4f0bd78e097",
		Name: "Market Salad w/ Grilled Nuggets",
		Price: 9.69,
		Calories: 570,
		Fat: 32,
		Carbs: 41,
		Protein: 32,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654ab6509e3cf4f0bd78e09b",
		Name: "Market Salad w/ No Chicken",
		Price: 7.49,
		Calories: 440,
		Fat: 29,
		Carbs: 40,
		Protein: 7,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654ab5699e3cf4f0bd78e096",
		Name: "Market Salad w/ Nuggets",
		Price: 9.69,
		Calories: 690,
		Fat: 40,
		Carbs: 51,
		Protein: 34,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654ab5ec9e3cf4f0bd78e099",
		Name: "Market Salad w/ Spicy Filet",
		Price: 9.69,
		Calories: 720,
		Fat: 42,
		Carbs: 56,
		Protein: 30,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654ab4ef9e3cf4f0bd78e094",
		Name: "Market Salad w/ Spicy Grilled Filet (Cold)",
		Price: 9.69,
		Calories: 540,
		Fat: 31,
		Carbs: 42,
		Protein: 26,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654010ce3d72cc6726f22a83",
		Name: "Medium Fruit Cup",
		Price: 4.09,
		Calories: 60,
		Fat: 0,
		Carbs: 15,
		Protein: 1,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654ab8789e3cf4f0bd78e0a1",
		Name: "Medium Mac & Cheese",
		Price: 4.09,
		Calories: 450,
		Fat: 29,
		Carbs: 28,
		Protein: 20,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654ab78c9e3cf4f0bd78e09d",
		Name: "Medium Waffle Potato Fries",
		Price: 2.39,
		Calories: 420,
		Fat: 24,
		Carbs: 45,
		Protein: 5,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "65400e9a3d72cc6726f22a7a",
		Name: "Sausage, Egg and Cheese Biscuit",
		Price: 3.95,
		Calories: 620,
		Fat: 42,
		Carbs: 38,
		Protein: 22,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "65400f683d72cc6726f22a7d",
		Name: "Sausage, Egg and Cheese Muffin",
		Price: 4.15,
		Calories: 500,
		Fat: 33,
		Carbs: 30,
		Protein: 23,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654ab7ea9e3cf4f0bd78e09f",
		Name: "Side Salad",
		Price: 4.15,
		Calories: 470,
		Fat: 42,
		Carbs: 14,
		Protein: 6,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654010973d72cc6726f22a82",
		Name: "Small Fruit Cup",
		Price: 3.15,
		Calories: 50,
		Fat: 0,
		Carbs: 13,
		Protein: 1,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "65400fb33d72cc6726f22a7e",
		Name: "Small Hash Browns",
		Price: 1.59,
		Calories: 270,
		Fat: 18,
		Carbs: 23,
		Protein: 3,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654ab8429e3cf4f0bd78e0a0",
		Name: "Small Mac & Cheese",
		Price: 3.29,
		Calories: 270,
		Fat: 17,
		Carbs: 17,
		Protein: 12,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654ab7579e3cf4f0bd78e09c",
		Name: "Small Waffle Potato Fries",
		Price: 2.15,
		Calories: 320,
		Fat: 19,
		Carbs: 35,
		Protein: 4,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "653fef07206d98417ee5147f",
		Name: "Spicy Chicken Biscuit",
		Price: 3.89,
		Calories: 450,
		Fat: 22,
		Carbs: 44,
		Protein: 19,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654aa6b69e3cf4f0bd78e067",
		Name: "Spicy Chicken Sandwich",
		Price: 5.25,
		Calories: 450,
		Fat: 19,
		Carbs: 45,
		Protein: 28,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654aa77f9e3cf4f0bd78e069",
		Name: "Spicy Deluxe Sandwich w/ American",
		Price: 5.95,
		Calories: 510,
		Fat: 23,
		Carbs: 47,
		Protein: 31,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654aa7a39e3cf4f0bd78e06a",
		Name: "Spicy Deluxe Sandwich w/ Colby Jack",
		Price: 5.95,
		Calories: 540,
		Fat: 26,
		Carbs: 47,
		Protein: 34,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654aa7d49e3cf4f0bd78e06b",
		Name: "Spicy Deluxe Sandwich w/ No Cheese",
		Price: 5.65,
		Calories: 460,
		Fat: 19,
		Carbs: 46,
		Protein: 28,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654aa7419e3cf4f0bd78e068",
		Name: "Spicy Deluxe Sandwich w/ Pepper Jack",
		Price: 5.95,
		Calories: 520,
		Fat: 25,
		Carbs: 46,
		Protein: 31,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654ab3129e3cf4f0bd78e08d",
		Name: "Spicy Southwest Salad w/ Chick-n-Strips",
		Price: 9.69,
		Calories: 730,
		Fat: 49,
		Carbs: 32,
		Protein: 48,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654ab35e9e3cf4f0bd78e08e",
		Name: "Spicy Southwest Salad w/ Filet",
		Price: 9.69,
		Calories: 840,
		Fat: 59,
		Carbs: 40,
		Protein: 38,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654ab2929e3cf4f0bd78e08a",
		Name: "Spicy Southwest Salad w/ Grilled Filet (Cold)",
		Price: 9.69,
		Calories: 690,
		Fat: 49,
		Carbs: 28,
		Protein: 35,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654ab3ed9e3cf4f0bd78e090",
		Name: "Spicy Southwest Salad w/ Grilled Filet (Warm)",
		Price: 9.69,
		Calories: 690,
		Fat: 49,
		Carbs: 29,
		Protein: 35,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654ab2e89e3cf4f0bd78e08c",
		Name: "Spicy Southwest Salad w/ Grilled Nuggets",
		Price: 9.69,
		Calories: 720,
		Fat: 50,
		Carbs: 29,
		Protein: 39,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654ab41a9e3cf4f0bd78e091",
		Name: "Spicy Southwest Salad w/ No Chicken",
		Price: 7.49,
		Calories: 590,
		Fat: 47,
		Carbs: 27,
		Protein: 14,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654ab2b79e3cf4f0bd78e08b",
		Name: "Spicy Southwest Salad w/ Nuggets",
		Price: 9.69,
		Calories: 840,
		Fat: 58,
		Carbs: 38,
		Protein: 41,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654ab3c99e3cf4f0bd78e08f",
		Name: "Spicy Southwest Salad w/ Spicy Filet",
		Price: 9.69,
		Calories: 860,
		Fat: 60,
		Carbs: 44,
		Protein: 37,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654ab21c9e3cf4f0bd78e089",
		Name: "Spicy Southwest Salad w/ Spicy Grilled Filet (Cold)",
		Price: 9.69,
		Calories: 690,
		Fat: 49,
		Carbs: 28,
		Protein: 33,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654c169c4e9dcd8bddfd4593",
		Name: "Strawberry Milkshake",
		Price: 4.49,
		Calories: 570,
		Fat: 19,
		Carbs: 93,
		Protein: 11,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654c16634e9dcd8bddfd4592",
		Name: "Vanilla Milkshake",
		Price: 4.49,
		Calories: 580,
		Fat: 23,
		Carbs: 82,
		Protein: 13,
		loc_id: "6527169afc9fddd7e9e59276",
	},
	{
		_id: "654c140f4e9dcd8bddfd458c",
		Name: "Waffle Potato Chips",
		Price: 2.09,
		Calories: 220,
		Fat: 13,
		Carbs: 25,
		Protein: 3,
		loc_id: "6527169afc9fddd7e9e59276",
	},
];

function Food() {
	const { currentUser } = useContext(AuthContext);
	const { restaurantItems, setRestaurantItems } = useContext(ItemsContext);
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertVariant, setAlertVariant] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);

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

	const handleSearch = (query) => {
		const filteredResults = data.filter((item) =>
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
			<input onChange={handleChange}></input>
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
