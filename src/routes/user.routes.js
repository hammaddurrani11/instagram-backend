const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.get('/:id', authMiddleware.userAuthMiddleware, userController.getUserById)

module.exports = router;