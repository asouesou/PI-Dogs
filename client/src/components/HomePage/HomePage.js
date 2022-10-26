import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../Cards/Cards";
import {
	getTemperaments,
	filterAllDogs,
	getAllDogs,
} from "../../redux/actions";
import Pagination from "../Pag/pagination";
import "./HomePage.css";

const HomePage = () => {
	const dispatch = useDispatch();
	const allDogs = useSelector((state) => state.dogs.allDogs); //Global dogs
	var allDogsFilter = useSelector((state) => state.dogs.filteredDogs);

	/////////////////////////PAGINADO    1-8
	const [currentPage, setCurrentPage] = useState(1); //1, 8,  16, 32
	const [dogsPerPage] = useState(8);
	const indexOfLastDog = currentPage * dogsPerPage; // 4*8 = 32) indice del ultimo, 8 inicial
	const indexOfFirstDog = indexOfLastDog - dogsPerPage; // 32-8 = 24 indice del primero 1nicial
	const currentDogs = allDogsFilter.slice(indexOfFirstDog, indexOfLastDog); //24 - 32; dogs pag actual
	const paginate = (pageNumber) => setCurrentPage(pageNumber); //1, 8,  16, 32
	//Local filter
	const initialState = {
		name: "",
		breed: "",
		temperament: "",
		sort: "",
		origin: "",
	};
	let [filterState, setFilter] = useState(initialState); // Local filter

	//Evento xra todos los filtros y busquedas
	const handleChange = (e) => {
		e.preventDefault();
		if (filterState.breed)
			document.getElementsByTagName("input")[0].value = "";

		dispatch(filterAllDogs(filterState));
		setFilter({ ...filterState, [e.target.name]: e.target.value });
	};

	//breeds
	var breeds = [];
	allDogs.map((e) => breeds.push(e.name));

	//Temperaments
	let alltemp = useSelector((state) => state.dogs.temperaments); //Global Temperaments
	var temps = alltemp.sort((a, b) => {
		if (a.name > b.name) return 1;
		return 0;
	});

	useEffect(() => {
		dispatch(getAllDogs());
		dispatch(getTemperaments());
	}, [dispatch]);

	useEffect(() => {
		dispatch(filterAllDogs(filterState));
	}, [filterState.sort, filterState.temperament, dispatch, filterState]);

	return (
		<div className="HomePage">
			<div className="Display-Filters">
				<div className="columnaHP">
					{/* [ ] Botones/Opciones para filtrar por: Raza existente*/}
					<div className="Filter-By-Breed">
						<select
							id="breed"
							name="breed"
							onChange={(e) => handleChange(e)}
						>
							<option className="Breed" value="">
								Filter by Breed
							</option>
							{breeds.map((e, i) => (
								<option key={i} value={e}>
									{e}
								</option>
							))}
						</select>
					</div>
					{/* [ ] Botones/Opciones para filtrar por: BD o API*/}
					<div className="Filter-By-Bd-Api">
						<select
							id="origin"
							placeholder="By Origin"
							name="origin"
							key="origin"
							onChange={(e) => handleChange(e)}
						>
							<option className="Origin" value="">
								Filter By Origin
							</option>
							<option value="Api">Api</option>
							<option value="DB">Data Base</option>
						</select>
					</div>
				</div>
				<div className="columnaHP">
					{/* Botones/Opciones para filtrar por:Temperamento*/}
					<div className="Filter-By-Temperament">
						<select
							id="temperament"
							name="temperament"
							onChange={(e) => handleChange(e)}
						>
							<option className="Temperament" value="">
								Filter by Temperaments
							</option>
							{temps.map((e, i) => (
								<option key={i} value={e.name}>
									{e.name}
								</option>
							))}
						</select>
					</div>
					{/* [ ] Botones/Opciones para ordenar tanto asc como desc las razas de perro por:
				Orden alfabético  /  Peso */}
					<div className="Order">
						<select
							name="sort"
							id="sort"
							onChange={(e) => handleChange(e)}
						>
							<option value=""> Sort By</option>
							<option value="nameAsc">Name A to Z</option>
							<option value="nameDesc">Name Z to A</option>
							<option value="weightAsc">Asc weight</option>
							<option value="weightDsc">
								{" "}
								Desc weight
							</option>
						</select>
					</div>
				</div>
				<div className="columnaHP">
					{/* [ ] Input de búsqueda para encontrar razas de perros por nombre*/}
					<div className="Finder-By-Name">
						<input
							id="name"
							name="name"
							placeholder="Find Breed"
							onChange={(e) => {
								handleChange(e);
							}}
						/>
					</div>

					<button
						className="button-filter"
						onClick={(e) => {
							document.getElementById("breed").value = "";
							document.getElementById("origin").value = "";
							document.getElementById(
								"temperament"
							).value = "";
							document.getElementById("name").value = "";
							document.getElementById("sort").value = "";
							handleChange(e);
						}}
					>
						---- Clean Filters ----
					</button>
				</div>
			</div>
			<Pagination
				dogsPerPage={dogsPerPage}
				countDogs={allDogsFilter.length}
				paginate={paginate}
			/>
			<Cards dogs={currentDogs} />
		</div>
	);
};

export default HomePage;
