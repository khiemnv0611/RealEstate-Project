const router = require("express").Router();
const ctrls = require("../controllers/user");
const { verifyToken } = require("../middlewares/verifyToken");

// Phải chạy qua verifyToken mới thực hiện
router.get("/current", verifyToken, ctrls.getCurrent);

module.exports = router;
