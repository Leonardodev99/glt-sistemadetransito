import { ValidationError } from 'sequelize';
import Agente from '../models/Agente';
import Admin from '../models/Admin';

class AgenteController {
  // Criar novo agente
  async store(req, res) {
    try {
      const {
        nome, bi, nip, email, senha, status, id_admin
      } = req.body;

      const agente = await Agente.create({
        nome, bi, nip, email, senha, status, id_admin
      });

      // transforma em objeto puro e remove senha_hash
      const agenteSafe = agente.get({ plain: true });
      delete agenteSafe.senha_hash;
      delete agenteSafe.senha;

      return res.status(201).json(agenteSafe);
    } catch (e) {
      console.error(e);

      if (e instanceof ValidationError) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message)
        });
      }

      return res.status(400).json({ error: e.message });
    }
  }

  // Listar todos os agentes
  async index(req, res) {
    try {
      const agentes = await Agente.findAll({
        attributes: [
          'id_agente',
          'nome',
          'bi',
          'nip',
          'email',
          'status',
          'id_admin',
          'created_at',
          'updated_at'
        ],
        include: [
          {
            model: Admin,
            as: 'admin',
            attributes: ['id_admin', 'nome', 'email']
          }
        ]
      });

      return res.json(agentes);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // Buscar agente por ID
  async show(req, res) {
    try {
      const { id } = req.params;
      const agente = await Agente.findByPk(id, {
        attributes: [
          'id_agente',
          'nome',
          'bi',
          'nip',
          'email',
          'status',
          'id_admin',
          'created_at',
          'updated_at'
        ],
        include: [
          {
            model: Admin,
            as: 'admin',
            attributes: ['id_admin', 'nome', 'email']
          }
        ]
      });

      if (!agente) {
        return res.status(404).json({ error: 'Agente não encontrado' });
      }

      return res.json(agente);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // Atualizar agente
  async update(req, res) {
    try {
      const { id } = req.params;

      const agente = await Agente.findByPk(id);
      if (!agente) {
        return res.status(404).json({ error: 'Agente não encontrado' });
      }

      const {
        nome, bi, nip, email, senha, status, id_admin
      } = req.body;

      await agente.update({
        nome, bi, nip, email, senha, status, id_admin
      });

      // transforma em objeto puro e remove senha_hash
      const agenteSafe = agente.get({ plain: true });
      delete agenteSafe.senha_hash;
      delete agenteSafe.senha;

      return res.json(agente);
    } catch (e) {
      if (e instanceof ValidationError) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message)
        });
      }
      return res.status(400).json({ error: e.message });
    }
  }

  // Deletar agente
  async delete(req, res) {
    try {
      const { id } = req.params;

      const agente = await Agente.findByPk(id);
      if (!agente) {
        return res.status(404).json({ error: 'Agente não encontrado' });
      }

      await agente.destroy();

      return res.json({ message: 'Agente deletado com sucesso' });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
}

export default new AgenteController();
