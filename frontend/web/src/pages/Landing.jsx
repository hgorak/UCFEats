import React from "react";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { IconContext } from "react-icons";

import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Phone from "../images/phone.png";
import "../styles.scss";

function Landing() {
	return (
		<div className="landing">
			<Navbar />
			<div className="hero">
				<div className="container-1">
					<div className="header">
						<h1>Find good eats</h1>
						<span>with UCFEats</span>
					</div>
					<span>
						Find food on UCF campus and track your caloric and macronutrient intake.
					</span>
					<Link to="/login">
						<button type="button">START TODAY</button>
					</Link>
				</div>
				<div className="container-2">
					<img src={Phone} alt="phone" />
				</div>
			</div>
			<div className="reviews">
				<div className="container">
					<div className="stars">
						<IconContext.Provider value={{ size: "30px", className: "star" }}>
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
						</IconContext.Provider>
					</div>

					<h1>We get good reviews.</h1>
					<span className="review">
						"This is the best app I've ever <s>made</s> used in my entire life!"
					</span>
					<span className="name">- Darren B.</span>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Landing;
