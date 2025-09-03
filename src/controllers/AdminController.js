import Admin from '../models/Admin';

class AdminController {
  async index(req, res) {
    const novoAdmin = await Admin.create({
      nome: 'João Silva',
      email: 'joao.silva@example.com',
      nip: '123456',
      senha_hash: '1234'
    });

    res.json(novoAdmin);
  }
}

export default new AdminController();
