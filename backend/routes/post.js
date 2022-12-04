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
router.post('/:id', auth, postCtrl.likes)
router.patch('/:id', auth, postCtrl.disLikes)

router.post('/:id/comment', auth, postCtrl.addComment)
router.put('/:id/comment/:id', postCtrl.updateComment)
router.delete('/:id/comment/:id', postCtrl.deleteComment)

module.exports = router; 