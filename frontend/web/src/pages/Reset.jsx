import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../styles.scss";

function Reset() {
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
							type="email"
							className="login-input"
							placeholder="Confirm New Password"
						/>
						<button type="submit">Change Password</button>
						{/* {error && <div className="error">{error}</div>} */}
					</form>
				</div>
			</div>
		</div>
	);
}

export default Reset;
