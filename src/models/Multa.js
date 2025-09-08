import Sequelize, { Model } from 'sequelize';

export default class Multa extends Model {
  static init(sequelize) {
    super.init(
      {
        id_multa: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        categoria: {
          type: Sequelize.ENUM('Leve', 'Leve-Média', 'Grave', 'Muito Grave', 'Gravíssima'),
          allowNull: false
        },
        coima_ucf: {
          type: Sequelize.STRING,
          allowNull: false
        },
        faixa_kz: {
          type: Sequelize.STRING,
          allowNull: false
        },
        valor_kz: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false
        }
      },
      {
        sequelize,
        tableName: 'multas'
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Ocorrencia, {
      foreignKey: 'id_ocorrencia',
      as: 'ocorrencia'
    });
  }
}
