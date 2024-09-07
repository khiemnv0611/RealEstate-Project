const asyncHandler = require("express-async-handler");
const db = require("../models");
const { throwErrorWithStatus } = require("../middlewares/errorHandler");
const { raw } = require("express");

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

// USER CONTROLLER
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
  updateProfile: asyncHandler(async (req, res) => {
    const { name, email, address, avatar, phone } = req.body;
    const updateData = new Object();
    const { uid } = req.user;

    console.log(req.body)

    if (email) {
      const userRoles = await db.User_Role.findAll({
        where: { userId: uid },
        raw: true,
      });
      if (userRoles.length === 1 && userRoles[0].roleCode === "ROL7") {
        updateData.email = email;
      }
    }

    if (avatar && avatar.length > 0) updateData.avatar = avatar[0];
    if (name) updateData.name = name;
    if (address) updateData.address = address;
    if (phone) updateData.phone = phone;

    console.log(updateData)

    // CHECK
    // try {
    //   const response = await db.User.update(updateData, { where: { id: uid } });

    // } catch(e) {
    //   console.log(e)
    // }

    const response = await db.User.update(updateData, { where: { id: uid } });

    return res.json({
      success: response[0] > 0,
      mes:
        response[0] > 0 ? "Cập nhật thành công." : "Cập nhật không thành công.",
    });
  }),
};
