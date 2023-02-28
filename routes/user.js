const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const middleware = require('../middleware/jwt-middleware');

router.get('/user', middleware, userController.getUsers);
router.post('/user', userController.registerUser);

module.exports = router;