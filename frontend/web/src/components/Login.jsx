import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../context/AuthContext.jsx";

import "../styles.scss";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [validated, setValidated] = useState(false);
	const [alert, setAlert] = useState(false);
	const navigate = useNavigate();

	const { login } = useContext(AuthContext);

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

		setValidated(true);
		event.preventDefault();

		try {
			await login(email, password);
			navigate("/dashboard/");
		} catch (err) {
			setError(err);
			setAlert(true);
		}
	};

	return (
		<div className="auth-box">
			<div className="auth-header">
				<h1>Member Login</h1>
				<span>Welcome back! It's great to see you again.</span>
			</div>
			{alert && <Alert variant="danger">{error}</Alert>}
			<Form noValidate onSubmit={handleSubmit} validated={validated}>
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
							Email is required.
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
						<Form.Control.Feedback type="invalid">
							Password is required.
						</Form.Control.Feedback>
					</FloatingLabel>
					<Form.Text>
						<Link to="/auth/forgotpassword">Forgot your password?</Link>
					</Form.Text>
				</Form.Group>
				<button type="submit">Log In</button>
				<Form.Text>
					<Link to="/auth/register">
						<span>Need an account?</span>
					</Link>
				</Form.Text>
			</Form>
		</div>
	);
}

export default Login;
