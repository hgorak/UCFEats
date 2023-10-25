import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../api.js";
import "../styles.scss";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const doLogin = async (event) => {
		setError(null);
		event.preventDefault();

		const response = await fetch(API_URL + "/api/user/login", {
			method: "POST",
			body: JSON.stringify({ email, password }),
			headers: { "Content-Type": "application/JSON" },
		});

		const json = await response.json();

		// if (!response.ok) {
		// 	setIsLoading(false);
		// 	setError(json.error);
		// }
		if (!response.ok) {
			setError(json.error);
		}

		if (response.ok) {
			// Save user to local storage
			localStorage.setItem("user", JSON.stringify(json));

			// Update auth context
			// dispatch({ type: "LOGIN", payload: json });

			// setIsLoading(false);

			navigate("/");
		}
	};

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
							<Link>
								<span>Forgot password?</span>
							</Link>
						</div>

						<button onClick={doLogin} type="submit">
							Log In
						</button>
						<div style={{ alignSelf: "center" }}>
							<Link to="/register">
								<span>Need an account?</span>
							</Link>
						</div>
						{error && <div className="error">{error}</div>}
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;
