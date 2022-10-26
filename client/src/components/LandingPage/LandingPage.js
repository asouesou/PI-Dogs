import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { stateInitiated } from "../../redux/actions";
import { Link } from "react-scroll";
import "./LandingPage.css";
import A2 from "./A2.svg";
import P1 from "./P1.png";
import P4 from "./P4.png";
import F from "./F.jpg";

const LandingPage = () => {
	const dispatch = useDispatch();
	const initial = useSelector((state) => state.dogs.initiated); //Global

	const handleToggleClick = () => {
		dispatch(stateInitiated(false));
	};

	if (!initial) {
		return null;
	}

	return (
		<div className="Landing">
			<div className="Fondo">
				<img src={F} alt="Fondo" />
				<div className="Dog">
					<img src={P1} alt="Dog" />
				</div>
				<div className="Dog4">
					<img src={P4} alt="Dog4" />
				</div>
			</div>
			<div className="ContainerText">
				<h1 className="Title">Welcome ...</h1>
				<p className="Info">All about dogs in one place </p>
				<Link to="NavBar" spy={true} smooth={true}>
					<img
						onClick={handleToggleClick}
						className="animation"
						alt="Down"
						width="100"
						height="100"
						src={A2}
					></img>
				</Link>
			</div>
		</div>
	);
};

export default LandingPage;
