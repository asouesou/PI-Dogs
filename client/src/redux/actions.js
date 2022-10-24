import axios from "axios";
import { apiAddDog } from "../lib/api";
const URLDOG = "http://localhost:3001/dogs/";
const URLTEMP = "http://localhost:3001/temperaments/";

export const POST_TEMP = "POST_TEMP";

export const INITIATED = "INITIATED";
export function stateInitiated(estado) {
	return {
		type: INITIATED,
		payload: estado,
	};
}

export const GET_TEMPS = "GET_TEMPS";
export function getTemperaments() {
	return async function (dispatch) {
		return await axios.get(URLTEMP).then((resp) => {
			dispatch({ type: GET_TEMPS, payload: resp.data });
		});
	};
}

export const ADD_DOG = "ADD_DOG";
export function addDog(inputDog) {
	const request = {
		url: URLDOG,
		method: "POST",
		data: inputDog,
	};
	return function (dispatch) {
		return axios.post(request).then((resp) => {
			dispatch({ type: ADD_DOG, payload: resp.data });
		});
	};
}

export function postTemp(InputTemp) {
	return function (dispatch) {
		return axios.post(URLTEMP, InputTemp).then((resp) => {
			dispatch({ type: GET_TEMPS, payload: resp.data });
		});
	};
}

export const FILTER_ALL_DOGS = "FILTER_ALL_DOGS";
export function filterAllDogs(payload) {
	return {
		type: FILTER_ALL_DOGS,
		payload,
	};
}

export const GET_ALL_DOGS = "GET_ALL_DOGS";
export function getAllDogs() {
	return function (dispatch) {
		return axios.get(URLDOG).then((response) => {
			console.log(response.data);
			dispatch({ type: GET_ALL_DOGS, payload: response.data });
		});
	};
}

export const GET_BY_ID = "GET_BY_ID";
export let getById = (id) => {
	return async (dispatch) => {
		let response = await axios.get(`${URLDOG}${id}`);
		console.log("GET_BY_ID", response.data);
		dispatch({ type: GET_BY_ID, payload: response.data });
	};
};

export const GET_BY_NAME = "GET_BY_NAME";
export let getByName = (name, breed, temperament, sort) => {
	return async (dispatch) => {
		if (breed) name = breed;
		let url = name ? URLDOG + name : URLDOG;
		let response = await axios.get(url);

		if (temperament) {
			var dogTemp = response.data.filter((el) =>
				el.temperament.split(", ").includes(temperament)
			);
		} else dogTemp = response.data;

		switch (sort) {
			case "nameAsc":
				var dogSort = dogTemp.sort((a, b) => {
					if (a.name > b.name) return 1;
					if (a.name < b.name) return -1;
					return 0;
				});
				break;
			case "nameDesc":
				dogSort = dogTemp.sort((b, a) => {
					if (a.name > b.name) return 1;
					if (a.name < b.name) return -1;
					return 0;
				});
				break;
			case "weightAsc":
				dogSort = dogTemp.sort((a, b) => {
					if (a.weight > b.weight) return 1;
					if (a.weight < b.weight) return -1;
					return 0;
				});
				break;
			case "weightDsc":
				dogSort = dogTemp.sort((a, b) => {
					if (a.weight > b.weight) return 1;
					if (a.weight < b.weight) return -1;
					return 0;
				});
				break;
			default:
				dogSort = dogTemp;
				break;
		}

		dispatch({ type: GET_BY_NAME, payload: dogSort });
	};
};
export const axiosPostDogs = (inputDog) => {
	return (dispatch) => {
		//redux-thunk nos permite mandar el dispatch como parámetro
		apiAddDog(inputDog) //Llamamos a la función de la api
			.then((res) =>
				//al resolverse la petición de manera correcta desencadenamos la acción
				// postDog enviando el dog recibido
				{
					dispatch(addDog(res));
				}
			)
			.catch((res) => {
				console.log(res);
			});
	};
};
