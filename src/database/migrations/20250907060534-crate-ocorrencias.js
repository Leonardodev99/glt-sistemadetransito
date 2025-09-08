module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ocorrencias', {
      id_ocorrencia: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
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
      },
      id_agente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'agentes',
          key: 'id_agente'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_condutor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'condutores',
          key: 'id_condutor'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_veiculo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'veiculos',
          key: 'id_veiculo'
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
    await queryInterface.dropTable('ocorrencias');
  }
};
