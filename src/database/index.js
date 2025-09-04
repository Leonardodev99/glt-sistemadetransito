import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database';
import Admin from '../models/Admin';
import Agente from '../models/Agente';

const models = [Admin, Agente];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));

// configurar associações
models.forEach((model) => {
  if (model.associate) {
    model.associate(connection.models);
  }
});

export default connection;
