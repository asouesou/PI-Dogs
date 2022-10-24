import { useSelector, useDispatch } from "react-redux";
import { getTemperaments, getAllDogs, addDog } from "../../redux/actions";
import React, { useEffect, useState } from "react";
import AddDogValidate from "./AddDogValidate";
import "./AddDog.css";
import Icon from "./Icon.svg";

const AddDog = () => {
	const dispatch = useDispatch();
	const [errors, setErrors] = useState({});
	const [te, setTe] = useState([]);

	const initStateInputDog = {
		name: "",
		height: "",
		weight: "",
		life_span: "",
		image: "",
		temperamentId: [],
	};
	const [stateInputDog, setStateInputDog] = useState(initStateInputDog);

	const res = useSelector((state) => state.dogs.response); //Global dogs

	//Breed
	const allDogs = useSelector((state) => state.dogs.allDogs); //Global dogs

	//Temperaments
	let alltemp = useSelector((state) => state.dogs.temperaments); //Global Temperaments
	var temps = alltemp.sort(function (a, b) {
		if (a.name > b.name) return 1;
		if (a.name < b.name) return -1;
		return 0;
	});

	// Array de Estado local para los cod Teperamentos
	const [InputTemp, setInputTemp] = useState([]);

	const handleInputChange = function (e) {
		e.preventDefault();
		setStateInputDog({
			...stateInputDog,
			[e.target.name]: e.target.value,
		});
		setErrors(
			AddDogValidate({
				...stateInputDog,
				[e.target.name]: e.target.value,
			})
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch(addDog(stateInputDog)).then((resp) => {
			console.log(resp);
			alert(stateInputDog);
			setStateInputDog(initStateInputDog); //Clear
		});
	};

	function handleSelect(e) {
		if (stateInputDog.temperamentId.includes(parseInt(e.target.value))) {
			alert("Already existing. Please try again.");
		} else {
			/* Para obtener el texto de temp */
			var combo = document.getElementById("temperaments_input");
			var selected = combo.options[combo.selectedIndex].text;

			setTe((prev) => [...prev, selected]);

			setStateInputDog((prev) => ({
				...prev,
				temperamentId: [
					...prev.temperamentId,
					parseInt(e.target.value),
				],
			}));
		}
	}

	useEffect(() => {
		dispatch(getAllDogs());
		dispatch(getTemperaments());
	}, [dispatch]);

	return (
		<div id="container">
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
					<label for="name"></label>
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
					<label for="height"></label>

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
					<label for="weight"></label>
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
					<label for="Life_Span"></label>

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
					<label for="temperaments"></label>
					<select
						placeholder="Temperaments"
						name="temperaments"
						id="temperaments_input"
						required
						key="temperaments"
						onChange={(e) => handleSelect(e)}
						value={stateInputDog.temperamentId}
					>
						<option key="0" hidden selected>
							Select Temperaments
						</option>
						{temps?.map((e, i) => (
							<option key={i} value={e.id}>
								{e.name}
							</option>
						))}
					</select>
					{errors.temperaments && (
						<p className="danger">{errors.temperaments}</p>
					)}
				</div>

				<div className="message">
					<label for="message"></label>
					<textarea
						name="message"
						placeholder="Temperaments"
						id="message_input"
						cols="30"
						rows="5"
						value={te}
						required
					></textarea>
				</div>

				<div className="image">
					<label for="image"></label>

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

				<div className="submit">
					<input
						type="submit"
						value="Created"
						id="form_button"
						onClick={handleSubmit}
					/>
				</div>
			</form>
		</div>
	);
};

export default AddDog;
