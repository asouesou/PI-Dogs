//require
const { Dog, Temperament } = require("../db.js");
const { concatAllDogs } = require("./controller_dogs");
const { Op } = require("sequelize");

//*************************************************************************************//
const loadTemperaments = async (next) => {
	try {
		let allDogs = await concatAllDogs();
		allDogs.map((e) => {
			e.temperament.map((t) => {
				Temperament.findOrCreate({
					where: { name: t },
				});
			});
		});
	} catch (err) {
		console.log(err);
		next(err);
	}
};

//*************************************************************************************//
const getTemperaments = async (req, res, next) => {
	try {
		let temperaments = await Temperament.findAll({});
		res.status(200).json(temperaments);
	} catch (err) {
		next(err);
	}
};
//*************************************************************************************//

module.exports = { loadTemperaments, getTemperaments };
