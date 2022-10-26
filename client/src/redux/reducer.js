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
			const { name, breed, temperament, sort, origin } =
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
				console.log("filtro  origin ", origin);
				console.log("IMPRIMIENDO FILTERED ", filtered);

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
			console.log("IMPRIMIENDO FILTERED2 ", filtered);
			switch (sort) {
				case "nameAsc":
					filtered.sort((a, b) => a.name.localeCompare(b.name));
					console.log("Asc", sort, filtered);

					break;

				case "nameDesc":
					filtered.reverse((a, b) =>
						a.name.localeCompare(b.name)
					);
					console.log("desc", sort, filtered);
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
