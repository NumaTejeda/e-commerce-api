const mongoose = require('mongoose');

const ImagenesSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
  },
});

const ProductoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El producto debe tener un nombre'],
    },
    sku: {
      type: String,
      required: [true, 'Debe indicar el SKU o número de parte'],
    },
    precio: {
      type: Number,
      required: true,
    },
    descripcion: {
      type: String,
    },
    dimensiones: {
      type: Map,
      of: Number,
    },
    proveedor: {
      type: String,
    },
    imagenes: [ImagenesSchema],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Producto', ProductoSchema);
