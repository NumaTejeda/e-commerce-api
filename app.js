require('dotenv').config();
const express = require('express');
const db = require('./config/config');
const mongoose = require('mongoose');

class App {
  constructor() {
    this.express = express();
    this.initialize();
  }

  async initialize() {
    try {
      await this.database();
      this.middlewares();
      this.routes();

      this.express.listen(2202, () => {
        console.log('API REST con mongo DB ejecutando en el puerto 2202 ');
      });
    } catch (error) {
      console.log(error);
    }
  }

  async database() {
    await mongoose.connect(db.uri);
  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(require('./routes/index.routes.js'));
  }
}

new App().express;
