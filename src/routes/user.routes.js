const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const userController = require('../controllers/user.controller');
const router = express.Router();

const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage()
})

// Get User by ID
router.get('/:id', authMiddleware.userAuthMiddleware, userController.getUserById);

// Edit User
router.patch('/:id', authMiddleware.userAuthMiddleware, upload.single('profilePic'), userController.editUser);

// Get Current User
router.get('/', authMiddleware.userAuthMiddleware, userController.getCurrentUser);

module.exports = router;