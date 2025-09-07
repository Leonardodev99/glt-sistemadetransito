import Sequelize, { Model } from 'sequelize';

export default class Condutor extends Model {
  static init(sequelize) {
    super.init(
      {
        id_condutor: {
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
        telefone: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: {
            msg: 'Telefone já cadastrado'
          },
          validate: {
            len: {
              args: [11, 11],
              msg: 'Telefone deve ter exatamente 9 caracteres numéricos no formato xxx xxx xxx'
            },
            is: {
              args: /^\d{3} \d{3} \d{3}$/,
              msg: 'O telefone deve estar no formato xxx xxx xxx'
            }
          }
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: {
            msg: 'Email já cadastrado'
          },
          validate: {
            isEmail: {
              msg: 'Email inválido'
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
        num_carta: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: {
            msg: 'Número da carta já cadastrado'
          }
        },
        data_validade_carta: {
          type: Sequelize.DATE,
          allowNull: false,
          validate: {
            isDate: {
              msg: 'Data de validade da carta deve ser uma data válida'
            },
            isAfter: {
              args: new Date().toISOString().split('T')[0], // não pode ser no passado
              msg: 'A carta de condução já expirou'
            }
          }
        },
        file_bi: {
          type: Sequelize.STRING,
          allowNull: true
        },
        file_carta: {
          type: Sequelize.STRING,
          allowNull: true
        },
        foto: {
          type: Sequelize.STRING,
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: 'condutores'
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Veiculo, {
      foreignKey: 'id_condutor',
      as: 'veiculos' // condutor.getVeiculos()
    });
  }
}
