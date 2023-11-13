import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../styles.scss";

function Forgot() {
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
						/>
						<button type="submit">Submit</button>
						{/* {error && <div className="error">{error}</div>} */}
					</form>
				</div>
			</div>
		</div>
	);
}

export default Forgot;
