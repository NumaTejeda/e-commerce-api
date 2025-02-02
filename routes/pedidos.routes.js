const { verifyRol } = require('../middlewares/verifyRol.js');
const { verifyJWT } = require('../helpers/util.js');
const express = require('express');
const router = express.Router();
const pedidos = require('../controllers/pedidos.controller.js');

router.post('/pedido', /*verifyJWT,*/ pedidos.create);
router.get('/pedido', /*verifyJWT, verifyRol(['admin']),*/ pedidos.findAll);
router.get('/pedido/:id', verifyJWT, pedidos.findOne);
router.patch('/pedido', verifyJWT, pedidos.update);
router.delete('/pedido/:id', verifyJWT, verifyRol(['admin']), pedidos.delete);
router.delete('/pedidos', verifyJWT, verifyRol(['admin']), pedidos.deleteAll);

module.exports = router;
