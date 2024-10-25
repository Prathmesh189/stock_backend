"use strict";

var _require = require('../models'),
    users = _require.users;

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var _require2 = require('express-validator'),
    body = _require2.body,
    validationResult = _require2.validationResult;

var _require3 = require('../config/auth'),
    jwtSecret = _require3.jwtSecret;

var uploadProfileImage = function uploadProfileImage(req, res) {
  var userId, user, profileImagePath;
  return regeneratorRuntime.async(function uploadProfileImage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          userId = req.user.id; // Check if file is uploaded

          if (req.file) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            status: 0,
            message: 'Profile image is required.'
          }));

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(users.findByPk(userId));

        case 6:
          user = _context.sent;

          if (user) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            status: 0,
            message: 'User not found.'
          }));

        case 9:
          // Update user's profile image path in the database
          profileImagePath = req.file.path; // Get the file path

          _context.next = 12;
          return regeneratorRuntime.awrap(user.update({
            profile_pic: profileImagePath
          }));

        case 12:
          res.status(200).json({
            status: 1,
            message: 'Profile image uploaded successfully.',
            user_info: {
              id: user.id,
              name: user.name,
              phone: user.phone,
              profile_pic: profileImagePath // Return updated profile picture URL

            }
          });
          _context.next = 19;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          console.error('Error uploading profile image:', _context.t0);
          res.status(500).json({
            status: 0,
            message: 'Something went wrong',
            error: _context.t0.message
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

var loginUser = function loginUser(req, res) {
  var errors, _req$body, phone, password, user, isPasswordValid, token;

  return regeneratorRuntime.async(function loginUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            status: 0,
            message: 'Validation failed.',
            errors: errors.array()
          }));

        case 3:
          _context2.prev = 3;
          _req$body = req.body, phone = _req$body.phone, password = _req$body.password;

          if (!(!phone || !password)) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            status: 0,
            message: 'Phone number and password are required.'
          }));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(users.findOne({
            where: {
              phone: phone
            }
          }));

        case 9:
          user = _context2.sent;

          if (user) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            status: 0,
            message: 'User not found with this phone number.'
          }));

        case 12:
          _context2.next = 14;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 14:
          isPasswordValid = _context2.sent;

          if (isPasswordValid) {
            _context2.next = 17;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            status: 0,
            message: 'Incorrect password. Please try again.'
          }));

        case 17:
          token = jwt.sign({
            id: user.id,
            phone: user.phone
          }, jwtSecret, {
            expiresIn: '15h'
          });
          res.status(200).json({
            status: 1,
            message: 'Login successful',
            token: token,
            user_info: {
              id: user.id,
              name: user.name,
              phone: user.phone
            }
          });
          _context2.next = 25;
          break;

        case 21:
          _context2.prev = 21;
          _context2.t0 = _context2["catch"](3);
          console.error('Error during login:', _context2.t0);
          res.status(500).json({
            status: 0,
            message: 'Something went wrong',
            error: _context2.t0.message
          });

        case 25:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 21]]);
};

var createUser = function createUser(req, res) {
  var errors, _req$body2, name, phone, password, existingUser, hashedPassword, newUserEntry;

  return regeneratorRuntime.async(function createUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            status: 0,
            message: 'Validation failed.',
            errors: errors.array()
          }));

        case 3:
          _context3.prev = 3;
          _req$body2 = req.body, name = _req$body2.name, phone = _req$body2.phone, password = _req$body2.password;
          console.log(password);

          if (!(!name || !phone || !password)) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            status: 0,
            message: 'All fields are required.'
          }));

        case 8:
          _context3.next = 10;
          return regeneratorRuntime.awrap(users.findOne({
            where: {
              phone: phone
            }
          }));

        case 10:
          existingUser = _context3.sent;

          if (!existingUser) {
            _context3.next = 13;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            status: 0,
            message: 'Phone number is already registered. Please use a different number.'
          }));

        case 13:
          _context3.next = 15;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 15:
          hashedPassword = _context3.sent;
          _context3.next = 18;
          return regeneratorRuntime.awrap(users.create({
            name: name,
            phone: phone,
            password: hashedPassword
          }));

        case 18:
          newUserEntry = _context3.sent;
          res.status(201).json({
            status: 1,
            message: 'User created successfully',
            user_info: {
              id: newUserEntry.id,
              name: newUserEntry.name,
              phone: newUserEntry.phone
            }
          });
          _context3.next = 26;
          break;

        case 22:
          _context3.prev = 22;
          _context3.t0 = _context3["catch"](3);
          console.error('Error creating new User:', _context3.t0);
          res.status(500).json({
            status: 0,
            message: 'Something went wrong',
            error: _context3.t0.message
          });

        case 26:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[3, 22]]);
};

