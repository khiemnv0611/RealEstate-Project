const asyncHandler = require("express-async-handler");
const db = require("../models");
const { throwErrorWithStatus } = require("../middlewares/errorHandler");

// Tạo dự án mới
const createNewProperty = asyncHandler(async (req, res) => {
  //Handle logic
  const response = await db.User.createNewProperty;

  return res.json({
    success: Boolean(response),
    mes: response ? "Got." : "Cannot get user.",
    currentUser: response,
  });
});

module.exports = {
  createNewProperty,
};
