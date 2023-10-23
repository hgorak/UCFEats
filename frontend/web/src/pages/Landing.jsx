import React from "react";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { IconContext } from "react-icons";

import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Phone from "../images/phone.png";

import darrenHead from "../images/darren.jpg";
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
			<div className="about">
				<div className="container">
					<h1>Meet the team.</h1>
					<span></span>
					<div className="row">
						<div className="member">
							<div className="head">
								<img src={darrenHead} alt="darren headshot" />
							</div>
							<div className="desc">
								<h2>
									Darren<br></br>Bansil
								</h2>
								<span>Web Developer</span>
								<div className="links">Github Linkedin</div>
							</div>
						</div>
						<div className="member">
							<div className="head">
								<img src={darrenHead} alt="darren headshot" />
							</div>
							<div className="desc">
								<h2>
									Akil<br></br>Mohideen
								</h2>
								<span>Web Developer</span>
								<div className="links">Github Linkedin</div>
							</div>
						</div>
						<div className="member">
							<div className="head">
								<img src={darrenHead} alt="darren headshot" />
							</div>
							<div className="desc">
								<h2>
									Jose<br></br>Cuyugan
								</h2>
								<span>Mobile Developer</span>
								<div className="links">Github Linkedin</div>
							</div>
						</div>
						<div className="member">
							<div className="head">
								<img src={darrenHead} alt="darren headshot" />
							</div>
							<div className="desc">
								<h2>
									Jacob<br></br>Dioso
								</h2>
								<span>Mobile Developer</span>
								<div className="links">Github Linkedin</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="member">
							<div className="head">
								<img src={darrenHead} alt="darren headshot" />
							</div>
							<div className="desc">
								<h2>
									Hailey<br></br>Gorak
								</h2>
								<span>API Developer</span>
								<div className="links">Github Linkedin</div>
							</div>
						</div>
						<div className="member">
							<div className="head">
								<img src={darrenHead} alt="darren headshot" />
							</div>
							<div className="desc">
								<h2>
									Brendan<br></br>Smith
								</h2>
								<span>Mobile Developer</span>
								<div className="links">Github Linkedin</div>
							</div>
						</div>
						<div className="member">
							<div className="head">
								<img src={darrenHead} alt="darren headshot" />
							</div>
							<div className="desc">
								<h2>
									Alex<br></br>Cruz
								</h2>
								<span>Database Developer</span>
								<div className="links">Github Linkedin</div>
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
