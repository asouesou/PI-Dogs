import {
	GET_ALL_DOGS,
	GET_BY_ID,
	GET_BY_NAME,
	GET_TEMPS,
	FILTER_ALL_DOGS,
	INITIATED,
	ADD_DOG,
	CHANGE_STATE_ADD,
} from "./actions";

let initialState = {
	allDogs: [],
	dog: [],
	temperaments: [],
	filteredDogs: [],
	initiated: true,
	response: "Initial",
};

const DogReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_DOG:
			return {
				...state,
				response: action.payload,
			};

		case INITIATED:
			return {
				...state,
				initiated: action.payload,
			};
		case CHANGE_STATE_ADD:
			return {
				...state,
				response: action.payload,
			};

		case GET_BY_ID:
			return {
				...state,
				dog: action.payload,
			};

		case GET_BY_NAME:
			return {
				...state,
				allDogs: action.payload,
			};

		case GET_ALL_DOGS:
			return {
				...state,
				allDogs: action.payload,
				filteredDogs: action.payload,
			};

		case GET_TEMPS:
			return {
				...state,
				temperaments: action.payload, //filter
			};

		case FILTER_ALL_DOGS:
			const { name, breed, temperament, sortt, origin } =
				action.payload;

			let filtered = state.allDogs; //all dates

			if (breed) {
				filtered = filtered.filter((e) => e.name === breed);
			} else {
				if (name) {
					filtered = filtered.filter((e) =>
						e.name.toLowerCase().includes(name.toLowerCase())
					);
				}
			}

			if (temperament) {
				filtered = filtered.filter((e2) =>
					e2.temperament.includes(temperament)
				);
			}

			if (origin) {
				if (origin === "Api") {
					filtered = filtered.filter(
						(e) => e.id.toString().length < 6
					);
				} else {
					filtered = filtered.filter(
						(e) => e.id.toString().length > 6
					);
				}
			}

			if (sortt) {
				if (sortt === "nameAsc") {
					filtered = filtered.sort((a, b) =>
						a.name.localeCompare(b.name)
					);
				}
				if (sortt === "nameDesc") {
					filtered = filtered.reverse((a, b) =>
						a.name.localeCompare(b.name)
					);
				}

				if (sortt === "weightAsc") {
					filtered = filtered.sort(function (a, b) {
						return (
							parseInt(a.weight, 10) -
							parseInt(b.weight, 10)
						);
					});
				}

				if (sortt === "weightDsc") {
					filtered = filtered.sort(function (a, b) {
						return (
							parseInt(b.weight, 10) -
							parseInt(a.weight, 10)
						);
					});
				}
				filtered = filtered.filter((e) => e.id !== "99");
			}

			return {
				...state,
				filteredDogs: filtered,
			};

		default:
			return state;
	}
};

export default DogReducer;
