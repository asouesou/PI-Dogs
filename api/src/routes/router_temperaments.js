var { Router } = require("express");
var router = Router();

const {
	addTemperaments,
	getTemperaments,
} = require("../controller/controller_temperaments");

router.get("/temperaments/", getTemperaments);

module.exports = router;

/* [ ] GET /temperaments:
    1. Obtener todos los temperamentos posibles
    2. En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí 
*/
