const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const userController = require('../controllers/user.controller');
const router = express.Router();

// Get User by ID
router.get('/:id', authMiddleware.userAuthMiddleware, userController.getUserById);

// Edit User
router.patch('/:id', authMiddleware.userAuthMiddleware, userController.editUser);

module.exports = router;