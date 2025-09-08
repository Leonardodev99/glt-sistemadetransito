import { ValidationError } from 'sequelize';
import Pagamento from '../models/Pagamento';

class PagamentoController {
  // Criar pagamento
  async store(req, res) {
    try {
      const {
        codigo_referencia,
        valor_pago,
        metodo_pagamento,
        status,
        data_pagamento,
        id_multa
      } = req.body;

      const pagamento = await Pagamento.create({
        codigo_referencia,
        valor_pago,
        metodo_pagamento,
        status,
        data_pagamento,
        id_multa
      });

      return res.status(201).json(pagamento);
    } catch (e) {
      if (e instanceof ValidationError) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message)
        });
      }
      return res.status(400).json({ error: e.message });
    }
  }

  // Listar todos os pagamentos
  async index(req, res) {
    try {
      const pagamentos = await Pagamento.findAll({
        attributes: [
          'id_pagamento',
          'codigo_referencia',
          'valor_pago',
          'metodo_pagamento',
          'status',
          'data_pagamento',
          'id_multa',
          'created_at',
          'updated_at'
        ]
      });

      return res.json(pagamentos);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // Buscar pagamento por ID
  async show(req, res) {
    try {
      const { id } = req.params;

      const pagamento = await Pagamento.findByPk(id, {
        attributes: [
          'id_pagamento',
          'codigo_referencia',
          'valor_pago',
          'metodo_pagamento',
          'status',
          'data_pagamento',
          'id_multa',
          'created_at',
          'updated_at'
        ]
      });

      if (!pagamento) {
        return res.status(404).json({ error: 'Pagamento não encontrado' });
      }

      return res.json(pagamento);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // Atualizar pagamento
  async update(req, res) {
    try {
      const { id } = req.params;

      const pagamento = await Pagamento.findByPk(id);
      if (!pagamento) {
        return res.status(404).json({ error: 'Pagamento não encontrado' });
      }

      const {
        codigo_referencia,
        valor_pago,
        metodo_pagamento,
        status,
        data_pagamento,
        id_multa
      } = req.body;

      await pagamento.update({
        codigo_referencia,
        valor_pago,
        metodo_pagamento,
        status,
        data_pagamento,
        id_multa
      });

      return res.json(pagamento);
    } catch (e) {
      if (e instanceof ValidationError) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message)
        });
      }
      return res.status(400).json({ error: e.message });
    }
  }

  // Deletar pagamento
  async delete(req, res) {
    try {
      const { id } = req.params;

      const pagamento = await Pagamento.findByPk(id);
      if (!pagamento) {
        return res.status(404).json({ error: 'Pagamento não encontrado' });
      }

      await pagamento.destroy();

      return res.json({ message: 'Pagamento deletado com sucesso' });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
}

export default new PagamentoController();
