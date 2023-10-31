import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

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
			<div className="navbar">
				<h2>{currentUser.first_name}'s Eats</h2>
			</div>
			<div className="container"></div>
			<button onClick={handleClick}>log out</button>
		</div>
	);
}

export default Dashboard;
