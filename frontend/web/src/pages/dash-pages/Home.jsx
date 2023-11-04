import React from "react";
import { useOutletContext } from "react-router-dom";

function Home() {
	const { currentUser } = useOutletContext();
	return (
		<div className="home">
			<h1>Welcome back, {currentUser.first_name}</h1>
			<div className="container">
				<div className="trends"></div>
				<div className="goals"></div>
			</div>
			<div className="recent"></div>
		</div>
	);
}

export default Home;
