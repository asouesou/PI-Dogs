import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";

export const Nav = () => {
	return (
		<div id="NavBar" className="Nav-Links">
			<div>
				<NavLink
					activeStyle={{
						color: "180,180,180",
						fontWeight: "Open Sans",
					}}
					className="Link"
					to="/add"
				>
					Add breed
				</NavLink>
			</div>
			<div>
				<NavLink
					activeStyle={{
						color: "180,180,180",
						fontWeight: "Open Sans",
					}}
					className="Link"
					to="/home"
				>
					<span>Home</span>
				</NavLink>
			</div>

			<div>
				<NavLink
					activeStyle={{
						color: "180,180,180",
						fontWeight: "Open Sans",
					}}
					className="Link"
					to="/about"
				>
					About
				</NavLink>
			</div>
		</div>
	);
};
