const express = require('express');

const checkAuth = require('../middleware/check-auth');

const extractFiles = require('../middleware/file');

const PostController = require('../controllers/post')

const router = express.Router();


router.post("",
    checkAuth,
    extractFiles,
    PostController.addPost);

router.put("/:id",
    checkAuth,
    extractFiles,
    PostController.updatePost);

router.get('', PostController.getPosts);

router.get('/:id', PostController.getPost);

router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;