import { ValidationError } from 'sequelize';
import Admin from '../models/Admin';

class AdminController {
  // Criar novo admin
  async store(req, res) {
    try {
      const {
        nome, nip, email, senha
      } = req.body;

      const admin = await Admin.create({
        nome, nip, email, senha
      });

      // transforma em objeto puro e remove senha_hash
      const adminSafe = admin.get({ plain: true });
      delete adminSafe.senha_hash;
      delete adminSafe.senha;

      return res.status(201).json(adminSafe);
    } catch (e) {
      console.error(e);

      // Verifica se o erro é de validação do Sequelize
      if (e instanceof ValidationError) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message) // pega as mensagens personalizadas
        });
      }
      return res.status(400).json({ error: e.message });
    }
  }

  async verPerfil(req, res) {
    try {
      if (req.user.type !== 'admin') {
        return res.status(403).json({ error: 'Acesso negado para não-admins' });
      }

      const admin = await Admin.findByPk(req.user.id, {
        attributes: ['id_admin', 'nome', 'email', 'nip', 'createdAt']
      });

      if (!admin) {
        return res.status(404).json({ error: 'Admin não encontrado' });
      }

      return res.json(admin);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // Atualizar admin (apenas o logado pode alterar seus dados)
  async update(req, res) {
    try {
      if (req.user.type !== 'admin') {
        return res.status(403).json({ error: 'Acesso negado: apenas admins podem atualizar seus dados' });
      }

      const admin = await Admin.findByPk(req.user.id);
      if (!admin) {
        return res.status(404).json({ error: 'Admin não encontrado' });
      }

      const {
        nome, nip, email, senha
      } = req.body;

      await admin.update({
        nome, nip, email, senha
      });

      // transforma em objeto puro e remove senha/senha_hash
      const adminSafe = admin.get({ plain: true });
      delete adminSafe.senha_hash;
      delete adminSafe.senha;

      return res.json(adminSafe);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }

  // Listar todos os admins
  /* async index(req, res) {
    try {
      const admins = await Admin.findAll();

      return res.json(admins);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  } */

  // Buscar admin por ID
  /*  async show(req, res) {
    try {
      const { id } = req.params;
      const admin = await Admin.findByPk(id);

      if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
      }

      return res.json(admin);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  } */

  // Deletar admin
/* async delete(req, res) {
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
  } */
}

export default new AdminController();
