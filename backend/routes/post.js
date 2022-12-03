const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');

const router = express.Router();

router.get('/', auth, postCtrl.getAllPosts);
router.post('/', auth, multer, postCtrl.createPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.patch('/:id/like', auth, postCtrl.likes)

router.post('/:post/comment', postCtrl.addComment)
router.put('/:post/comment/:id', postCtrl.updateComment)
router.delete('/:post/comment/:id', postCtrl.deleteComment)

module.exports = router; 