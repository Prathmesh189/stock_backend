const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { createSyllabus,  getAllModuleNames  , getAllSyllabi, createSyllabusbyLinks, getByCourse } = require('../controllers/syallabus_controller');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'audio') {
      cb(null, 'uploads/audiofile');
    } else if (file.fieldname === 'document') {
      cb(null, 'uploads/documents');
    } else {
      cb(new Error('Invalid field name'), false);
    }
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname.replace(/\s+/g, '_');
    cb(null, Date.now() + '-' + originalName);
  }


});

const upload = multer({ storage });

router.post('/create', upload.fields([{ name: 'audio' ,maxCount:1}, { name: 'document' }]), createSyllabus);

router.post('/createLink', createSyllabusbyLinks);

router.get('/get', getAllSyllabi);

router.get('/begginer/:course_id', getByCourse);

router.get('/advance', getAllModuleNames);

module.exports = router;