"use strict";

var express = require('express');

var multer = require('multer');

var path = require('path');

var router = express.Router();

var _require = require('../controllers/syallabus_controller'),
    createSyllabus = _require.createSyllabus,
    getAllModuleNames = _require.getAllModuleNames,
    getAllSyllabi = _require.getAllSyllabi,
    createSyllabusbyLinks = _require.createSyllabusbyLinks,
    getByCourse = _require.getByCourse;

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    if (file.fieldname === 'audio') {
      cb(null, 'uploads/audiofile');
    } else if (file.fieldname === 'document') {
      cb(null, 'uploads/documents');
    } else {
      cb(new Error('Invalid field name'), false);
    }
  },
  filename: function filename(req, file, cb) {
    var originalName = file.originalname.replace(/\s+/g, '_');
    cb(null, Date.now() + '-' + originalName);
  }
});
var upload = multer({
  storage: storage
});
router.post('/create', upload.fields([{
  name: 'audio',
  maxCount: 1
}, {
  name: 'document'
}]), createSyllabus);
router.post('/createLink', createSyllabusbyLinks);
router.get('/get', getAllSyllabi);
router.get('/begginer/:course_id', getByCourse);
router.get('/advance', getAllModuleNames);
module.exports = router;