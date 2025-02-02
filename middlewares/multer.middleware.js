const multer = require('multer');
const path = require('path');

const BASE_PATH = path.resolve(__dirname, '..');
const UPLOAD_PATH = path.join(BASE_PATH, 'uploads');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() + 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

export const upload = (fieldName) => {
  return [
    multer({ storage }).single(fieldName),
    (req, res, next) => {
      if (!req.file) {
        return res.status(404).send({ error: 'file not found' });
      }
      req.filePath = path.join(UPLOAD_PATH, req.file.filename);
      next();
    },
  ];
};
