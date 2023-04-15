const findAllDiets = require("../controllers/findAllDiets");

const getDietsHandler = async (req, res) => {
  try {
    // const diets = await Diet.findAll();
    // const infoSource = diets.length > 0 ? diets : await findAllDiets();
    const infoSource = await findAllDiets();

    res.status(200).json(infoSource);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getDietsHandler;
