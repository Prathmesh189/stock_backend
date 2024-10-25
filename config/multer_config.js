const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profile_img'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() ; 
    cb(null, uniqueSuffix + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage });

module.exports = upload;