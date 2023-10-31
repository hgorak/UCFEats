import React, { useState, useContext } from "react";
import { Link, useNavigate, Routes, Route, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { GiKnifeFork } from "react-icons/gi";
import { AiFillHome } from "react-icons/ai";
import { IconContext } from "react-icons";

import Home from "./dash-pages/Home.jsx";

import "../styles.scss";

function Dashboard() {
	const { logout, currentUser } = useContext(AuthContext);
	const navigate = useNavigate();
	const handleClick = () => {
		logout();
		navigate("/");
	};

	return (
		<div className="dashboard">
			<div className="sidebar">
				<button>
					<IconContext.Provider value={{ size: "24px", className: "icon" }}>
						<AiFillHome />
					</IconContext.Provider>
					<h2>{currentUser.first_name}'s Eats</h2>
				</button>
				<button>
					<IconContext.Provider value={{ size: "24px", className: "icon" }}>
						<GiKnifeFork />
					</IconContext.Provider>
					<h2>What to Eat</h2>
				</button>
				{/* <div className="restaurants">
					<Link>BurgerU</Link>
					<Link>Chick-Fil-A</Link>
					<Link>Dominoes</Link>
					<Link>Foxtail</Link>
					<Link>Huey Magoos</Link>
					<Link>Panda Express</Link>
					<Link>Qdoba</Link>
					<Link>Smoothie King</Link>
					<Link>Steak n' Shake</Link>
					<Link>Which Wich</Link>
				</div> */}
			</div>
			<div className="container">
				<Outlet></Outlet>
			</div>
		</div>
	);
}

export default Dashboard;
