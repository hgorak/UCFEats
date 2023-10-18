import React from "react";
import { Link } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { IconContext } from "react-icons";

import "../styles.scss";

function Navbar() {
	return (
		<div className="navbar-container">
			<div className="navbar">
				<div className="title">
					<h1>UCFEats</h1>
				</div>
				<div className="links">
					<IconContext.Provider value={{ size: "35px" }}>
						<div>
							<VscAccount />
						</div>
					</IconContext.Provider>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
