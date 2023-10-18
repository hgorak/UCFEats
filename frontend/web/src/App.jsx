import React, { useState } from "react";

import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";

import "./styles.scss";

function App() {
	return (
		<div className="app">
			<div className="container">
				<Register />
			</div>
		</div>
	);
}

export default App;
