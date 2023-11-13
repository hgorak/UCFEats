import React, { useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Forgot from "./pages/Forgot.jsx";
import Reset from "./pages/Reset.jsx";
import Landing from "./pages/Landing.jsx";
import Loading from "./components/Loading.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/dash-pages/Home.jsx";
import Food from "./pages/dash-pages/Food.jsx";
import Favorites from "./pages/dash-pages/Favorites.jsx";
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
			<div className="app-container">
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
						<Route path="/resetpassword" element={<Reset />} errorElement={<Error />} />
						<Route
							path="/loading"
							element={currentUser ? <Loading /> : <Navigate to="/" />}
						/>
						<Route
							path="/dashboard"
							element={currentUser ? <Dashboard /> : <Navigate to="/" />}
						>
							<Route path="/dashboard/home" element={<Home />} />
							<Route path="/dashboard/food" element={<Food />} />
							<Route path="/dashboard/favorites" element={<Favorites />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</div>
		</div>
	);
}

export default App;
