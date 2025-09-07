module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('veiculos', {
      id_veiculo: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      matricula: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      num_livrete: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      marca: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      modelo: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      cor: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      id_condutor: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'condutores', // tabela condutores já deve existir
          key: 'id_condutor'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL' // se o condutor for deletado, os veículos não
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
    await queryInterface.dropTable('veiculos');
  }
};
