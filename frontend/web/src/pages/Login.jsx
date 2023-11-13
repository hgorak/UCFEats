import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

import "../styles.scss";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const { login } = useContext(AuthContext);

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			await login(email, password);
			navigate("/loading");
		} catch (err) {
			setError(err);
		}
	};

	return (
		<div className="login">
			<div className="navbar-container navbar-container-bg">
				<div className="navbar">
					<div className="title">
						<Link to="/">
							<h1>UCFEats</h1>
						</Link>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="login-box">
					<h1>Member Login</h1>
					<span>Welcome back! It's great to see you again.</span>
					<form>
						<input
							required
							type="email"
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							value={email}
							className="login-input"
							placeholder="Email Address"
						/>
						<input
							required
							type="password"
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							value={password}
							className="login-input"
							placeholder="Password"
						/>
						<div>
							<Link to="/forgotpassword">
								<span>Forgot password?</span>
							</Link>
						</div>

						<button onClick={handleSubmit} type="submit">
							Log In
						</button>
						{error && <div className="error">{error}</div>}
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
