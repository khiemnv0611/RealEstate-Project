const router = require("express").Router();
const Joi = require("joi");
const ctrls = require("../controllers/auth");
const validateDto = require("../middlewares/validation");
const passport = require('passport');
const {
  stringReq,
  numberReq,
  string,
  array,
} = require("../middlewares/joiSchema");

require("../config/passport.config")

// Phải thỏa các điều kiện của validateDto thì mới thực hiện
router.post(
  "/register",
  validateDto(
    Joi.object({
      password: stringReq,
      name: stringReq,
      email: stringReq,
      phone: numberReq,
      roleCode: string,
    })
  ),
  ctrls.register
);

router.post(
  "/signin",
  validateDto(
    Joi.object({
      password: stringReq,
      email: stringReq,
    })
  ),
  ctrls.signIn
);

// Redirect to google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback sau khi xác thực tk gg
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/auth/failure`,
  }),
  ctrls.signInWithGoogle
);

module.exports = router;
