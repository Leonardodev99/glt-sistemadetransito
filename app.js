import dotenv from 'dotenv';

dotenv.config();

import './src/database';

import express from 'express';

import homeRoutes from './src/routes/homeRoutes';
import adminRoutes from './src/routes/adminRoutes';
import agenteRoutes from './src/routes/agenteRoutes';
import condutorRoutes from './src/routes/condutorRoutes';
import veiculoRoutes from './src/routes/veiculoRoutes';
import ocorrenciaRoutes from './src/routes/ocorrenciaRoutes';
import multaRoutes from './src/routes/multaRoutes';
import pagamentosRoutes from './src/routes/pagamentosRoutes';
import reportRoutes from './src/routes/reportRoutes';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/admins', adminRoutes);
    this.app.use('/agentes', agenteRoutes);
    this.app.use('/condutores', condutorRoutes);
    this.app.use('/veiculos', veiculoRoutes);
    this.app.use('/ocorrencias', ocorrenciaRoutes);
    this.app.use('/multas', multaRoutes);
    this.app.use('/pagamentos', pagamentosRoutes);
    this.app.use('/relatorios', reportRoutes);
  }
}

export default new App().app;
