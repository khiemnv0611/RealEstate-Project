const router = require("express").Router();
const Joi = require("joi");
const ctrls = require("../controllers/propertyType");
const validateDto = require("../middlewares/validation");
const { stringReq, string } = require("../middlewares/joiSchema");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");

// Create
router.post(
  "/",
  verifyToken,
  isAdmin,
  validateDto(
    Joi.object({ name: stringReq, description: stringReq, image: stringReq })
  ),
  ctrls.createPropertyType
);

//Get
router.get("/", ctrls.getPropertyTypes);

module.exports = router;
