const { body, validationResult } = require('express-validator');


const createUserValidation = [
  body('name').notEmpty().withMessage('Name is required.'),
  body('phone').isMobilePhone().withMessage('Phone number is invalid.'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
];

const loginUserValidation = [
  body('phone').isMobilePhone().withMessage('Phone number is invalid.'),
  body('password').notEmpty().withMessage('Password is required.'),
];


const updatePassword = [
  body('phone').notEmpty().withMessage('Please enter Phone'),
  body('password').notEmpty().withMessage('please enter Password'),
];

const trail = [
    body('bod').notEmpty().withMessage('some'),
  ];

module.exports = {
    createUserValidation,
    loginUserValidation,
    trail,
    updatePassword
  };