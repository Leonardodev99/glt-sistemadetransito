module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('multas', {
      id_multa: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      categoria: {
        type: Sequelize.ENUM('Leve', 'Leve-Média', 'Grave', 'Muito Grave', 'Gravíssima'),
        allowNull: false
      },
      coima_ucf: {
        type: Sequelize.STRING, // Ex: "6-30", "30-150"
        allowNull: false
      },
      faixa_kz: {
        type: Sequelize.STRING, // Ex: "530-2640", "2640-13200"
        allowNull: false
      },
      valor_kz: {
        type: Sequelize.DECIMAL(10, 2), // Valor da multa em KZ
        allowNull: false
      },
      id_ocorrencia: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ocorrencias',
          key: 'id_ocorrencia'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('multas');
  }
};
