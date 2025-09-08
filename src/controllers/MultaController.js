import { ValidationError } from 'sequelize';
import Multa from '../models/Multa';

class MultaController {
  // Criar nova multa
  async store(req, res) {
    try {
      const {
        categoria, coima_ucf, faixa_kz, valor_kz, id_ocorrencia
      } = req.body;

      const multa = await Multa.create({
        categoria,
        coima_ucf,
        faixa_kz,
        valor_kz,
        id_ocorrencia
      });

      return res.status(201).json(multa);
    } catch (e) {
      if (e instanceof ValidationError) {
        return res.status(400).json({ errors: e.errors.map((err) => err.message) });
      }
      return res.status(400).json({ error: e.message });
    }
  }

  // Listar todas multas
  async index(req, res) {
    try {
      const multas = await Multa.findAll({
        include: [{ association: 'ocorrencia' }]
      });
      return res.json(multas);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // Buscar multa por ID
  async show(req, res) {
    try {
      const { id } = req.params;
      const multa = await Multa.findByPk(id, {
        include: [{ association: 'ocorrencia' }]
      });

      if (!multa) {
        return res.status(404).json({ error: 'Multa não encontrada' });
      }

      return res.json(multa);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // Atualizar multa
  async update(req, res) {
    try {
      const { id } = req.params;

      const multa = await Multa.findByPk(id);
      if (!multa) {
        return res.status(404).json({ error: 'Multa não encontrada' });
      }

      const {
        categoria, coima_ucf, faixa_kz, valor_kz, id_ocorrencia
      } = req.body;

      await multa.update({
        categoria,
        coima_ucf,
        faixa_kz,
        valor_kz,
        id_ocorrencia
      });

      return res.json(multa);
    } catch (e) {
      if (e instanceof ValidationError) {
        return res.status(400).json({ errors: e.errors.map((err) => err.message) });
      }
      return res.status(400).json({ error: e.message });
    }
  }

  // Deletar multa
  async delete(req, res) {
    try {
      const { id } = req.params;

      const multa = await Multa.findByPk(id);
      if (!multa) {
        return res.status(404).json({ error: 'Multa não encontrada' });
      }

      await multa.destroy();

      return res.json({ message: 'Multa deletada com sucesso' });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
}

export default new MultaController();
