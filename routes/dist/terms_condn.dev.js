"use strict";

var express = require('express');

var _require = require('../controllers/terms_privacy'),
    getPrivacyAndTerms = _require.getPrivacyAndTerms,
    createOrUpdatePrivacyAndTerms = _require.createOrUpdatePrivacyAndTerms;

var router = express.Router();
router.get('/privacy-and-terms', getPrivacyAndTerms);
router.post('/privacy-and-terms', createOrUpdatePrivacyAndTerms);
module.exports = router;