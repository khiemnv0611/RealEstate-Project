const asyncHandler = require("express-async-handler");
const db = require("../models");
const { throwErrorWithStatus } = require("../middlewares/errorHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");

//Đăng ký
const register = asyncHandler(async (req, res) => {
  // password, phone, name, role = [USER, AGENT]
  // client = URLencoded || formdata => req.body
  // client = params (?q = abc) => req.query
  // client api/user/:id => req.params

  // DTO = Data Transfer Object
  const { email, password, name, phone } = req.body;
  //Handle logic
  const response = await db.User.findOrCreate({
    where: { email },
    defaults: { email, password, name, phone },
  });

  const userId = response[0]?.id;
  if (userId) {
    const roleCode = ["ROL7"];
    if (req.body?.roleCode) roleCode.push(req.body?.roleCode);
    const roleCodeBulk = roleCode.map((role) => ({ userId, roleCode: role }));
    const updateRole = await db.User_Role.bulkCreate(roleCodeBulk);
    if (!updateRole) await db.User.destroy({ where: { id: userId } });
  }

  return res.json({
    success: response[1],
    mes: response[1]
      ? "Tài khoản của bạn đã được tạo."
      : "Số điện thoại đã tồn tại.",
  });
});

//Đăng nhập
const signIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  //Handle logic
  const user = await db.User.findOne({
    where: { email },
  });
  if (!user)
    return throwErrorWithStatus(
      401,
      "Số điện thoại chưa được đăng ký.",
      res,
      next
    );

  const isMatchingPassword = bcrypt.compareSync(password, user.password);
  if (!isMatchingPassword)
    return throwErrorWithStatus(401, "Sai mật khẩu.", res, next);

  const token = jwt.sign(
    { uid: user.id, roleCode: user.roleCode },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return res.json({
    success: true,
    mes: "Đăng nhập thành công.",
    accessToken: token,
  });
});

// Đăng nhập bằng Google
const signInWithGoogle = asyncHandler(async (req, res, next) => {
  const token = jwt.sign(
    { uid: req.user.id, roleCode: req.user.roleCode },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  console.log("This was call from signInWithGoogle")

  res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`)
});

module.exports = {
  register,
  signIn,
  signInWithGoogle,
};
