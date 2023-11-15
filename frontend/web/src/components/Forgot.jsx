import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { API_URL } from "../../api.js";

import "../styles.scss";

function Forgot() {
	const [userEmail, setUserEmail] = useState("");
	const [error, setError] = useState("");
	const [alert, setAlert] = useState(false);
	const [validated, setValidated] = useState(false);
	const [sent, setSent] = useState(false);

	const handleSubmit = async (event) => {
		setError(null);
		setAlert(false);
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
			setValidated(true);
			return;
		}

		event.preventDefault();
		setValidated(true);

		const response = await fetch(API_URL + "/api/user/reset", {
			method: "POST",
			body: JSON.stringify({ email: userEmail }),
			headers: { "Content-Type": "application/JSON" },
		});

		if (!response.ok) {
			const json = await response.json();
			setError(json.message);
			setAlert(true);
		}

		if (response.ok) {
			setSent(true);
		}
	};

	if (sent) {
		return (
			<div className="forgot-box forgot-box-sent">
				<div className="auth-header">
					<h1>Password Reset Link Sent</h1>
					<span>We just sent you an email with a link to reset your password.</span>
				</div>
			</div>
		);
	} else {
		return (
			<div className="forgot-box">
				<div className="auth-header">
					<h1>Forgot Your Password?</h1>
					<span>
						No worries! Enter your email address <br></br>below and we'll send you a
						reset link pronto.
					</span>
				</div>
				{alert && <Alert variant="danger">{error}</Alert>}
				<Form noValidate onSubmit={handleSubmit} validated={validated}>
					<FloatingLabel label="Email address">
						<Form.Control
							required
							type="email"
							placeholder="name@example.com"
							onChange={(e) => {
								setUserEmail(e.target.value);
							}}
							value={userEmail}
						/>
						<Form.Control.Feedback type="invalid">
							Email is required.
						</Form.Control.Feedback>
					</FloatingLabel>
					<button type="submit">Submit</button>
				</Form>
			</div>
		);
	}
}

export default Forgot;
