const router = require("express").Router();
const Joi = require("joi");
const ctrls = require("../controllers/property");
const validateDto = require("../middlewares/validation");
const { stringReq, array, string, numberReq } = require("../middlewares/joiSchema");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
//const rateLimiter = require("../middlewares/rateLimiter");

//router.use(rateLimiter);

// GET
router.get("/one/:propertyId", ctrls.getOneById);
router.get("/", ctrls.getProperties);
router.get("/nopagination", verifyToken, isAdmin, ctrls.getPropertiesWithoutPagination);
router.get("/ownerproperties", verifyToken, ctrls.getPropertiesByUserId)
router.get("/comments/:propertyId", ctrls.getPropertyComments)
router.get("/count", verifyToken, isAdmin, ctrls.getPropetiesCount)

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

// DELETE
router.delete("/:id", verifyToken, ctrls.deletePropertyById)

// PUT
router.put(
    "/status/:id",
    verifyToken,
    isAdmin,
    ctrls.updatePropertyStatus
)
router.put(
    "/status/",
    verifyToken,
    isAdmin,
    validateDto(
        Joi.object({
            status: stringReq,
            propertyIds: Joi.array().items(Joi.number())
        })
    ),
    ctrls.updatePropertiesStatus
)

module.exports = router;
