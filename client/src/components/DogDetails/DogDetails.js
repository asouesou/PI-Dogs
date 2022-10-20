import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getById } from "../../redux/actions";
import ReturnImg from "./return.svg";
import "./DogDetails.css";

const DogDetails = () => {
	let { id: code } = useParams();
	let [id] = useState(code);
	const dispatch = useDispatch();
	const dog = useSelector((state) => state.dog);
	let { idd, name, height, weight, life_span, image, temperament } = dog;

	useEffect(() => {
		dispatch(getById(id));
	}, [dispatch, id]);

	// function formatNumber(num) {
	//     return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
	//   }
	return (
		<div className="Details-Content">
			<div className="card-Details">
				<div className="Return-Icon">
					{/* <a href="javascript: history.go(-1)">
						<img src={ReturnImg}></img>
					</a> */}
				</div>

				<div className="container-Details">
					<h1>{name}</h1>
					<p>
						Dog Id: <span>{idd}</span>{" "}
					</p>
					<p>
						height: <span>{height}</span>
					</p>
					<p>
						weight: <span>{weight}</span>
					</p>
					<p>
						life_span: <span>{life_span}</span>
					</p>
					<p>
						image: <span>{image} Km2</span>{" "}
					</p>
					<p>
						temperament: <span>{temperament}</span>
					</p>
					{/* <p>Population: {formatNumber(population)}</p> */}

					<h2>temperament:</h2>
					<p>
						{temperament && temperament.length ? (
							temperament.map((e) => (
								<li>
									Name: <span>{e} </span>
									<p>
										Duration: <span>{e}</span>{" "}
										Days{" "}
									</p>
									<div className="Actividad-Linea"></div>
								</li>
							))
						) : (
							<span>No activities yet</span>
						)}
					</p>
				</div>
			</div>
		</div>
	);
};

export default DogDetails;
