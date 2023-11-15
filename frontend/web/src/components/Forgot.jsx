import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../api.js";

import "../styles.scss";

function Forgot() {
	const [userEmail, setUserEmail] = useState("");
	const [error, setError] = useState("");
	const [sent, setSent] = useState(false);

	const doResetPass = async (event) => {
		setError(null);
		event.preventDefault();

		const response = await fetch(API_URL + "/api/user/reset", {
			method: "POST",
			body: JSON.stringify({ email: userEmail }),
			headers: { "Content-Type": "application/JSON" },
		});

		if (!response.ok) {
			const json = await response.json();
			setError(json.message);
		}

		if (response.ok) {
			setSent(true);
		}
	};

	return (
		<div className="auth">
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
				{sent ? (
					<div className="forgot-box forgot-box-sent">
						<h1>Password Reset Link Sent</h1>
						<span>We just sent you an email with a link to reset your password.</span>
					</div>
				) : (
					<div className="forgot-box">
						<h1>Forgot Your Password?</h1>
						<span>
							No worries! Enter your email address <br></br>below and we'll send you a
							reset link pronto.
						</span>
						<form>
							<input
								required
								type="email"
								className="login-input"
								placeholder="Email Address"
								onChange={(e) => {
									setUserEmail(e.target.value);
								}}
							/>
							<button type="submit" onClick={doResetPass}>
								Submit
							</button>
							{error && <div className="error">{error}</div>}
						</form>
					</div>
				)}
			</div>
		</div>
	);
}

export default Forgot;
