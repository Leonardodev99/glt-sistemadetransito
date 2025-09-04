module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('agentes', {
      id_agente: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      nome: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      bi: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      nip: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('ativo', 'inativo'),
        allowNull: false,
        defaultValue: 'ativo'
      },
      id_admin: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'admins', // tabela de admins
          key: 'id_admin'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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
    await queryInterface.dropTable('agentes');
  }
};
