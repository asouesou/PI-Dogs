//require
const { Dog, Temperament } = require("../db.js");
const axios = require("axios");
const { Op } = require("sequelize");
require("dotenv").config();
const { API_KEY, API } = process.env;
const { v4: uuidv4 } = require("uuid");
var attributes = [
	"id",
	"name",
	"height",
	"weight",
	"life_span",
	"image",
	"temperament",
];
var modelAttributes = [
	["id", "idTemp"],
	["name", "nameTemp"],
];

//*************************************************************************************//
const getDogsByName = async (req, res, next) => {
	const { name } = req.query;
	try {
		let allDogs = await concatAllDogs(); //CONCAT
		if (!name) return res.status(200).json(allDogs);

		let dogByName = [];
		for (let i = 0; i < allDogs.length; i++) {
			if (allDogs[i].name.includes(name)) dogByName.push(allDogs[i]);
		}
		res.status(200).json(dogByName);
	} catch (err) {
		next(err);
	}
};
//*************************************************************************************//
const concatAllDogs = async (req, _res, next) => {
	try {
		let allDogs = await Promise.all([getDogsDb(), getDogsApi()]).then(
			([dogsDb, dogsApi]) => {
				return dogsDb.concat(dogsApi);
			}
		);
		return allDogs;
	} catch (err) {
		next(err);
	}
};

const getDogsDb = async (_req, _res, next) => {
	try {
		var dogsDb = await Dog.findAll({
			attributes: attributes,
			include: [
				{
					model: Temperament,
					attributes: modelAttributes,
					through: { attributes: [] },
				},
			],
		});
		return dogsDb;
	} catch (err) {
		next(err);
	}
};

const getDogsApi = async (_req, _res, next) => {
	try {
		var dogsApi = await axios.get(`${API}?api_key=${API_KEY}`);
		var filterDogs = await dogsApi.data.map((e) => {
			return {
				id: e.id,
				name: e.name,
				height: e.height.metric,
				weight: e.weight.metric,
				life_span: e.life_span,
				image: e.image.url,
				temperament: e.hasOwnProperty("temperament")
					? e.temperament.split(", ")
					: ["No"],
			};
		});
		return filterDogs;
	} catch (err) {
		next(err);
	}
};

const getDogsById = async (req, res, next) => {
	try {
		const { id } = req.params;

		let allDogs = await concatAllDogs();
		let dogById = [];
		if (id) {
			for (let i = 0; i < allDogs.length; i++) {
				if (allDogs[i].id === parseInt(id)) {
					dogById = allDogs[i];
					break;
				}
			}
			return res.status(200).json(dogById);
		}

		res.status(200).json(sql);
	} catch (err) {
		return next(err);
	}
};

const addDogs = async (req, res, next) => {
	try {
		const { temperamentId, name, height, weight, life_span, image } =
			req.body;

		let allDogs = await concatAllDogs();
		let result1 = await allDogs.filter((el) =>
			el.name.toLowerCase().includes(name.toLowerCase())
		);
		if (result1.length)
			return res.status(404).json("This Dog already exist:");

		var temp = await Temperament.findAll({
			where: { id: { [Op.or]: temperamentId } },
			attributes: ["name"],
		});

		var temperament = [];
		temp.map((e) => {
			temperament.push(e.name);
		});

		let id = uuidv4();
		//const image = JSON.parse(	"{" + '"url"' + ":" + '"' + imgD + '"' + "}");
		const newDog = await Dog.create({
			id,
			name,
			height,
			weight,
			life_span,
			image,
			temperament,
		});
		await newDog.addTemperaments(temperamentId);
		res.status(200).json(await concatAllDogs());
	} catch (error) {
		next(error);
	}
};

module.exports = { getDogsByName, getDogsById, concatAllDogs, addDogs };
