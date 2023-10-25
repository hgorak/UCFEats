import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

function Dashboard() {
	const { logout } = useContext(AuthContext);

	const navigate = useNavigate();
	const handleClick = () => {
		logout();
		navigate("/");
	};

	return (
		<>
			<>dashboard</>
			<button onClick={handleClick}>log out</button>
		</>
	);
}

export default Dashboard;
