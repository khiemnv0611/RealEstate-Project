const router = require("express").Router();
const ctrls = require("../controllers/user");
const Joi = require("joi");
const validateDto = require("../middlewares/validation");
const { stringReq, array, string, numberReq } = require("../middlewares/joiSchema");
const { verifyToken } = require("../middlewares/verifyToken");

// GET
router.get("/current", verifyToken, ctrls.getCurrent);
router.get("/roles", ctrls.getRoles);
router.get("/wish/:id", verifyToken, ctrls.checkIsPropertyInWishList)
router.get("/wishlist/", verifyToken, ctrls.getWishListByUser)

// POST
router.post("/wish/:id", verifyToken, ctrls.addPropertyToWish)
router.post("/comment/:id", verifyToken, validateDto(Joi.object({message: stringReq, receiverId: numberReq})), ctrls.commentToProperty)
router.post("/comment/reply/:id", verifyToken, validateDto(Joi.object({message: stringReq, receiverId: numberReq, propertyId: numberReq})), ctrls.replyComment)

// PUT
router.put(
  "/profile",
  verifyToken,
  validateDto(
    Joi.object({
      name: stringReq,
      address: stringReq,
      email: stringReq,
      avatar: array,
      phone: stringReq,
    })
  ),
  ctrls.updateProfile
);

module.exports = router;
