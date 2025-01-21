
const express = require('express');
const { verifyRol } = require('../middlewares/verifyRol.js');
const { verifyJWT } = require('../helpers/util.js');
const productos = require('../controllers/productos.js');
const clientes = require('../controllers/clientes.js');
const pedidos = require('../controllers/pedidos.js');
const routes = express.Router();


// * Inserción de productos
routes.post('/producto', verifyJWT, verifyRol(['admin']), productos.create);
routes.get('/producto',/* verifyJWT,*/ productos.findAll);
routes.get('/producto/:id', verifyJWT, productos.findOne);
routes.patch('/producto/:id', verifyJWT, verifyRol(['admin']), productos.update);
routes.delete('/producto/:id', verifyJWT, verifyRol(['admin']), productos.delete);

// * Inserción de clientes
routes.post('/cliente', clientes.create);
routes.get('/cliente', verifyJWT, verifyRol(['admin']), clientes.findAll);
routes.get('/cliente/:id', verifyJWT, clientes.findOne);
routes.patch('/cliente/:id', verifyJWT, clientes.update);
routes.delete('/cliente/:id', verifyJWT, verifyRol(['admin']), clientes.delete);
routes.post('/cliente/auth', clientes.auth);

// * Inserción de pedidos
routes.post('/pedido', /*verifyJWT,*/ pedidos.create);
routes.get('/pedido', /*verifyJWT, verifyRol(['admin']),*/ pedidos.findAll);
routes.get('/pedido/:id', verifyJWT, pedidos.findOne);
routes.patch('/pedido', verifyJWT, pedidos.update);
routes.delete('/pedido/:id', verifyJWT, verifyRol(['admin']), pedidos.delete);
routes.delete('/pedidos', verifyJWT, verifyRol(['admin']), pedidos.deleteAll);

module.exports = routes;