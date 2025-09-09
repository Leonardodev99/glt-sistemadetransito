import Sequelize, { Model } from 'sequelize';

export default class Ocorrencia extends Model {
  static init(sequelize) {
    super.init(
      {
        id_ocorrencia: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        data_hora: {
          type: Sequelize.DATE,
          allowNull: false
        },
        localizacao: {
          type: Sequelize.STRING(255),
          allowNull: false
        },
        tipo: {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        descricao: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        status_sincronizacao: {
          type: Sequelize.ENUM('pendente', 'sincronizado'),
          defaultValue: 'pendente',
          allowNull: false
        }
      },
      {
        sequelize,
        tableName: 'ocorrencias'
      }
    );

    return this;
  }

  static associate(models) {
    // Uma ocorrência pertence a um agente
    this.belongsTo(models.Agente, {
      foreignKey: 'id_agente',
      as: 'agente'
    });

    // Uma ocorrência pertence a um condutor
    this.belongsTo(models.Condutor, {
      foreignKey: 'id_condutor',
      as: 'condutor'
    });

    // Uma ocorrência pertence a um veículo
    this.belongsTo(models.Veiculo, {
      foreignKey: 'id_veiculo',
      as: 'veiculo'
    });

    this.hasMany(models.Multa, {
      foreignKey: 'id_ocorrencia',
      as: 'multas'
    });
  }
}
