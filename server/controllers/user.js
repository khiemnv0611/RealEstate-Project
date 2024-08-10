const asyncHandler = require("express-async-handler");
const db = require("../models");
const { throwErrorWithStatus } = require("../middlewares/errorHandler");

// //Lấy user
// const getCurrent = asyncHandler(async (req, res) => {
//   //DTO
//   const { uid } = req.user;
//   //Handle logic
//   const response = await db.User.findByPk(uid, {
//     attributes: {
//       exclude: ["password"],
//     },
//   });

//   return res.json({
//     success: Boolean(response),
//     mes: response ? "Got." : "Cannot get user.",
//     currentUser: response,
//   });
// });

// const getRoles = asyncHandler(async (req, res) => {
//   const response = await db.Role.findAll();
//   return res.json({
//     success: Boolean(response),
//     mes: response ? "Got." : "Cannot get roles.",
//     roles: response,
//   });
// });

module.exports = {
  getCurrent: asyncHandler(async (req, res) => {
    const { uid } = req.user;
    const response = await db.User.findByPk(uid, {
      attributes: {
        exclude: ["password"],
      },
      // Lấy trong 2 model
      include: [
        {
          model: db.User_Role,
          attributes: ["roleCode"],
          as: "userRoles",
          include: [
            {
              model: db.Role,
              as: "roleName",
              attributes: ["value"],
            },
          ],
        },
      ],
    });
    return res.json({
      success: Boolean(response),
      mes: response ? "Got." : "Cannot get user.",
      currentUser: response,
    });
  }),
  getRoles: asyncHandler(async (req, res) => {
    const response = await db.Role.findAll({
      attributes: ["code", "value"],
    });
    return res.json({
      success: Boolean(response),
      mes: response ? "Got." : "Cannot get roles.",
      roles: response,
    });
  }),
};
