import React from "react";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { IconContext } from "react-icons";

import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Phone from "../images/phone.png";

import darrenHead from "../images/darren.jpg";
import brendanHead from "../images/brendan.jpg";
import haileyHead from "../images/hailey.jpg";
import alexHead from "../images/alex.png";
import akilHead from "../images/akil.png";
import joseHead from "../images/jose.png";
import jacobHead from "../images/jacob.jpg";

import "../styles.scss";

// root page of the application
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
					<Link to="/auth/register">
						<button type="button">START TODAY</button>
					</Link>
				</div>
				<div className="container-2">
					<img src={Phone} alt="phone" />
				</div>
			</div>
			<div className="reviews">
				<div className="review-container">
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
			<div className="about">
				<div className="about-container">
					<div className="header">
						<h1>Meet the team</h1>
						<span>
							Not only is our team passionate and dedicated, they're also extremely
							good-looking.
						</span>
					</div>

					<div className="team">
						<div className="member-row">
							<div className="member">
								<div className="head">
									<img
										className="darren"
										src={darrenHead}
										alt="darren headshot"
									/>
								</div>
								<div className="desc">
									<h2>Darren Bansil</h2>
									<span>Frontend Web</span>
								</div>
							</div>
							<div className="member">
								<div className="head">
									<img className="akil" src={akilHead} alt="darren headshot" />
								</div>
								<div className="desc">
									<h2>Akil Mohideen</h2>
									<span>Frontend Web</span>
								</div>
							</div>
							<div className="member">
								<div className="head">
									<img className="jose" src={joseHead} alt="darren headshot" />
								</div>
								<div className="desc">
									<h2>Jose Cuyugan</h2>
									<span>Frontend Mobile</span>
								</div>
							</div>
							<div className="member">
								<div className="head">
									<img className="jacob" src={jacobHead} alt="darren headshot" />
								</div>
								<div className="desc">
									<h2>Jacob Dioso</h2>
									<span>Frontend Mobile</span>
								</div>
							</div>
						</div>
						<div className="member-row">
							<div className="member">
								<div className="head">
									<img
										className="hailey"
										src={haileyHead}
										alt="darren headshot"
									/>
								</div>
								<div className="desc">
									<h2>Hailey Gorak</h2>
									<span>API</span>
								</div>
							</div>
							<div className="member">
								<div className="head">
									<img
										className="brendan"
										src={brendanHead}
										alt="darren headshot"
									/>
								</div>
								<div className="desc">
									<h2>Brendan Smith</h2>
									<span>API</span>
								</div>
							</div>
							<div className="member">
								<div className="head">
									<img className="alex" src={alexHead} alt="darren headshot" />
								</div>
								<div className="desc">
									<h2>Alex Cruz</h2>
									<span>Database</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Landing;
