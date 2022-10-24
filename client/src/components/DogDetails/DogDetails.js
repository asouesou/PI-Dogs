import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getById } from "../../redux/actions";
import "./DogDetails.css";

const DogDetails = () => {
	let { id: IdDog } = useParams();
	let [id] = useState(IdDog);
	const dispatch = useDispatch();
	const dog = useSelector((state) => state.dogs.dog); //Global dogs
	let { name, height, weight, life_span, image, temperament } = dog;

	const history = useHistory();
	console.log(history.location.pathname);

	function goBack() {
		history.push("/home");
		//history.goBack(1);
	}

	useEffect(() => {
		dispatch(getById(id));
	}, [dispatch, id]);

	return (
		<div>
			<section>
				<h1>{name}</h1>
				<div className="content">
					<ul className="lista">
						<li>
							Height Metric : <span> {height}</span>
						</li>
						<li>
							Weight Metric : <span> {weight}</span>
						</li>
						<li>
							life_span : <span>{life_span}</span>
						</li>
					</ul>

					<ul>
						Temperaments:
						{temperament &&
							temperament.map((e, i) => (
								<li key={i}>{e}</li>
							))}
					</ul>

					{/* <a href="javascript: history.go(-1)">Go back</a> */}

					<a href="#" onClick={goBack}>
						Go back
					</a>
				</div>
				<div className="img">
					<img src={image} alt={image} />
				</div>
			</section>
			<a
				className="attribution"
				href={`https://api.thedogapi.com/v1/breeds/search?q=${name}`}
			>
				SOURCE DATA
			</a>
		</div>
	);
};

export default DogDetails;
