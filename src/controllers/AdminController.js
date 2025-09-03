import Admin from '../models/Admin';

class AdminController {
  // Criar novo admin
  async store(req, res) {
    try {
      const {
        nome, nip, email, senha_hash
      } = req.body;

      const admin = await Admin.create({
        nome, nip, email, senha_hash
      });

      return res.status(201).json(admin);
    } catch (e) {
      console.error(e);
      return res.status(400).json({ error: e.message });
    }
  }

  // Listar todos os admins
  async index(req, res) {
    try {
      const admins = await Admin.findAll({
        attributes: ['id_admin', 'nome', 'nip', 'email', 'created_at', 'updated_at']
      });

      return res.json(admins);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // Buscar admin por ID
  async show(req, res) {
    try {
      const { id } = req.params;
      const admin = await Admin.findByPk(id, {
        attributes: ['id_admin', 'nome', 'nip', 'email', 'created_at', 'updated_at']
      });

      if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
      }

      return res.json(admin);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // Atualizar admin
  async update(req, res) {
    try {
      const { id } = req.params;

      const admin = await Admin.findByPk(id);
      if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
      }

      const {
        nome, nip, email, senha_hash
      } = req.body;
      await admin.update({
        nome, nip, email, senha_hash
      });

      return res.json(admin);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }

  // Deletar admin
  async delete(req, res) {
    try {
      const { id } = req.params;

      const admin = await Admin.findByPk(id);
      if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
      }

      await admin.destroy();

      return res.json({ message: 'Admin deleted successfully' });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
}

export default new AdminController();
