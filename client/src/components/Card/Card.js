import React from "react";
import "./Card.css";

const Card = (props) => {
	return (
		<div className="card">
			<div className="img-container">
				<div className="img-inner">
					<div className="inner-skew">
						<img src={props.image} alt="img" />
					</div>
				</div>
			</div>
			<div className="text-container">
				<h3>{props.name}</h3>
				<div className="Span-Card">
					<span>Temperaments: {props.temperament}</span>
					<br />
					<span>Weight: {props.weight}</span>
				</div>
			</div>
		</div>
	);
};

export default Card;
