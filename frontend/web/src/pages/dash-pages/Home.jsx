import React from "react";
import { useOutletContext } from "react-router-dom";

function Home() {
	return (
		<div className="home">
			<div className="charts"></div>
			<div className="records">
				<div class="record-hero">
					<h2>Recent Eats</h2>
				</div>
			</div>
		</div>
	);
}

export default Home;
