const router = require("express").Router();
const Joi = require("joi");
const ctrls = require("../controllers/auth");
const validateDto = require("../middlewares/validation");
const { stringReq, numberReq, string } = require("../middlewares/joiSchema");

// Phải thỏa các điều kiện của validateDto thì mới thực hiện
router.post(
  "/register",
  validateDto(
    Joi.object({
      password: stringReq,
      name: stringReq,
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
      phone: numberReq,
    })
  ),
  ctrls.signIn
);

module.exports = router;
