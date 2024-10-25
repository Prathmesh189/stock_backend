const express = require('express');
const userController = require('../controllers/user_controller');
const validations = require('../validations/user_validations')
const authenticateJWT = require('../middleware/authmiddleware');
const router = express.Router();
const upload = require('../config/multer_config');

router.put('/uploadProfileImage',authenticateJWT, upload.single('profile_pic'),validations.trail,userController.uploadProfileImage);

router.post('/register', userController.createUser);

router.post('/login', validations.loginUserValidation, userController.loginUser);

router.get('/details', authenticateJWT, userController.getUserInfo); 

router.put('/update',validations.trail,  authenticateJWT, userController.updateUser); 

router.patch('/resetPassword',validations.updatePassword,   userController.updatePassword); 




module.exports = router;