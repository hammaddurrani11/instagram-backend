const express = require('express');
const router = express.Router();

const postController = require('../controllers/post.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage()
})

router.post('/create-post', authMiddleware.userAuthMiddleware, upload.single('picture'), postController.createPost);


module.exports = router;