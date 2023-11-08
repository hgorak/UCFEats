import React, { useState, useContext } from "react";
import { Link, useNavigate, NavLink, Outlet, useOutletContext } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { GiKnifeFork } from "react-icons/gi";
import { AiFillHome } from "react-icons/ai";
import { IconContext } from "react-icons";

import Home from "./dash-pages/Home.jsx";
import DashNav from "../components/DashNav.jsx";

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
			<div className="navbar-container navbar-container-dash">
				<div className="navbar navbar-dash">
					<div className="title">
						<h1>UCFEats</h1>
					</div>
					<div className="buttons">
						<NavLink to="/dashboard/">
							<button>Overview</button>
						</NavLink>
						<NavLink to="/dashboard/food">
							<button>What to Eat</button>
						</NavLink>
						<NavLink to="favorites">
							<button>Favorite Eats</button>
						</NavLink>
					</div>
					<div className="account">Welcome back, {currentUser.first_name}</div>
				</div>
			</div>
			<div className="container">
				<Outlet context={{ currentUser }} />
			</div>
		</div>
	);
}

export default Dashboard;
