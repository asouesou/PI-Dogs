function AddDogValidate(input) {
	let errors = {};
	if (!input.name) {
		errors.name = "Name is required";
	}
	if (!input.height) {
		errors.height = "Height is required";
	} else if (!/\d{1,2}-\d{1,2}/g.test(input.height)) {
		errors.height = "Add a height range. Example: '10-12'";
	}
	if (!input.weight) {
		errors.weight = "Weight is required";
	} else if (!/\d{1,2}-\d{1,2}/g.test(input.weight)) {
		errors.weight = "Add a weight range. Example: '10-12'";
	}
	if (!input.life_span) {
		errors.life_span = "Life Span is required";
	}
	if (!input.temperaments) {
		errors.temperaments = "Add at least one temperament";
	}
	return errors;
}

export default AddDogValidate;
