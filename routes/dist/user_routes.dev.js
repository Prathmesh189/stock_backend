"use strict";

var express = require('express');

var userController = require('../controllers/user_controller');

var validations = require('../validations/user_validations');

var authenticateJWT = require('../middleware/authmiddleware');

var router = express.Router();

var upload = require('../config/multer_config');

router.put('/uploadProfileImage', authenticateJWT, upload.single('profile_pic'), validations.trail, userController.uploadProfileImage);
router.post('/register', userController.createUser);
router.post('/login', validations.loginUserValidation, userController.loginUser);
router.get('/details', authenticateJWT, userController.getUserInfo);
router.put('/update', validations.trail, authenticateJWT, userController.updateUser);
router.patch('/resetPassword', validations.updatePassword, userController.updatePassword);
module.exports = router;