var { Router } = require("express");
var router = Router();

const {
	getDogsByName,
	getDogsById,
	addDogs,
} = require("../controller/controller_dogs");

router.get("/dogs", getDogsByName); //Ambas Rutas ->>  router.get('/dogs', getDogsByName); //      req.query **/dogs?name=American
router.get("/dogs/:id", getDogsById); //req.params     **/dogs/1
router.post("/dogs", addDogs); //form

module.exports = router;

/* GET /dogs:
     1. Obtener un listado de las razas de perro
     2. Debe devolver solo los datos necesarios para la ruta principal
[ ] GET /dogs?name="...":
     1. Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
     2. Si no existe ninguna raza de perro mostrar un mensaje adecuado
[ ] GET /dogs/{idRaza}:
     1. Obtener el detalle de una raza de perro en particular
     2. Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
     2. Incluir los temperamentos asociados

[ ] POST /dogs:
     1. Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
     2. Crea una raza de perro en la base de datos relacionada con sus temperamentos
[ ] GET /temperaments:
     1. Obtener todos los temperamentos posibles
     2. En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí */
