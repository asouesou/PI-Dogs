import axios from "axios";
const URLDOG = "http://localhost:3001/dogs/";
const URLTEMP = "http://localhost:3001/temperaments/";

export const apiAddDog = (inputDog) => {
	const request = {
		method: "POST",
		body: JSON.stringify(inputDog),
		headers: { "Content-type": "application/json; charset=UTF-8" },
	};
	return fetch(URLDOG, request).then((response) => response.json());
};

export const apiGetTemp = () => {
	console.log("Estoy en apiGetTemp ");
	const request = {
		method: "GET",
		headers: { "Content-type": "application/json; charset=UTF-8" },
	};
	return axios.get(URLTEMP, request).then((resp) => resp);
};