var getUserInfo = function getUserInfo(req, res) {
  var userId, user;
  return regeneratorRuntime.async(function getUserInfo$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          userId = req.user.id;
          _context4.next = 4;
          return regeneratorRuntime.awrap(users.findByPk(userId));

        case 4:
          user = _context4.sent;

          if (user) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            status: 0,
            message: 'User not found.'
          }));

        case 7:
          res.status(200).json({
            status: 1,
            message: 'User information retrieved successfully.',
            user: user
          });
          _context4.next = 14;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          console.error('Error fetching user info:', _context4.t0);
          res.status(500).json({
            status: 0,
            message: 'Something went wrong',
            error: _context4.t0.message
          });

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

var updateUser = function updateUser(req, res) {
  var errors, userId, _req$body3, name, phone, password, bod, profile_pic, subscriptionId, user, updatedFields;

  return regeneratorRuntime.async(function updateUser$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context5.next = 3;
            break;
          }

          return _context5.abrupt("return", res.status(400).json({
            status: 0,
            message: 'Validation failed.',
            errors: errors.array()
          }));

        case 3:
          _context5.prev = 3;
          userId = req.user.id;
          _req$body3 = req.body, name = _req$body3.name, phone = _req$body3.phone, password = _req$body3.password, bod = _req$body3.bod, profile_pic = _req$body3.profile_pic, subscriptionId = _req$body3.subscriptionId;
          _context5.next = 8;
          return regeneratorRuntime.awrap(users.findByPk(userId));

        case 8:
          user = _context5.sent;

          if (user) {
            _context5.next = 11;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            status: 0,
            message: 'User not found.'
          }));

        case 11:
          updatedFields = {};
          if (name) updatedFields.name = name;
          if (phone) updatedFields.phone = phone;
          if (bod) updatedFields.bod = bod;
          if (profile_pic) updatedFields.profile_pic = profile_pic;
          if (subscriptionId) updatedFields.subscriptionId = subscriptionId;

          if (!password) {
            _context5.next = 21;
            break;
          }

          _context5.next = 20;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 20:
          updatedFields.password = _context5.sent;

        case 21:
          _context5.next = 23;
          return regeneratorRuntime.awrap(user.update(updatedFields));

        case 23:
          res.status(200).json({
            status: 1,
            message: 'User information updated successfully.',
            user_info: {
              id: user.id,
              name: user.name,
              phone: user.phone,
              bod: user.bod,
              profile_pic: user.profile_pic,
              subscriptionId: user.subscriptionId
            }
          });
          _context5.next = 30;
          break;

        case 26:
          _context5.prev = 26;
          _context5.t0 = _context5["catch"](3);
          console.error('Error updating user info:', _context5.t0);
          res.status(500).json({
            status: 0,
            message: 'Something went wrong',
            error: _context5.t0.message
          });

        case 30:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[3, 26]]);
};

var updatePassword = function updatePassword(req, res) {
  var errors, _req$body4, phone, password, user, hashedPassword;

  return regeneratorRuntime.async(function updatePassword$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context6.next = 3;
            break;
          }

          return _context6.abrupt("return", res.status(400).json({
            status: 0,
            message: 'Validation failed.',
            errors: errors.array()
          }));

        case 3:
          _context6.prev = 3;
          _req$body4 = req.body, phone = _req$body4.phone, password = _req$body4.password;

          if (!(!phone || !password)) {
            _context6.next = 7;
            break;
          }

          return _context6.abrupt("return", res.status(404).json({
            status: 0,
            message: 'Phone number and password are required.'
          }));

        case 7:
          _context6.next = 9;
          return regeneratorRuntime.awrap(users.findOne({
            where: {
              phone: phone
            }
          }));

        case 9:
          user = _context6.sent;

          if (user) {
            _context6.next = 12;
            break;
          }

          return _context6.abrupt("return", res.status(404).json({
            status: 0,
            message: 'User not found.'
          }));

        case 12:
          _context6.next = 14;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 14:
          hashedPassword = _context6.sent;
          _context6.next = 17;
          return regeneratorRuntime.awrap(user.update({
            password: hashedPassword
          }));

        case 17:
          res.status(200).json({
            status: 1,
            message: 'Password reset successfully.',
            user_info: {
              id: user.id,
              name: user.name,
              phone: user.phone,
              bod: user.bod,
              profile_pic: user.profile_pic,
              subscriptionId: user.subscriptionId
            }
          });
          _context6.next = 24;
          break;

        case 20:
          _context6.prev = 20;
          _context6.t0 = _context6["catch"](3);
          console.error('Error resetting password:', _context6.t0);
          res.status(500).json({
            status: 0,
            message: 'Something went wrong.',
            error: _context6.t0.message
          });

        case 24:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[3, 20]]);
};

module.exports = {
  loginUser: loginUser,
  createUser: createUser,
  updateUser: updateUser,
  getUserInfo: getUserInfo,
  uploadProfileImage: uploadProfileImage,
  updatePassword: updatePassword
};