import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database';
import Admin from '../models/Admin';
import Agente from '../models/Agente';
import Condutor from '../models/Condutor';
import Veiculo from '../models/Veiculo';
import Ocorrencia from '../models/Ocorrencia';
import Multa from '../models/Multa';

const models = [Admin, Agente, Condutor, Veiculo, Ocorrencia, Multa];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));

// configurar associações
models.forEach((model) => {
  if (model.associate) {
    model.associate(connection.models);
  }
});

export default connection;
