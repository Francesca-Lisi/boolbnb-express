const multer = require('multer');
// upload dellimmagine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rinominare il file
  },
});

const upload = multer({ storage });
module.exports = upload;