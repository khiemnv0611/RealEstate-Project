const asyncHandler = require("express-async-handler");
const db = require("../models");
const { throwErrorWithStatus } = require("../middlewares/errorHandler");
const { roles } = require("../utils/constants");

//Lấy user
const initRoles = asyncHandler(async (req, res) => {
  //DTO

  //Handle logic
  const response = await db.Role.bulkCreate(roles);

  return res.json({
    success: Boolean(response),
    mes: response ? "Inserted" : "Something went wrong.",
  });
});

module.exports = {
  initRoles,
};
