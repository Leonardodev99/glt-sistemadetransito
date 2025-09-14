module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('veiculos', 'file_livrete', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('veiculos', 'file_livrete');
  }
};
