"use strict";

var _require = require('express-validator'),
    body = _require.body,
    validationResult = _require.validationResult;

var createUserValidation = [body('name').notEmpty().withMessage('Name is required.'), body('phone').isMobilePhone().withMessage('Phone number is invalid.'), body('password').isLength({
  min: 6
}).withMessage('Password must be at least 6 characters long.')];
var loginUserValidation = [body('phone').isMobilePhone().withMessage('Phone number is invalid.'), body('password').notEmpty().withMessage('Password is required.')];
var updatePassword = [body('phone').notEmpty().withMessage('Please enter Phone'), body('password').notEmpty().withMessage('please enter Password')];
var trail = [body('bod').notEmpty().withMessage('some')];
module.exports = {
  createUserValidation: createUserValidation,
  loginUserValidation: loginUserValidation,
  trail: trail,
  updatePassword: updatePassword
};