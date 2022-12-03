const express = require('express');
const userCtrl = require('../controllers/user');
const authCtrl = require('../controllers/auth');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


const router = express.Router();


router.post('/signup', multer, authCtrl.signup);
router.post('/login', authCtrl.login);
router.get('/logout', authCtrl.logout)

router.get('/', auth, userCtrl.getAllUsers);
router.get('/:id', auth, userCtrl.getOneUser);
router.put('/:id', auth, multer, userCtrl.updateUser);


module.exports = router;