import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../api.js";
import "../styles.scss";

function Register() {
	// const [first, setFirst] = useState("");
	// const [last, setLast] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	// const [email2, setEmail2] = useState("");
	const [password, setPassword] = useState("");
	// const [password2, setPassword2] = useState("");

	const navigate = useNavigate();
	const doRegister = async (event) => {
		// setError(null);
		event.preventDefault();

		const response = await fetch(API_URL + "/api/user/register", {
			method: "POST",
			body: JSON.stringify({ email, password, name }),
			headers: { "Content-Type": "application/JSON" },
		});

		const json = await response.json();

		// if (!response.ok) {
		// 	setIsLoading(false);
		// 	setError(json.error);
		// }
		if (!response.ok) {
			// setError(json.error);
			console.log(json.error);
		}

		if (response.ok) {
			// Save user to local storage
			// localStorage.setItem("user", JSON.stringify(json));

			// Update auth context
			// dispatch({ type: "LOGIN", payload: json });

			// setIsLoading(false);

			navigate("/login");
			console.log("success");
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
				<div className="reg-box">
					<h1>New Member</h1>
					<form>
						<input
							className="login-input"
							type="text"
							placeholder="Name"
							onChange={(e) => {
								setName(e.target.value);
							}}
							value={name}
						/>
						{/* <input className="login-input" placeholder="Last Name" /> */}
						<input
							className="login-input"
							placeholder="Email Address"
							type="email"
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							value={email}
						/>
						{/* <input className="login-input" placeholder="Confirm Email Address" /> */}
						<input
							className="login-input"
							placeholder="Password"
							type="password"
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							value={password}
						/>
						{/* <input className="login-input" placeholder="Confirm Password" /> */}

						<button type="submit" onClick={doRegister}>
							Register
						</button>
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
