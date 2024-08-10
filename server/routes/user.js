const router = require("express").Router();
const ctrls = require("../controllers/user");
const { verifyToken } = require("../middlewares/verifyToken");

router.get("/current", verifyToken, ctrls.getCurrent);
router.get("/roles", ctrls.getRoles);

module.exports = router;
