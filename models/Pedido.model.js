const mongoose = require('mongoose');
const { totalPedido, totalProductosPedido } = require('../helpers/util.js');

const ProductosPedidoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'Debe indicar el nombre del producto'],
  },
  sku: {
    type: String,
    required: [true, 'Debe indicar el SKU o número de parte'],
  },
  cantidad: {
    type: Number,
    default: 1,
  },
  precio: {
    type: Number,
  },
  descuento: {
    type: Number,
  },
  impuesto: {
    type: Number,
  },
  total: {
    type: Number,
  },
});

ProductosPedidoSchema.pre('save', async function save(next) {
  try {
    this.total = totalProductosPedido(
      this.cantidad,
      this.precio,
      this.descuento,
      this.impuesto,
    );
    next();
  } catch (e) {
    next(e);
  }
});

const PedidoSchema = new mongoose.Schema({
  fecha: {
    type: Date,
  },
  email: {
    type: String,
    required: [true, 'Debe indicar un email válido'],
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Debe indicar un email válido',
    ],
  },
  status: {
    type: String,
    enum: ['Creado', 'Procesado', 'Enviado'], //Aagregado
  },
  productos: [ProductosPedidoSchema],
  descuento: {
    type: Number,
  },
  total: {
    type: Number,
  },
});

PedidoSchema.pre('save', async function save(next) {
  try {
    this.total = totalPedido(this.productos);
    next();
  } catch (e) {
    res.status(500).send({ message: e } || 'Error al crear pedido');
  }
});

module.exports = mongoose.model('Pedidos', PedidoSchema);
