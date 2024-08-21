const router = require("express").Router();
const Joi = require("joi");
const ctrls = require("../controllers/property");
const validateDto = require("../middlewares/validation");
const { stringReq, string } = require("../middlewares/joiSchema");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
//const rateLimiter = require("../middlewares/rateLimiter");

//router.use(rateLimiter);

// Get
router.get("/", ctrls.getProperties);
module.exports = router;
