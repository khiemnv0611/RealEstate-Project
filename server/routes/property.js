const router = require("express").Router();
const Joi = require("joi");
const ctrls = require("../controllers/property");
const validateDto = require("../middlewares/validation");
const { stringReq, array, string, numberReq } = require("../middlewares/joiSchema");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
//const rateLimiter = require("../middlewares/rateLimiter");

//router.use(rateLimiter);

// Get
router.get("/one/:propertyId", ctrls.getOneById);
router.get("/", ctrls.getProperties);

// POST
router.post(
    "/", 
    verifyToken,
    validateDto(
        Joi.object({
            name: stringReq,
            description: stringReq,
            address: stringReq,
            city: stringReq,
            listingType: stringReq,
            price: numberReq,
            propertyTypeId: numberReq,
            images: Joi.array().items(Joi.string().uri()),
            featuredImage: stringReq,
            bedRoom: Joi.number(),
            bathRoom: Joi.number(),
            propertySize: Joi.number(),
            yearBuilt: Joi.number(),
        })
    ), 
    ctrls.createNewProperty
);

module.exports = router;
