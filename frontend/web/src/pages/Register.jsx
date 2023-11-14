import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../api.js";
import "../styles.scss";

function Register() {
	const [first, setFirst] = useState("");
	const [last, setLast] = useState("");
	const [email, setEmail] = useState("");
	const [email2, setEmail2] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [registered, setRegistered] = useState(false);
	const [error, setError] = useState("");

	const navigate = useNavigate();

	const doRegister = async (event) => {
		setError(null);
		event.preventDefault();

		const response = await fetch(API_URL + "/api/user/register", {
			method: "POST",
			body: JSON.stringify({ email, password, first_name: first, last_name: last }),
			headers: { "Content-Type": "application/JSON" },
		});

		const json = await response.json();

		if (!response.ok) {
			setError(json.error);
		}

		if (response.ok) {
			setRegistered(true);
		}
	};

	return (
		<div className="login">
			<div className="navbar-container navbar-container-bg navbar-container-dash">
				<div className="navbar">
					<div className="title">
						<Link to="/">
							<h1>UCFEats</h1>
						</Link>
					</div>
				</div>
			</div>
			<div className="container">
				{registered ? (
					<div className="forgot-box forgot-box-sent">
						<h1>Email Verification Link Sent</h1>
						<span>We just sent you an email with a link to verify your email.</span>
					</div>
				) : (
					<div className="reg-box">
						<h1>Create an Account</h1>
						<span>We're excited to have you!</span>
						<form>
							<input
								className="login-input"
								type="text"
								placeholder="First Name"
								onChange={(e) => {
									setFirst(e.target.value);
								}}
								value={first}
							/>
							<input
								className="login-input"
								type="text"
								placeholder="Last Name"
								onChange={(e) => {
									setLast(e.target.value);
								}}
								value={last}
							/>
							<input
								className="login-input"
								placeholder="Email Address"
								type="email"
								onChange={(e) => {
									setEmail(e.target.value);
								}}
								value={email}
							/>
							<input
								className="login-input"
								placeholder="Confirm Email Address"
								type="email"
								onChange={(e) => {
									setEmail2(e.target.value);
								}}
								value={email2}
							/>
							<input
								className="login-input"
								placeholder="Password"
								type="password"
								onChange={(e) => {
									setPassword(e.target.value);
								}}
								value={password}
							/>
							<input
								className="login-input"
								placeholder="Confirm Password"
								type="password"
								onChange={(e) => {
									setPassword2(e.target.value);
								}}
								value={password2}
							/>

							<button type="submit" onClick={doRegister}>
								Register
							</button>
							{error && <div className="error">{error}</div>}
							<div style={{ alignSelf: "center" }}>
								<Link to="/login">
									<span>Have an account?</span>
								</Link>
							</div>
						</form>
					</div>
				)}
			</div>
		</div>
	);
}

export default Register;
