import Sequelize, { Model } from 'sequelize';

export default class Admin extends Model {
  static init(sequelize) {
    super.init({
      id_admin: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_admin' // garante que use o nome correto do BD
      },
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [4, 150],
            msg: 'Field name must have between 5 and 255 characters'
          },
          isNotStartWithNumber(value) {
            if (/^\d{2}/.test(value)) {
              throw new Error('username cannot start with two numbers');
            }
          }
        }
      },
      nip: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'NIP already exists'
        }

      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email already exists'
        },
        validate: {
          isEmail: {
            msg: 'Invalid email'
          }
        }

      },
      senha_hash: {
        type: Sequelize.STRING
      }

    }, {
      sequelize
    });

    return this;
  }
}
