import React from "react";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import "./Cards.css";
const Cards = ({ dogs }) => {
	return (
		<div className="cards">
			{dogs &&
				dogs?.map((e, i) => (
					<div key={e.id}>
						<Link
							style={{ textDecoration: "none" }}
							to={`/dogs/${e.id}`}
							key={e.id}
						>
							<Card
								image={e.image}
								name={e.name}
								temperament={e.temperament.join(", ")}
								height={e.height.metric}
							/>
						</Link>
					</div>
				))}
		</div>
	);
};

export default Cards;
