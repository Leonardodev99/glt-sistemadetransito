import Sequelize, { Model } from 'sequelize';

export default class Veiculo extends Model {
  static init(sequelize) {
    super.init(
      {
        id_veiculo: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        matricula: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: {
            msg: 'A matrícula já está cadastrada'
          }
        },
        num_livrete: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: {
            msg: 'O número do livrete já está cadastrado'
          }
        },
        marca: {
          type: Sequelize.STRING,
          allowNull: false
        },
        modelo: {
          type: Sequelize.STRING,
          allowNull: false
        },
        cor: {
          type: Sequelize.STRING,
          allowNull: false
        }
      },
      {
        sequelize,
        tableName: 'veiculos'
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Condutor, {
      foreignKey: 'id_condutor',
      as: 'condutor'
    });
  }
}
