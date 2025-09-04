module.exports = {
  async up(queryInterface) {
    await queryInterface.renameColumn('agentes', 'senha', 'senha_hash');
  },

  async down(queryInterface) {
    await queryInterface.renameColumn('agentes', 'senha_hash', 'senha');
  }
};
