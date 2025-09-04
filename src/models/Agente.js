import Sequelize, { Model } from 'sequelize';

export default class Agente extends Model {
  static init(sequelize) {
    super.init(
      {
        id_agente: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'O nome não pode estar vazio'
            },
            isAlphaOnly(value) {
              if (/\d/.test(value)) {
                throw new Error('O nome não deve conter números');
              }
            }
          }
        },
        bi: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: {
            msg: 'O BI já está cadastrado'
          },
          validate: {
            isValidBI(value) {
              const regex = /^\d{9}[A-Za-z]{2}\d{3}$/;
              if (!regex.test(value)) {
                throw new Error(
                  'BI inválido. Deve ter 14 caracteres: 9 dígitos + 2 letras + 3 dígitos (ex: 123456789AZ123)'
                );
              }
            }
          }
        },
        nip: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: {
            msg: 'O NIP já está cadastrado'
          }
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: {
            msg: 'O email já está cadastrado'
          },
          validate: {
            isEmail: {
              msg: 'Email inválido'
            }
          }
        },
        senha_hash: {
          type: Sequelize.STRING,
          allowNull: false
        },
        status: {
          type: Sequelize.ENUM('ativo', 'inativo'),
          defaultValue: 'ativo'
        }
      },
      {
        sequelize,
        tableName: 'agentes',
        defaultScope: {
        // 🚀 nunca retorna senha_hash por padrão
          attributes: { exclude: ['senha_hash'] }
        }
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Admin, {
      foreignKey: 'id_admin',
      as: 'admin' // agente.getAdmin()
    });
  }
}
