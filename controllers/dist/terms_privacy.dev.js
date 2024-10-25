"use strict";

var _require = require('../models'),
    privacy_and_terms = _require.privacy_and_terms; // Get Privacy and Terms


var getPrivacyAndTerms = function getPrivacyAndTerms(req, res) {
  var privacyAndTerms;
  return regeneratorRuntime.async(function getPrivacyAndTerms$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(privacy_and_terms.findAll());

        case 3:
          privacyAndTerms = _context.sent;
          res.status(200).json(privacyAndTerms);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            error: 'Failed to retrieve privacy and terms'
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // Create or Update Privacy and Terms


var createTermsAndcondn = function createTermsAndcondn(req, res) {
  var _req$body, termsText, PrivacyText, privacyAndTerms;

  return regeneratorRuntime.async(function createTermsAndcondn$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, termsText = _req$body.termsText, PrivacyText = _req$body.PrivacyText;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(privacy_and_terms.create({
            termsText: termsText,
            PrivacyText: PrivacyText
          }));

        case 4:
          privacyAndTerms = _context2.sent;
          res.status(201).json({
            message: 'Privacy and Terms created successfully',
            data: privacyAndTerms
          });
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);
          res.status(500).json({
            error: 'Failed to create or update privacy and terms'
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

module.exports = {
  getPrivacyAndTerms: getPrivacyAndTerms,
  createOrUpdatePrivacyAndTerms: createTermsAndcondn
};