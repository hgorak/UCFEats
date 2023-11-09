import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";
import { AiFillHome } from "react-icons/ai";
import { IconContext } from "react-icons";
import "../styles.scss";

function DashNav() {
	return (
		<div className="navbar-container navbar-container-dash">
			<div className="navbar navbar-dash">
				<div className="title">
					<h1>UCFEats</h1>
				</div>
				<div className="buttons">
					<NavLink to="/">
						<button>Overview</button>
					</NavLink>
					<NavLink to="restaurants">
						<button>What to Eat</button>
					</NavLink>
					<NavLink to="favorites">
						<button>Favorite Eats</button>
					</NavLink>
				</div>
				<div className="account">Welcome back, Darren</div>
			</div>
		</div>
	);
}

export default DashNav;
