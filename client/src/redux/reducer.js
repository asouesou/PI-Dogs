import {
	GET_ALL_DOGS,
	GET_BY_ID,
	GET_BY_NAME,
	GET_TEMPS,
	FILTER_ALL_DOGS,
	INITIATED,
	ADD_DOG,
} from "./actions";

let initialState = {
	allDogs: [],
	dog: [],
	temperaments: [],
	filteredDogs: [],
	initiated: true,
	response: "",
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
				temperaments: action.payload,
			};

		case FILTER_ALL_DOGS:
			const { name, breed, temperament, sort } = action.payload;
			let filtered = state.allDogs;
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

			switch (sort) {
				case "nameAsc":
					filtered = filtered.sort((a, b) => {
						if (b.name.toLowerCase() < a.name.toLowerCase()) {
							return -1;
						}
						if (b.name.toLowerCase() > a.name.toLowerCase()) {
							return 1;
						}
						return 0;
					});
					break;

				case "nameDesc":
					filtered = filtered.sort((a, b) => {
						if (a.name.toLowerCase() < b.name.toLowerCase())
							return -1;
						if (a.name.toLowerCase() > b.name.toLowerCase())
							return 1;
						return 0;
					});
					//console.log(sort, sort, filtered);
					break;

				case "weightAsc":
					filtered = filtered.sort((a, b) => {
						if (a.weight < b.weight) return -1;
						if (a.weight > b.weight) return 1;
						return 0;
					});

					break;
				case "weightDsc":
					filtered = filtered.sort((a, b) => {
						if (b.weight < a.weight) return -1;
						if (b.weight > a.weight) return 1;
						return 0;
					});
					break;
				default:
					break;
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
