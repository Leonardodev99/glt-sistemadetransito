module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('condutores', {
      id_condutor: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      nome: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      telefone: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true
      },
      bi: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      num_carta: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      data_validade_carta: {
        type: Sequelize.DATE,
        allowNull: false
      },
      file_bi: {
        type: Sequelize.STRING, // guarda caminho/URL do BI
        allowNull: true
      },
      file_carta: {
        type: Sequelize.STRING, // guarda caminho/URL da carta
        allowNull: true
      },
      foto: {
        type: Sequelize.STRING, // guarda caminho/URL da foto
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('condutores');
  }
};
