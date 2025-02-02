const { verifyRol } = require('../middlewares/verifyRol.js');
const { verifyJWT } = require('../helpers/util.js');
const express = require('express');
const router = express.Router();

const productos = require('../controllers/productos.controller.js');
const { upload } = require('../middlewares/multer.middleware.js');
const managerImage = require('../middlewares/upload.middleware.js');

router.post(
  '/producto',
  /*verifyJWT,
   verifyRol(['admin']),
   */
  upload('image'),
  managerImage,
  productos.create
);
router.get('/producto', /* verifyJWT,*/ productos.findAll);
router.get('/producto/:id', verifyJWT, productos.findOne);
router.patch(
  '/producto/:id',
  verifyJWT,
  verifyRol(['admin']),
  productos.update
);
router.delete(
  '/producto/:id',
  verifyJWT,
  verifyRol(['admin']),
  productos.delete
);

module.exports = router;
