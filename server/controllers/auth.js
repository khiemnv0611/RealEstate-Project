const asyncHandler = require("express-async-handler");
const db = require("../models");
const { throwErrorWithStatus } = require("../middlewares/errorHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Đăng ký
const register = asyncHandler(async (req, res) => {
  // password, phone, name, role = [USER, AGENT]
  // client = URLencoded || formdata => req.body
  // client = params (?q = abc) => req.query
  // client api/user/:id => req.params

  // DTO = Data Transfer Object
  const { phone } = req.body;
  //Handle logic
  const response = await db.User.findOrCreate({
    where: { phone },
    defaults: req.body,
  });

  return res.json({
    success: response[1],
    mes: response[1]
      ? "Your account is created."
      : "PhoneNumber already had exists",
  });
});

//Đăng nhập
const signIn = asyncHandler(async (req, res, next) => {
  const { phone, password } = req.body;
  //Handle logic
  const user = await db.User.findOne({
    where: { phone },
  });
  if (!user)
    return throwErrorWithStatus(
      401,
      "User with that phone havent registed.",
      res,
      next
    );

  const isMatchingPassword = bcrypt.compareSync(password, user.password);
  if (!isMatchingPassword)
    return throwErrorWithStatus(401, "Password is wrong.", res, next);

  const token = jwt.sign(
    { uid: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return res.json({
    success: true,
    mes: "Sign in is successfully.",
    accessToken: token,
  });
});

module.exports = {
  register,
  signIn,
};
