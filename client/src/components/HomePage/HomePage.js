import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../Cards/Cards";
import {
	getTemperaments,
	filterAllDogs,
	getAllDogs,
	getByName,
} from "../../redux/actions";
import Pagination from "../Pag/pagination";
import "./HomePage.css";

const HomePage = () => {
	const dispatch = useDispatch();
	const allDogs = useSelector((state) => state.allDogs); //Global dogs
	var allDogsFilter = useSelector((state) => state.filteredDogs);

	/////////////////////////PAGINADO    1-8
	const [currentPage, setCurrentPage] = useState(1); //1, 8,  16, 32
	const [dogsPerPage, setDogsPerPage] = useState(8);
	const indexOfLastDog = currentPage * dogsPerPage; // 4*8 = 32) indice del ultimo, 8 inicial
	const indexOfFirstDog = indexOfLastDog - dogsPerPage; // 32-8 = 24 indice del primero 1nicial
	const currentDogs = allDogsFilter.slice(indexOfFirstDog, indexOfLastDog); //24 - 32; dogs pag actual
	const paginate = (pageNumber) => setCurrentPage(pageNumber); //1, 8,  16, 32

	let [filterState, setFilter] = useState({
		name: "",
		breed: "",
		temperament: "",
		sort: "",
	}); // Local filter

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
	let alltemp = useSelector((state) => state.temperaments); //Global Temperaments
	var temps = alltemp.sort((a, b) => {
		if (a.name > b.name) return 1;
		return 0;
	});

	useEffect(() => {
		dispatch(getAllDogs());
		dispatch(getTemperaments());
		console.log("se monto");
	}, [dispatch]);

	useEffect(() => {
		dispatch(filterAllDogs(filterState));
		console.log("ingreso al 222");
	}, [filterState, dispatch]);

	return (
		<div className="HomePage">
			<div className="Display-Filters">
				{/* [ ] Input de búsqueda para encontrar razas de perros por nombre*/}
				<div className="Finder-By-Name">
					<input
						name="name"
						placeholder="Find Breed"
						onChange={(e) => {
							handleChange(e);
						}}
					/>
				</div>

				{/* [ ] Botones/Opciones para filtrar por: Raza existente*/}
				<div className="Order-By-Breed">
					<select name="breed" onChange={(e) => handleChange(e)}>
						<option className="Breed" value="">
							All Breed
						</option>
						{breeds.map((e, i) => (
							<option key={i} value={e}>
								{e}
							</option>
						))}
					</select>
				</div>

				{/* Botones/Opciones para filtrar por:Temperamento*/}
				<div className="Order-By-Temperament">
					<select
						name="temperament"
						onChange={(e) => handleChange(e)}
					>
						<option className="Temperament" value="">
							All Temperaments{" "}
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

				<div className="Order-By-Name">
					<select name="sort" onChange={(e) => handleChange(e)}>
						<option value=""> Order By</option>
						<option value="nameAsc">Name A to Z</option>
						<option value="nameDesc">Name Z to A</option>
						<option value="weightAsc">Asc weight</option>
						<option value="weightDsc">Desc weight</option>
					</select>
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
