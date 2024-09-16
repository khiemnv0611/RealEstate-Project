const router = require("express").Router();
const ctrls = require("../controllers/user");
const Joi = require("joi");
const validateDto = require("../middlewares/validation");
const { stringReq, array, string, numberReq, booleanReq } = require("../middlewares/joiSchema");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");

// GET
router.get("/current", verifyToken, ctrls.getCurrent);
router.get("/roles", ctrls.getRoles);
router.get("/wish/:id", verifyToken, ctrls.checkIsPropertyInWishList)
router.get("/wishlist/", verifyToken, ctrls.getWishListByUser)
router.get("/notifications", verifyToken, ctrls.getUserNotifications)
router.get("/all", verifyToken, isAdmin, ctrls.getUsers)

// POST
router.post("/wish/:id", validateDto(Joi.object({owner: numberReq})), verifyToken, ctrls.addPropertyToWish)
router.post("/comment/:id", verifyToken, validateDto(Joi.object({message: stringReq, receiverId: numberReq})), ctrls.commentToProperty)
router.post("/comment/reply/:id", verifyToken, validateDto(Joi.object({message: stringReq, receiverId: numberReq, propertyId: numberReq})), ctrls.replyComment)

// PUT
router.put(
  "/notification/:id",
  verifyToken,
  validateDto(
    Joi.object({
      isRead: booleanReq
    })
  ),
  ctrls.updateNotificationStatus
)
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
router.put(
  "/status/:id",
  verifyToken,
  isAdmin,
  ctrls.updateUserStatus
)

module.exports = router;
