import { ValidationError } from 'sequelize';
import Ocorrencia from '../models/Ocorrencia';
import Agente from '../models/Agente';
import Condutor from '../models/Condutor';
import Veiculo from '../models/Veiculo';

class OcorrenciaController {
  // Criar ocorrência
  async store(req, res) {
    try {
      if (req.user.type !== 'agente') {
        return res.status(403).json({ error: 'Acesso negado: apenas agentes podem cadastrar ocorrência' });
      }

      const agente = await Agente.findByPk(req.user.id);
      if (!agente) {
        return res.status(404).json({ error: 'Agente inválido ou não encontrado' });
      }

      const {
        data_hora, localizacao, tipo, descricao, status_sincronizacao, id_condutor, id_veiculo
      } = req.body;

      // Validações de chaves estrangeiras
      const condutor = await Condutor.findByPk(id_condutor);
      if (!condutor) {
        return res.status(400).json({ error: 'Condutor inválido ou não encontrado' });
      }

      const veiculo = await Veiculo.findByPk(id_veiculo);
      if (!veiculo) {
        return res.status(400).json({ error: 'Veículo inválido ou não encontrado' });
      }

      const ocorrencia = await Ocorrencia.create({
        data_hora,
        localizacao,
        tipo,
        descricao,
        status_sincronizacao,
        id_agente: req.user.id,
        id_condutor,
        id_veiculo
      });

      return res.status(201).json(ocorrencia);
    } catch (e) {
      if (e instanceof ValidationError) {
        return res.status(400).json({ errors: e.errors.map((err) => err.message) });
      }
      return res.status(500).json({ error: e.message });
    }
  }

  // Listar todas ocorrências
  async index(req, res) {
    try {
      const ocorrencias = await Ocorrencia.findAll({
        include: [
          { model: Agente, as: 'agente' },
          { model: Condutor, as: 'condutor' },
          { model: Veiculo, as: 'veiculo' }
        ]
      });

      return res.json(ocorrencias);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // Buscar uma ocorrência pelo id
  async show(req, res) {
    try {
      const { id } = req.params;

      const ocorrencia = await Ocorrencia.findByPk(id, {
        include: [
          { model: Agente, as: 'agente' },
          { model: Condutor, as: 'condutor' },
          { model: Veiculo, as: 'veiculo' }
        ]
      });

      if (!ocorrencia) {
        return res.status(404).json({ error: 'Ocorrência não encontrada' });
      }

      return res.json(ocorrencia);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // Atualizar ocorrência
  async update(req, res) {
    try {
      const { id } = req.params;

      const ocorrencia = await Ocorrencia.findByPk(id);
      if (!ocorrencia) {
        return res.status(404).json({ error: 'Ocorrência não encontrada' });
      }

      const {
        data_hora, localizacao, tipo, descricao, status_sincronizacao, id_agente, id_condutor, id_veiculo
      } = req.body;

      // Validações de chaves estrangeiras (se enviadas)
      if (id_agente) {
        const agente = await Agente.findByPk(id_agente);
        if (!agente) {
          return res.status(400).json({ error: 'Agente inválido ou não encontrado' });
        }
      }

      if (id_condutor) {
        const condutor = await Condutor.findByPk(id_condutor);
        if (!condutor) {
          return res.status(400).json({ error: 'Condutor inválido ou não encontrado' });
        }
      }

      if (id_veiculo) {
        const veiculo = await Veiculo.findByPk(id_veiculo);
        if (!veiculo) {
          return res.status(400).json({ error: 'Veículo inválido ou não encontrado' });
        }
      }

      await ocorrencia.update({
        data_hora,
        localizacao,
        tipo,
        descricao,
        status_sincronizacao,
        id_agente,
        id_condutor,
        id_veiculo
      });

      return res.json(ocorrencia);
    } catch (e) {
      if (e instanceof ValidationError) {
        return res.status(400).json({ errors: e.errors.map((err) => err.message) });
      }
      return res.status(500).json({ error: e.message });
    }
  }

  // Deletar ocorrência
/*  async delete(req, res) {
    try {
      const { id } = req.params;

      const ocorrencia = await Ocorrencia.findByPk(id);
      if (!ocorrencia) {
        return res.status(404).json({ error: 'Ocorrência não encontrada' });
      }

      await ocorrencia.destroy();
      return res.json({ message: 'Ocorrência removida com sucesso' });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  } */
}

export default new OcorrenciaController();
