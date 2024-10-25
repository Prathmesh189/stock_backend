const express = require('express');
const { getPrivacyAndTerms, createOrUpdatePrivacyAndTerms } = require('../controllers/terms_privacy');
const router = express.Router();

router.get('/privacy-and-terms', getPrivacyAndTerms);

router.post('/privacy-and-terms', createOrUpdatePrivacyAndTerms);

module.exports = router;
