import React from "react";
import { Link } from "react-router-dom";
import "../styles.scss";

function Login() {
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
				<div className="login-box">
					<h1>Member Login</h1>
					<form>
						<input className="login-input" placeholder="Email Address" />
						<input className="login-input" placeholder="Password" />
						<div>
							<Link>
								<span>Forgot password?</span>
							</Link>
						</div>

						<button type="submit">Log In</button>
						<div style={{ alignSelf: "center" }}>
							<Link to="/register">
								<span>Need an account?</span>
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;
