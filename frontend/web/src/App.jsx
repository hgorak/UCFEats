import React, { useState } from "react";

import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Landing from "./pages/Landing.jsx";

import "./styles.scss";

function App() {
	return (
		<div className="app">
			<div className="container">
				<Landing />
			</div>
		</div>
	);
}

export default App;
