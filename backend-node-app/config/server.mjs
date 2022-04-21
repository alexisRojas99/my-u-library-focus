import express from 'express';
import cors from 'cors';
import routes from '../routes/api.mjs';

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8000;
    this.host = process.env.HOST;
    this.usuariosPath = '/api';

    // Lectura y Parseo del body
    this.app.use(express.json());

    // Middleware
    this.middleWares();

    // Ejecuta el metodo de las rutas
    this.routes();
  }

  middleWares() {
    // CORS
    this.app.use(cors());

    // Directorio publico
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.usuariosPath, routes);
  }

  listen() {
    this.app.listen(this.port, this.host, () => {
      // eslint-disable-next-line no-console
      console.log(`API-REST listening at http://${this.host}:${this.port}`);
    });
  }
}

export default Server;
