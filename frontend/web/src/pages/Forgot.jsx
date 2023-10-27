import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../styles.scss";

function Login() {
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
						<button onClick={handleSubmit} type="submit">
							Log In
						</button>
						{error && <div className="error">{error}</div>}
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;
