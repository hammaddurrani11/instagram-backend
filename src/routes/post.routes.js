const express = require('express');
const router = express.Router();

const postController = require('../controllers/post.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage()
})

// Create Post
router.post('/create-post', authMiddleware.userAuthMiddleware, upload.single('picture'), postController.createPost);

// Get All Posts
router.get('/', authMiddleware.userAuthMiddleware, postController.getAllPosts);

// Edit Post
router.patch('/:id', authMiddleware.userAuthMiddleware, postController.editPost);

// Delete Post
router.delete('/:id', authMiddleware.userAuthMiddleware, postController.deletePost);

// Get User Posts
router.get('/user/:id', authMiddleware.userAuthMiddleware, postController.getUserPosts);

module.exports = router;