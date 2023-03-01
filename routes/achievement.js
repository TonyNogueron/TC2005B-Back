const express = require('express');
const router = express.Router();
const achievementController = require('../controller/achievementController');
const middleware = require('../middleware/jwt-middleware');

router.get('/achievement', middleware, achievementController.getAchievements);
router.post('/achievement', middleware, achievementController.addAchievement);
router.get('/achievement/user', middleware, achievementController.getUserAchievements);
router.post('/achievement/user', middleware, achievementController.addUserAchievement);

module.exports = router;