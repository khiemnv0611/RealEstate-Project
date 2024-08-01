const asyncHandler = require("express-async-handler");

const register = asyncHandler(async (req, res) => {
  // password, phone, name, role = [USER, AGENT]
  // client = URLencoded || formdata => req.body
  // client = params (?q = abc) => req.query
  // client api/user/:id => req.params

  const { password, phone, name, role } = req.body;
  //Handle logic
  return res.json({
    success: true,
    mes: "API OKE",
    data: { password, phone, name, role },
  });
});

module.exports = {
  register,
};
