import React from "react";

import Navbar from "../components/Navbar.jsx";
import Phone from "../images/phone.png";
import "../styles.scss";

function Landing() {
	return (
		<div className="landing">
			<Navbar />
			<div className="hero">
				<div className="container-1">
					<div className="description">
						<h1>Find good eats</h1>
						<span>with UCFEats</span>
						<span></span>
					</div>
				</div>
				<div className="container-2">
					<img src={Phone} alt="phone" />
				</div>
			</div>
		</div>
	);
}

export default Landing;
