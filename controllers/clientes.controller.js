require('dotenv').config();
const jwt = require('jsonwebtoken');
const Cliente = require('../models/Cliente.model.js');
const { comparePassword } = require('../helpers/util.js');

class ClientesController {
  async create(req, res) {
    try {
      const data = await Cliente.create(req.body);
      return res.status(201).json(data);
    } catch (err) {
      res
        .status(500)
        .send({
          message: err.message || 'Error al realizar la creación del cliente',
        });
    }
  }

  async findAll(req, res) {
    try {
      const data = await Cliente.find();
      return res.status(201).json(data);
    } catch (err) {
      res
        .status(500)
        .send({
          message: err.message || 'Error al realizar la búsqueda de clientes',
        });
    }
  }

  async findOne(req, res) {
    const id = req.params.id;

    try {
      const data = await Cliente.findById(id);
      return res.status(201).json(data);
    } catch (err) {
      res.status(500).send({
        message:
          err.message ||
          `Error al realizar la búsqueda del cliente con id: ${id}`,
      });
    }
  }

  async update(req, res) {
    const id = req.params.id;

    try {
      const data = await Cliente.findByIdAndUpdate(id, req.body, {
        useFindAndModify: false,
      });
      console.log(data);
      return res.status(201).json(data);
    } catch (err) {
      res.status(500).send({
        message:
          err.message ||
          `Error al realizar la actualización del cliente con id: ${id}`,
      });
    }
  }

  async delete(req, res) {
    const id = req.params.id;

    try {
      const data = await Cliente.findByIdAndDelete(id);
      return res.status(201).json(data);
    } catch (err) {
      res.status(500).send({
        message:
          err.message ||
          `Error al realizar el borrado del cliente con id: ${id}`,
      });
    }
  }

  async auth(req, res) {
    try {
      const { email, clave } = req.body;
      const data = await Cliente.find({ email });

      if (data.length == 0) {
        res.status(500).send('Email no encontrado');
      } else {
        comparePassword(clave, data[0].clave, (err, isMatch) => {
          if (err) {
            res.status(500).send(err);
          }
          if (isMatch) {
            const payload = {
              id: data[0].id,
              clave: data[0].clave,
              email: data[0].email,
              rol: data[0].rol,
            };
            const token = jwt.sign(payload, process.env.FRASE_SECRETA, {
              expiresIn: '1h', // expires in 5min
            });
            return res.json({ auth: true, token: token });
          } else {
            res.status(500).send('Clave inválida');
          }
        });
      }
    } catch (err) {
      res
        .status(500)
        .send({
          message: err.message || 'Error al realizar la creación del cliente',
        });
    }
  }
}

module.exports = new ClientesController();
