import React, { useState, useContext } from "react";
import { Link, useNavigate, NavLink, Outlet } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { AuthContext } from "../context/AuthContext.jsx";
import "../styles.scss";

function Dashboard() {
	const { logout, currentUser } = useContext(AuthContext);
	const [clickedButton, setClickedButton] = useState("overview");

	const handleButtonClick = (buttonName) => {
		setClickedButton(buttonName);
	};

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
							<button
								onClick={() => handleButtonClick("overview")}
								className={clickedButton === "overview" ? "clicked" : ""}
							>
								Overview
							</button>
						</NavLink>
						<NavLink to="/dashboard/food">
							<button
								onClick={() => handleButtonClick("food")}
								className={clickedButton === "food" ? "clicked" : ""}
							>
								What to Eat
							</button>
						</NavLink>
						<NavLink to="favorites">
							<button
								onClick={() => handleButtonClick("fav")}
								className={clickedButton === "fav" ? "clicked" : ""}
							>
								Favorite Eats
							</button>
						</NavLink>
					</div>
					<Dropdown className="dropdown" drop="down-centered">
						<Dropdown.Toggle className="account">
							Welcome back, {currentUser.first_name}
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item onClick={handleClick}>Logout</Dropdown.Item>
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
