import { useSelector, useDispatch } from "react-redux";
import {
	getTemperaments,
	getAllDogs,
	addDog,
	changeStateAdd,
} from "../../redux/actions";
import React, { useEffect, useState } from "react";
import { AddDogValidate, AddDogObj, btn } from "./AddDogValidate";
import "./AddDog.css";
import Icon from "./Icon.svg";

const AddDog = () => {
	const dispatch = useDispatch();
	const [errors, setErrors] = useState({});

	const initStateInputDog = {
		id: [],
		name: "",
		height: "",
		weight: "",
		life_span: "",
		image: "",
		temperamentId: "",
		temperaments: [],
	};
	const [stateInputDog, setStateInputDog] = useState(initStateInputDog); //Local

	//Breed
	const allDogs = useSelector((state) => state.dogs.allDogs); //Global dogs
	const response = useSelector((state) => state.dogs.response); //Global AddDog
	//Temperaments
	let alltemp = useSelector((state) => state.dogs.temperaments); //Global Temperaments
	var temps = alltemp.sort(function (a, b) {
		if (a.name > b.name) return 1;
		if (a.name < b.name) return -1;
		return 0;
	});

	const handleInputChange = function (e) {
		e.preventDefault();

		setStateInputDog({
			...stateInputDog,
			[e.target.name]: e.target.value,
		});

		if (e.target.name === "temperamentId") {
			if (stateInputDog.id.includes(parseInt(e.target.value))) {
				alert("Already existing. Please try again.");
			} else {
				/* for text - temperaments */
				var combo = document.getElementById("temperaments_input");
				var selected = combo.options[combo.selectedIndex].text;
				console.log("ttttttttttttttttttt", selected);
				setStateInputDog({
					...stateInputDog,
					temperaments: [
						...stateInputDog.temperaments,
						selected,
					],
				});

				setStateInputDog((state) => ({
					...state,
					id: [...state.id, e.target.value],
				}));
			}
		}
		setErrors(
			AddDogValidate(
				{ ...stateInputDog, [e.target.name]: e.target.value },
				allDogs
			)
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		var objDog = AddDogObj(stateInputDog);
		console.log(objDog);
		dispatch(addDog(objDog));
	};

	const handleOk = (e) => {
		e.preventDefault();
		alert(response);
		// resetForm()
		setStateInputDog(initStateInputDog); //Clear
		dispatch(changeStateAdd("null")); //cambio estado
	};
	useEffect(() => {
		dispatch(getAllDogs());
		dispatch(getTemperaments());
	}, [dispatch]);

	return (
		<div id="createDog">
			<h1>&bull; Create Breed &bull;</h1>
			<div className="underline"></div>
			<div className="icon_wrapper">
				<img
					className="icon"
					viewBox="0 0 145.192 145.192"
					src={Icon}
					alt="Icon svg"
				/>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="name">
					<input
						key="name"
						type="text"
						placeholder="Insert name..."
						name="name"
						id="name_input"
						required
						onChange={handleInputChange}
						value={stateInputDog.name}
					/>
					{errors.name && (
						<p className="danger">{errors.name}</p>
					)}
				</div>
				<div className="height">
					<input
						key="height"
						type="text"
						placeholder="Insert height..."
						name="height"
						id="height_input"
						required
						onChange={handleInputChange}
						value={stateInputDog.height}
					/>
					{errors.height && (
						<p className="danger">{errors.height}</p>
					)}
				</div>
				<div className="weight">
					<input
						type="text"
						placeholder="Insert weight..."
						name="weight"
						id="height_input"
						required
						key="weight"
						onChange={handleInputChange}
						value={stateInputDog.weight}
					/>
					{errors.weight && (
						<p className="danger">{errors.weight}</p>
					)}
				</div>
				<div className="Life_Span">
					<input
						key="life_span"
						type="text"
						placeholder="Insert life span..."
						name="life_span"
						id="Life_Span_input"
						required
						onChange={handleInputChange}
						value={stateInputDog.life_span}
					/>
					{errors.life_span && (
						<p className="danger">{errors.life_span}</p>
					)}
				</div>
				<div className="temperaments">
					<select
						placeholder="Temperaments"
						name="temperamentId"
						id="temperaments_input"
						//required
						key="temperaments"
						onChange={handleInputChange}
						//onChange={(e) => handleSelect(e)}
						value={stateInputDog.temperamentId}
					>
						<option key="0" value="" hidden defaultValue>
							Select Temperaments
						</option>

						{temps.map((e, i) => (
							<option key={i} value={e.id}>
								{e.name}
							</option>
						))}
					</select>
					{errors.temperaments && (
						<p className="danger">{errors.temperamentId}</p>
					)}
				</div>
				<div className="message">
					<textarea
						name="message"
						placeholder="Temperaments"
						id="message_input"
						cols="30"
						rows="2"
						value={stateInputDog.temperaments}
						readOnly
					></textarea>
				</div>
				<div className="image">
					<input
						key="image"
						type="text"
						placeholder="Insert Url Image..."
						name="image"
						id="image_input"
						required
						onChange={handleInputChange}
						value={stateInputDog.image}
					/>
					{errors.life_span && (
						<p className="danger">{errors.image}</p>
					)}
				</div>
				<div>
					{!Object.keys(errors).length
						? btn(response, handleOk, handleSubmit)
						: ""}
				</div>
			</form>
		</div>
	);
};

export default AddDog;
