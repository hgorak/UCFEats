import React from "react";

import "../styles.scss";

function Navbar() {
	return (
		<div className="navbar-container">
			<div className="navbar">
				<div className="title">LOGO UCFEats</div>
				<div className="links">
					<a>Log In</a>
					<a>Register</a>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
