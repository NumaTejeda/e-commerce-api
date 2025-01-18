
const express = require('express');
const { verifyRol } = require('../middlewares/verifyRol.js');
const { verifyJWT } = require('../helpers/util.js');
const productos = require('../controllers/productos.js');
const clientes = require('../controllers/clientes.js');
const pedidos = require('../controllers/pedidos.js');
const routes = express.Router();



//C - Inserción de productos
routes.post('/producto', verifyJWT, verifyRol(['admin']), productos.create);
routes.get('/productos', productos.findAll);
routes.get('/producto/:id', productos.findOne);
routes.patch('/producto/:id', verifyJWT, verifyRol(['admin']), productos.update);
routes.delete('/producto/:id', verifyJWT, verifyRol(['admin']), productos.delete);

//C - Inserción de clientes
routes.post('/cliente', clientes.create);
routes.get('/clientes', verifyJWT, verifyRol(['admin']), clientes.findAll);
routes.get('/cliente/:id', verifyJWT, clientes.findOne);
routes.patch('/cliente', verifyJWT, clientes.update);
routes.delete('/cliente', verifyJWT, verifyRol(['admin']), clientes.delete);
routes.post('/cliente/auth', clientes.auth);

//C - Inserción de pedidos
routes.post('/pedidos', verifyJWT, pedidos.create);
routes.get('/pedidos', verifyJWT, verifyRol(['admin']), pedidos.findAll);
routes.get('/pedido/:id', verifyJWT, pedidos.findOne);
routes.patch('/pedido', verifyJWT, pedidos.update);
routes.delete('/pedido', verifyJWT, pedidos.delete);

module.exports = routes;