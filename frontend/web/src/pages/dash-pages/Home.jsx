import React from "react";
import { useOutletContext } from "react-router-dom";

function Home() {
	return (
		<div className="home">
			<div className="charts"></div>
			<div className="records"></div>
		</div>
	);
}

export default Home;
