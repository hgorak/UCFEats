import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { IconContext } from "react-icons";
import { AuthContext } from "../context/AuthContext.jsx";

import "../styles.scss";

function Navbar() {
	const { currentUser } = useContext(AuthContext);
	const [color, setColor] = useState(false);

	const changeColor = () => {
		if (window.scrollY >= 90) {
			setColor(true);
		} else {
			setColor(false);
		}
	};

	window.addEventListener("scroll", changeColor);

	return (
		<div className={color ? "navbar-container navbar-container-bg" : "navbar-container"}>
			<div className="navbar">
				<div className="title">
					<h1>UCFEats</h1>
				</div>
				<div className="links">
					<IconContext.Provider
						value={
							color
								? { size: "35px", color: "#1a434d" }
								: { size: "35px", color: "#F5ece4" }
						}
					>
						<Link to={currentUser ? "/loading" : "/auth/login"}>
							<VscAccount />
						</Link>
					</IconContext.Provider>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
