const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ClienteSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Debe indicar un email válido'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Debe indicar un email válido'],
  },
  clave: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
  },
  telefono: {
    type: String,
  },
  rol: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
});



ClienteSchema.pre('save', async function save(next){
  if (!this.isModified('clave')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.clave = await bcrypt.hash(this.clave, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Cliente', ClienteSchema);
