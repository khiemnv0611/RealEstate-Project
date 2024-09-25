const asyncHandler = require("express-async-handler");
const db = require("../models");
const { throwErrorWithStatus } = require("../middlewares/errorHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { where, Op } = require("sequelize");

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
      : "Email/ Số điện thoại đã tồn tại.",
  });
});

//Check email and phone
const checkEmailnPhone = asyncHandler(async (req, res) => {
  const { email, phone } = req.body;

  // Tìm kiếm người dùng với email hoặc số điện thoại này trong cơ sở dữ liệu
  const existingUser = await db.User.findOne({
    where: {
      [Op.or]: [{ email }, { phone }],
    },
  });

  if (existingUser) {
    // Nếu tìm thấy người dùng với email hoặc số điện thoại trùng lặp
    let mes = "";
    if (existingUser.email === email) mes = "Email đã tồn tại.";
    if (existingUser.phone === phone)
      mes += mes ? " Số điện thoại đã tồn tại." : "Số điện thoại đã tồn tại.";
    return res.json({ success: false, mes });
  }

  // Nếu không tồn tại, trả về phản hồi thành công
  return res.json({
    success: true,
    mes: "Email và số điện thoại có thể sử dụng.",
  });
});

//Đăng nhập
const signIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  //Handle logic
  const user = await db.User.findOne({
    where: { email },
    include: {
      model: db.User_Role,
      as: "userRoles",
      attributes: ["id", "roleCode"],
    },
  });
  if (!user)
    return throwErrorWithStatus(401, "Email chưa được đăng ký.", res, next);

  const isMatchingPassword = bcrypt.compareSync(password, user.password);
  if (!isMatchingPassword)
    return throwErrorWithStatus(401, "Sai mật khẩu.", res, next);

  const token = jwt.sign(
    { uid: user.id, roleCodes: user.userRoles },
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
    { uid: req.user.id, roleCode: req.user.userRoles },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  console.log("This was call from signInWithGoogle");

  res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`);
});

module.exports = {
  register,
  checkEmailnPhone,
  signIn,
  signInWithGoogle,
};
