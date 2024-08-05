const asyncHandler = require("express-async-handler");
const db = require("../models");
const { throwErrorWithStatus } = require("../middlewares/errorHandler");

//Lấy user
const getCurrent = asyncHandler(async (req, res) => {
  //DTO
  const { uid } = req.user;
  //Handle logic
  const response = await db.User.findByPk(uid, {
    attributes: {
      exclude: ["password"],
    },
  });

  return res.json({
    success: Boolean(response),
    mes: response ? "Got." : "Cannot get user.",
    currentUser: response,
  });
});

module.exports = {
  getCurrent,
};