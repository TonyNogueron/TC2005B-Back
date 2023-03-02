const express = require("express");
const router = express.Router();
const levelController = require("../controller/levelController");
const middleware = require("../middleware/jwt-middleware");

router.get("/level", middleware, levelController.getLevels);
router.post("/level", middleware, levelController.addLevel);
router.get("/level/user", middleware, levelController.getUserLevels);
router.post("/level/user", middleware, levelController.addUserLevel);

module.exports = router;
