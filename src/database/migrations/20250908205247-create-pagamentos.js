module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pagamentos', {
      id_pagamento: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      codigo_referencia: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      valor_pago: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
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
      },
      id_multa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'multas',
          key: 'id_multa'
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
    await queryInterface.dropTable('pagamentos');
  }
};
