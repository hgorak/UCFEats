import React from "react";

import "../styles.scss";

function Register() {
	return (
		<div className="login">
			<div className="hero">
				<h1>UCFEats</h1>
				<span>Keeping UCF Students Healthy</span>
			</div>
			<div className="form">
				<div className="reg-box">
					<h1>Register</h1>
					<form>
						<input className="login-input" placeholder="First Name" />
						<input className="login-input" placeholder="Last Name" />
						<input className="login-input" placeholder="Email Address" />
						<input className="login-input" placeholder="Confirm Email Address" />
						<input className="login-input" placeholder="Password" />
						<input className="login-input" placeholder="Confirm Password" />
						<button type="submit">Submit</button>
						<span>Have an account?</span>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Register;
