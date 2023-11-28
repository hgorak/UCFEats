import React, { useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "./components/Register.jsx";
import Verification from "./components/Verification.jsx";
import Auth from "./pages/Auth.jsx";
import Login from "./components/Login.jsx";
import Forgot from "./components/Forgot.jsx";
import Reset from "./components/Reset.jsx";
import Landing from "./pages/Landing.jsx";
import Loading from "./components/Loading.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/dash-pages/Home.jsx";
import Food from "./pages/dash-pages/Food.jsx";
import Favorites from "./pages/dash-pages/Favorites.jsx";
import Error from "./components/Error.jsx";
import { AuthContext } from "./context/AuthContext.jsx";

import "./styles.scss";

function App() {
	const { currentUser } = useContext(AuthContext);
	return (
		<div className="app">
			<div className="app-container">
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Landing />} errorElement={<Error />} />
						<Route path="/auth" element={<Auth />} errorElement={<Error />}>
							<Route
								path="/auth/login"
								element={<Login />}
								errorElement={<Error />}
							/>
							<Route
								path="/auth/register"
								element={<Register />}
								errorElement={<Error />}
							/>
							<Route
								path="/auth/verification/:verificationToken"
								element={<Verification />}
								errorElement={<Error />}
							/>
							<Route
								path="/auth/forgotpassword"
								element={<Forgot />}
								errorElement={<Error />}
							/>
							<Route
								path="/auth/reset/:resetToken"
								element={<Reset />}
								errorElement={<Error />}
							/>
						</Route>
						<Route
							path="/loading"
							element={currentUser ? <Loading /> : <Navigate to="/" />}
						/>
						<Route
							path="/dashboard"
							element={currentUser ? <Dashboard /> : <Navigate to="/" />}
						>
							<Route path="/dashboard/" element={<Home />} />
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
