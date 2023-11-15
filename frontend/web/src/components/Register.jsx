import React, { useState } from "react";
import { Link } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { API_URL } from "../../api.js";
import "../styles.scss";

function Register() {
	const [first, setFirst] = useState("");
	const [last, setLast] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [registered, setRegistered] = useState(false);
	const [validated, setValidated] = useState(false);
	const [alert, setAlert] = useState(false);
	const [error, setError] = useState("");

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

		const response = await fetch(API_URL + "/api/user/register", {
			method: "POST",
			body: JSON.stringify({ email, password, first_name: first, last_name: last }),
			headers: { "Content-Type": "application/JSON" },
		});

		const json = await response.json();

		if (!response.ok) {
			setError(json.error);
			setAlert(true);
		}

		if (response.ok) {
			setRegistered(true);
		}
	};

	if (registered) {
		return (
			<div className="forgot-box forgot-box-sent">
				<h1>Email Verification Link Sent</h1>
				<span>We just sent you an email with a link to verify your email.</span>
			</div>
		);
	} else {
		return (
			<div className="auth-box">
				<div className="auth-header">
					<h1>Create an Account</h1>
					<span>We're excited to have you!</span>
				</div>
				{alert && <Alert variant="danger">{error}</Alert>}
				<Form noValidate onSubmit={handleSubmit} validated={validated}>
					<Form.Group>
						<FloatingLabel label="First Name">
							<Form.Control
								required
								type="text"
								placeholder="First Name"
								onChange={(e) => {
									setFirst(e.target.value);
								}}
								value={first}
							/>
							<Form.Control.Feedback type="invalid">
								Please provide your first name.
							</Form.Control.Feedback>
						</FloatingLabel>
					</Form.Group>
					<Form.Group>
						<FloatingLabel label="Last Name">
							<Form.Control
								required
								type="text"
								placeholder="Last Name"
								onChange={(e) => {
									setLast(e.target.value);
								}}
								value={last}
							/>
							<Form.Control.Feedback type="invalid">
								Please provide your last name.
							</Form.Control.Feedback>
						</FloatingLabel>
					</Form.Group>
					<Form.Group>
						<FloatingLabel label="Email address">
							<Form.Control
								required
								type="email"
								placeholder="name@example.com"
								onChange={(e) => {
									setEmail(e.target.value);
								}}
								value={email}
							/>
							<Form.Control.Feedback type="invalid">
								Please provide your email address.
							</Form.Control.Feedback>
						</FloatingLabel>
					</Form.Group>
					<Form.Group>
						<FloatingLabel label="Password">
							<Form.Control
								required
								type="password"
								placeholder="password"
								onChange={(e) => {
									setPassword(e.target.value);
								}}
								value={password}
							/>
							<Form.Text>
								Must be at least 8 digits long and contain an uppercase<br></br>{" "}
								letter, a number, and a special character.
							</Form.Text>
							<Form.Control.Feedback type="invalid">
								Password is required.
							</Form.Control.Feedback>
						</FloatingLabel>
					</Form.Group>
					<button type="submit">Log In</button>
					<Form.Text>
						<Link to="/auth/login">
							<span>Have an account?</span>
						</Link>
					</Form.Text>
				</Form>
			</div>
		);
	}
}

export default Register;
