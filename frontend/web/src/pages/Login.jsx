import React from "react";

import "../styles.scss";

function Login() {
	return (
		<div className="login">
			<div className="hero">
				<h1>UCFEats</h1>
				<span>Keeping UCF Students Healthy</span>
			</div>
			<div className="form">
				<div className="login-box">
					<h1>Sign In</h1>
					<form>
						<input className="login-input" placeholder="Email address" />
						<input className="login-input" placeholder="Password" />
						<button type="submit">Submit</button>
						<span>Forgot password?</span>
						<span>Need an account?</span>
					</form>
					<div></div>
				</div>
			</div>
		</div>
	);
}

export default Login;
