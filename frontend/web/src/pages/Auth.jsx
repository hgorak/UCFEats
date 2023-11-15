import React from "react";
import { Link, Outlet } from "react-router-dom";

import "../styles.scss";

function Auth() {
	return (
		<div className="auth">
			<div className="navbar-container">
				<div className="navbar">
					<div className="title">
						<Link to="/">
							<h1>UCFEats</h1>
						</Link>
					</div>
				</div>
			</div>
			<div className="auth-container">
				<Outlet />
			</div>
		</div>
	);
}

export default Auth;
