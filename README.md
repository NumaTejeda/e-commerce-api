//Variables de entorno

PORT
MONGODB_URI
JWT_SECRET
USER_NAME_MONGO
USER_PASS_MONGO
FRASE_SECRETA

//C - Inserción de clientes
routes.post('/cliente',clientes.create);

body: {
"email": "numa.tejeda@gmail.com",
"clave": "Pomelo",
"nombre": "Numa",
"direccion": "",
"telefono": ""
}

//R - Consulta de clientes
routes.get('/clientes', verifyJWT, clientes.findAll);

Headers: authorization:token

//R - Consulta detallada de cliente
routes.get('/cliente/:id', verifyJWT, clientes.findOne);
Headers: authorization:token
Params: id

//U - Actualización de clientes
routes.patch('/cliente', verifyJWT, clientes.update);

//D - Borrado de clientes
routes.delete('/cliente', verifyJWT, clientes.delete);

//D - Borrado de clientes
routes.post('/cliente/auth',clientes.auth);

//C - Inserción de productos
routes.post('/producto',verifyJWT, productos.create);

headers: content/type:application/json

bodyExample: {
"nombre": "Tablets",
"sku": "265456",
"precio": 700,
"descripcion": "Muy bonita",
"dimenciones": {"ancho": 8, "alto": 5}
"proveedor": "Coppel"
}

//R -Consulta de productos
routes.get('/productos',productos.findAll);

//R - Consulta detallada de un producto
routes.get('/producto/:id',productos.findOne);

//U - Actualización de productos
routes.patch('/producto/:id',verifyJWT, productos.update);

//D - Borrado de productos
routes.delete('/producto/:id', verifyJWT, productos.delete);

//C - Inserción de pedidos
routes.post('/pedidos',pedidos.create);

//R - Consulta de clientes
routes.get('/pedidos',pedidos.findAll);

//R - Consulta detallada de cliente
routes.get('/pedido/:id',pedidos.findOne);

//U - Actualización de clientes
routes.patch('/pedido',pedidos.update);

//D - Borrado de clientes
routes.delete('/pedido',pedidos.delete);
