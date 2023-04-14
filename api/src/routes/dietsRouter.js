const { Router } = require("express");
const getDietsHandler = require("../handlers/getDiets");

const dietsRouter = Router();

dietsRouter.get("/", getDietsHandler);

module.exports = dietsRouter;
