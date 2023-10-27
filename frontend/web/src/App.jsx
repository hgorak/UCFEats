import React, { useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Forgot from "./pages/Forgot.jsx";
import Landing from "./pages/Landing.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Error from "./pages/Error.jsx";
import { AuthContext } from "./context/AuthContext.jsx";

import "./styles.scss";

// const router = createBrowserRouter([
// 	{
// 		path: "/",
// 		element: <Landing />,
// 		errorElement: <Error />,
// 	},
// 	{
// 		path: "/login",
// 		element: <Login />,
// 	},
// 	{
// 		path: "/register",
// 		element: <Register />,
// 	},
// 	{
// 		path: "/dashboard",
// 		element: {},
// 	},
// ]);

function App() {
	const { currentUser } = useContext(AuthContext);
	return (
		<div className="app">
			<div className="container">
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Landing />} errorElement={<Error />} />
						<Route path="/login" element={<Login />} errorElement={<Error />} />
						<Route path="/register" element={<Register />} errorElement={<Error />} />
						<Route
							path="/forgotpassword"
							element={<Forgot />}
							errorElement={<Error />}
						/>
						<Route
							path="/dashboard"
							element={currentUser ? <Dashboard /> : <Navigate to="/" />}
						/>
					</Routes>
				</BrowserRouter>
			</div>
		</div>
	);
}

export default App;
