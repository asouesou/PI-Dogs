import axios from "axios";
const URL = "http://localhost:3001";
export const GET_BY_ID = "GET_BY_ID";
export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_TEMPS = "GET_TEMPS";
export const FILTER_ALL_DOGS = "FILTER_ALL_DOGS";

export function getTemperaments() {
	return function (dispatch) {
		return axios.get(URL + "/temperaments").then((resp) => {
			dispatch({ type: GET_TEMPS, payload: resp.data });
		});
	};
}

export function filterAllDogs(payload) {
	return {
		type: FILTER_ALL_DOGS,
		payload,
	};
}
export function getAllDogs() {
	return function (dispatch) {
		return axios.get(URL + "/dogs").then((response) => {
			console.log(response.data);
			dispatch({ type: GET_ALL_DOGS, payload: response.data });
		});
	};
}

export let getById = (id) => {
	return async (dispatch) => {
		let response = await axios.get(URL + id);
		dispatch({ type: GET_BY_ID, payload: response.data });
	};
};

export let getByName = (name, breed, temperament, sort) => {
	return async (dispatch) => {
		if (breed) name = breed;
		let DIR = name ? URL + "/dogs" + name : URL + "/dogs";
		let response = await axios.get(DIR);

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
