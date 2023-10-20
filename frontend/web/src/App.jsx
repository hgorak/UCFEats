import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Landing from "./pages/Landing.jsx";
import Error from "./pages/Error.jsx";

import "./styles.scss";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Landing />,
		errorElement: <Error />,
	},
	{
		path: "/login",
		element: <Login />,
	},
]);

function App() {
	return (
		<div className="app">
			<div className="container">
				<RouterProvider router={router} />
			</div>
		</div>
	);
}

export default App;
