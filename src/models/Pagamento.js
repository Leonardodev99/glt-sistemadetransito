import Sequelize, { Model } from 'sequelize';

export default class Pagamento extends Model {
  static init(sequelize) {
    super.init(
      {
        id_pagamento: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        codigo_referencia: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
          validate: {
            notEmpty: {
              msg: 'O código de referência é obrigatório'
            }
          }
        },
        valor_pago: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
          validate: {
            isDecimal: {
              msg: 'O valor pago deve ser numérico'
            },
            min: {
              args: [0],
              msg: 'O valor pago não pode ser negativo'
            }
          }
        },
        metodo_pagamento: {
          type: Sequelize.ENUM('dinheiro', 'transferencia', 'cartao', 'multicaixa'),
          allowNull: false
        },
        status: {
          type: Sequelize.ENUM('pendente', 'pago', 'cancelado'),
          allowNull: false,
          defaultValue: 'pendente'
        },
        data_pagamento: {
          type: Sequelize.DATE,
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: 'pagamentos',
        underscored: true
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Multa, {
      foreignKey: 'id_multa',
      as: 'multa'
    });
  }
}
