const router = require("express").Router();
const ctrls = require("../controllers/insert");

router.post("/roles", ctrls.initRoles);

module.exports = router;
