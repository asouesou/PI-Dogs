const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router_dogs = require("./router_dogs");
const router_temperaments = require("./router_temperaments");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/", router_dogs);
router.use("/", router_temperaments);

module.exports = router;
