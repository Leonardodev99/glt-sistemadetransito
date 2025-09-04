import dotenv from 'dotenv';

dotenv.config();

import './src/database';

import express from 'express';

import homeRoutes from './src/routes/homeRoutes';
import adminRoutes from './src/routes/adminRoutes';
import agenteRoutes from './src/routes/agenteRoutes';

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
  }
}

export default new App().app;
