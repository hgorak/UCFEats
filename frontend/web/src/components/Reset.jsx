import React, { useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { API_URL } from "../../api.js";

import "../styles.scss";

function Reset() {
	let { resetToken } = useParams();
	const [error, setError] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [alert, setAlert] = useState(false);
	const [validated, setValidated] = useState(false);
	const [reset, setReset] = useState(false);

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

		const response = await fetch(API_URL + "/api/user/reset/" + resetToken, {
			method: "PATCH",
			body: JSON.stringify({ password: newPassword }),
			headers: { "Content-Type": "application/JSON" },
		});

		const json = await response.json();

		if (!response.ok) {
			setError(json.error);
			setAlert(true);
		}

		if (response.ok) {
			setReset(true);
		}
	};

	if (reset) {
		return (
			<div className="forgot-box forgot-box-sent">
				<div className="auth-header">
					<h1>Password Successfully Reset</h1>
					<span>
						Enjoy your new password! <Link to="/login">Log in</Link>
					</span>
				</div>
			</div>
		);
	} else {
		return (
			<div className="forgot-box">
				<div className="auth-header">
					<h1>Change your Password</h1>
					<span>
						Make this one memorable. <br></br>Or super complicated. Up to you.
					</span>
				</div>
				{alert && <Alert variant="danger">{error}</Alert>}
				<Form noValidate onSubmit={handleSubmit} validated={validated}>
					<FloatingLabel label="New Password">
						<Form.Control
							required
							type="password"
							placeholder="New Password"
							onChange={(e) => {
								setNewPassword(e.target.value);
							}}
							value={newPassword}
						/>
						<Form.Control.Feedback type="invalid">
							Please provide a new password.
						</Form.Control.Feedback>
					</FloatingLabel>
					<button type="submit">Submit</button>
				</Form>
			</div>
		);
	}
}

export default Reset;
