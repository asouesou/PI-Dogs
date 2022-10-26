import axios from "axios";
const URLDOG = "http://localhost:3001/dogs/";
const URLTEMP = "http://localhost:3001/temperaments/";

export const GET_TEMPS = "GET_TEMPS";
export function getTemperaments() {
	return async function (dispatch) {
		return await axios.get(URLTEMP).then((resp) => {
			dispatch({ type: GET_TEMPS, payload: resp.data });
		});
	};
}

export const ADD_DOG = "ADD_DOG";
export function addDog(objDog) {
	const request = {
		url: URLDOG,
		method: "POST",
		data: objDog,
	};
	return function (dispatch) {
		return axios(request).then((response) => {
			dispatch({ type: ADD_DOG, payload: response.data });
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
		dispatch({ type: GET_BY_ID, payload: response.data });
	};
};

export const GET_BY_NAME = "GET_BY_NAME";
export let getByName = (name) => {
	return async (dispatch) => {
		dispatch({ type: GET_BY_NAME, payload: name });
	};
};

export const POST_TEMP = "POST_TEMP";

export const INITIATED = "INITIATED";
export function stateInitiated(estado) {
	return {
		type: INITIATED,
		payload: estado,
	};
}

export const CHANGE_STATE_ADD = "CHANGE_STATE_ADD";
export function changeStateAdd(estado) {
	return {
		type: CHANGE_STATE_ADD,
		payload: estado,
	};
}
