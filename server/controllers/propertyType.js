const asyncHandler = require("express-async-handler");
const db = require("../models");
const { throwErrorWithStatus } = require("../middlewares/errorHandler");

const createPropertyType = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const response = await db.PropertyType.findOrCreate(
    { where: { name } },
    {
      defaults: req.body,
    }
  );

  return res.json({
    success: response[1],
    mes: response[1] ? "Created." : "Name property duplicated.",
    propertyType: response[0],
  });
});

module.exports = {
  createPropertyType,
};
