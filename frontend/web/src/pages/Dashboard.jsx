import React, { useState, useContext } from "react";
import { Link, useNavigate, NavLink, Outlet } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { AuthContext } from "../context/AuthContext.jsx";

import "../styles.scss";

// main dashboard page
function Dashboard() {
	const { logout, currentUser } = useContext(AuthContext);
	const [clickedButton, setClickedButton] = useState("overview");

	const navigate = useNavigate();

	// logout button and redirect to landing page
	const handleLogout = () => {
		logout();
		navigate("/");
	};

	const handleProfile = () => {
		navigate("/dashboard/goals");
	};

	return (
		<div className="dashboard">
			<div className="navbar-container navbar-container-dash">
				<div className="navbar navbar-dash">
					<div className="title">
						<Link to="/" className="dash-title">
							<h1>UCFEats</h1>
						</Link>
					</div>
					<div className="buttons">
						<NavLink to="/dashboard/">
							{({ isActive }) => (
								<button className={isActive ? "clicked" : ""}>Home</button>
							)}
						</NavLink>
						<NavLink to="/dashboard/food">
							{({ isActive }) => (
								<button className={isActive ? "clicked" : ""}>Restaurants</button>
							)}
						</NavLink>
						<NavLink to="favorites">
							{({ isActive }) => (
								<button className={isActive ? "clicked" : ""}>Favorites</button>
							)}
						</NavLink>
						<NavLink to="/dashboard/goals">
							{({ isActive }) => (
								<button className={isActive ? "clicked" : ""}>Goals</button>
							)}
						</NavLink>
					</div>
					<Dropdown className="dropdown" drop="down-centered">
						<Dropdown.Toggle className="account">
							Welcome back, {currentUser.first_name}
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item onClick={handleProfile}>Goals</Dropdown.Item>
							<Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</div>
			<div className="container">
				<Outlet context={{ currentUser }} />
			</div>
		</div>
	);
}

export default Dashboard;
