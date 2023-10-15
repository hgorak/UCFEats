import React from "react";

import "../styles.scss";

function Login() {
	return (
		<div className="login">
			<form>
				<input className="login-input" placeholder="Email address" />
				<input className="login-input" placeholder="Password" />
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default Login;
