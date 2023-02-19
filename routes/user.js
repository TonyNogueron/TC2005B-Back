const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const middleware = require('../middleware/jwt-middleware');

router.get('/user', middleware, userController.getUsers);

module.exports = router;