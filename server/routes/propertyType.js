const router = require("express").Router();
const Joi = require("joi");
const ctrls = require("../controllers/propertyType");
const validateDto = require("../middlewares/validation");
const { stringReq, string } = require("../middlewares/joiSchema");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const rateLimiter = require("../middlewares/rateLimiter");

router.use(rateLimiter);

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

// Get
router.get("/", ctrls.getPropertyTypes);

// Update
router.patch(
  "/:id",
  verifyToken,
  isAdmin,
  validateDto(Joi.object({ name: string, description: string, image: string })),
  ctrls.updatePropertyType
);

//Delete
router.delete("/:id", verifyToken, isAdmin, ctrls.deletePropertyType);

module.exports = router;
