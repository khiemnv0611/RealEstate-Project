const router = require("express").Router();
const Joi = require("joi");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const {
  createPlan,
  getAllPlans,
  registerPlan,
} = require("../controllers/membership");

// GET
router.get("/", verifyToken, getAllPlans);

// POST
router.post("/", verifyToken, isAdmin, createPlan);
router.post("/register/:id", verifyToken, registerPlan);

module.exports = router;
