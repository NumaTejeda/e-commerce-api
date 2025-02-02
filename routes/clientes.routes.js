const { verifyRol } = require('../middlewares/verifyRol.js');
const { verifyJWT } = require('../helpers/util.js');
const express = require('express');
const router = express.Router();
const clientes = require('../controllers/clientes.controller.js');

router.post('/cliente', clientes.create);
router.get('/cliente', verifyJWT, verifyRol(['admin']), clientes.findAll);
router.get('/cliente/:id', verifyJWT, clientes.findOne);
router.patch('/cliente/:id', verifyJWT, clientes.update);
router.delete('/cliente/:id', verifyJWT, verifyRol(['admin']), clientes.delete);
router.post('/cliente/auth', clientes.auth);

module.exports = router;
