import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database';
import Admin from '../models/Admin';

const models = [Admin];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
