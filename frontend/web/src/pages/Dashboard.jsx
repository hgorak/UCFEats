import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { GiKnifeFork } from "react-icons/gi";
import { IconContext } from "react-icons";

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
					<IconContext.Provider value={{ size: "24px", className: "star" }}>
						<GiKnifeFork />
					</IconContext.Provider>
					<h2>{currentUser.first_name}'s Eats</h2>
				</button>
			</div>
			<div className="container"></div>
			<button onClick={handleClick}>log out</button>
		</div>
	);
}

export default Dashboard;
