const express = require('express');
const routes = express.Router();
const productosRoutes = require('./productos.routes.js');
const clientesRoutes = require('./clientes.routes.js');
const pedidosRoutes = require('./pedidos.routes.js');

routes.use('/api/', productosRoutes);
routes.use('/api/', pedidosRoutes);
routes.use('/api/', clientesRoutes);

module.exports = routes;
