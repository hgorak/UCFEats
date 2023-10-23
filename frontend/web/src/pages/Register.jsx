import React from "react";
import { Link } from "react-router-dom";
import "../styles.scss";

function Register() {
	return (
		<div className="login">
			<div className="navbar-container navbar-container-bg">
				<div className="navbar">
					<div className="title">
						<h1>UCFEats</h1>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="reg-box">
					<h1>New Member</h1>
					<form>
						<input className="login-input" placeholder="First Name" />
						<input className="login-input" placeholder="Last Name" />
						<input className="login-input" placeholder="Email Address" />
						<input className="login-input" placeholder="Confirm Email Address" />
						<input className="login-input" placeholder="Password" />
						<input className="login-input" placeholder="Confirm Password" />

						<button type="submit">Register</button>
						<div style={{ alignSelf: "center" }}>
							<Link to="/login">
								<span>Have an account?</span>
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Register;
