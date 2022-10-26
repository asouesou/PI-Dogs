export function AddDogValidate(input, allDogs) {
	console.log("input", input);
	let errors = {};

	let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;

	if (!input.name) {
		errors.name = "Name is required";
	} else {
		if (!regexName.test(input.name.trim())) {
			errors.name = "Name: only letters and blanks spaces";
		} else {
			allDogs.forEach((e) => {
				if (e.name === input.name)
					alert("Name: Already existing. Please try again.");
			});
		}
	}

	if (!input.height) {
		errors.height = "Height is required";
	} else if (!/\d{1,2}-\d{1,2}/g.test(input.height)) {
		errors.height = "Add a height range. Example: '10-12'";
	} else {
		let rango = input.height.split("-");
		console.log(rango);
		if (rango[0] >= rango[1]) {
			errors.height = "range not valid";
		}
	}

	if (!input.weight) {
		errors.weight = "Weight is required";
	} else if (!/\d{1,2}-\d{1,2}/g.test(input.weight)) {
		errors.weight = "Add a weight range. Example: '10-12'";
	} else {
		let rango = input.weight.split("-");
		console.log(rango);
		if (rango[0] >= rango[1]) {
			errors.weight = "range not valid";
		}
	}

	if (!input.life_span) {
		errors.life_span = "Life Span is required";
	} else if (!/\d{1,2}-\d{1,2}/g.test(input.life_span)) {
		errors.life_span = "Add a life_span range. Example: '10-12'";
	} else {
		var rango = input.life_span.split("-");
		console.log(rango);
		if (rango[0] >= rango[1]) {
			errors.life_span = "range not valid";
		}
	}
	console.log(input.temperaments);

	if (!input.temperamentId.length && !input.temperaments.length) {
		errors.temperamentId = "Add at least one temperament";
	}

	if (!isValidHttpUrl(input.image)) {
		errors.image = "Url invalid";
	}

	console.log("errors", errors);
	return errors;
}

function isValidHttpUrl(string) {
	let url;

	try {
		url = new URL(string);
	} catch (_) {
		return false;
	}

	return url.protocol === "http:" || url.protocol === "https:";
}

export function AddDogObj(input) {
	var obj = {
		weight: {
			imperial: "",
			metric: "",
		},
		height: {
			imperial: "",
			metric: "",
		},
		name: "",
		life_span: "",
		image: "",
		temperamentId: [],
	};
	obj.weight = input.weight;
	obj.height = input.height;
	obj.name = input.name;
	obj.life_span = input.life_span + " years";
	obj.image = input.image;
	obj.temperamentId = input.id;

	return obj;
}

export function btn(response, handleOk, handleSubmit) {
	let button;
	if (response === "Ok. Created record") {
		button = (
			<input
				type="submit"
				value="Siguiente"
				id="form_button"
				onClick={handleOk}
			/>
		);
	} else {
		button = (
			<input
				type="submit"
				value="Created"
				id="form_button"
				onClick={handleSubmit}
			/>
		);
	}
	return button;
}
