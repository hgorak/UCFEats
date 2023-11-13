import React, { useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../api.js";

import "../styles.scss";

function Reset() {
	let { resetToken } = useParams();
	const [error, setError] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [reset, setReset] = useState(false);

	const resetPass = async (event) => {
		setError(null);
		event.preventDefault();

		const response = await fetch(API_URL + "/api/user/reset/" + resetToken, {
			method: "PATCH",
			body: JSON.stringify({ password: newPassword }),
			headers: { "Content-Type": "application/JSON" },
		});

		const json = await response.json();

		if (!response.ok) {
			setError(json.message);
		}

		if (response.ok) {
			setReset(true);
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
				{sent ? (
					<div className="forgot-box forgot-box-sent">
						<h1>Password Successfully Reset</h1>
						<span>
							Enjoy your new password! <Link to="/login">Log in</Link>
						</span>
					</div>
				) : (
					<div className="forgot-box">
						<h1>Change your Password</h1>
						<span>
							Make this one memorable. <br></br>Or super complicated. Up to you.
						</span>
						<form>
							<input
								required
								type="password"
								className="login-input"
								placeholder="New Password"
							/>
							<input
								required
								type="password"
								className="login-input"
								placeholder="Confirm New Password"
								onChange={(e) => {
									setNewPassword(e.target.value);
								}}
							/>
							<button type="submit" onClick={resetPass}>
								Change Password
							</button>
							{error && <div className="error">{error}</div>}
						</form>
					</div>
				)}
			</div>
		</div>
	);
}

export default Reset;
