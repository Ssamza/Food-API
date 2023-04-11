const { Router } = require("express");
const recipesRouter = require("./recipesRouter");
const dietsRouter = require("./dietsRouter");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use("/recipes", recipesRouter);

router.use("/diets", dietsRouter);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
