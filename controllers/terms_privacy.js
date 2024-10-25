const { privacy_and_terms } = require('../models');

// Get Privacy and Terms
const getPrivacyAndTerms = async (req, res) => {
  try {
    const privacyAndTerms = await privacy_and_terms.findAll();
    res.status(200).json(privacyAndTerms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve privacy and terms' });
  }
};






// Create or Update Privacy and Terms
const createTermsAndcondn = async (req, res) => {
  const { termsText, PrivacyText } = req.body;


  try {

    const privacyAndTerms = await privacy_and_terms.create({ termsText, PrivacyText });
    res.status(201).json({ message: 'Privacy and Terms created successfully', data: privacyAndTerms });



  } catch (error) {
    res.status(500).json({ error: 'Failed to create or update privacy and terms' });
  }
};

module.exports = {
  getPrivacyAndTerms,
  createOrUpdatePrivacyAndTerms: createTermsAndcondn,
};
