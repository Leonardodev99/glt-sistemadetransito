import { ValidationError } from 'sequelize';
import Multa from '../models/Multa';
import Ocorrencia from '../models/Ocorrencia';

class MultaController {
// Criar nova multa
  async store(req, res) {
    try {
      const {
        categoria, coima_ucf, faixa_kz, valor_kz, id_ocorrencia
      } = req.body;

      // Verifica se a ocorrência existe
      const ocorrencia = await Ocorrencia.findByPk(id_ocorrencia);
      if (!ocorrencia) {
        return res.status(404).json({ error: 'Ocorrência não encontrada' });
      }

      // Se o tipo for "Apreensão", não cadastrar multa
      if (ocorrencia.tipo && ocorrencia.tipo.toLowerCase() === 'apreensão') {
        return res.status(400).json({ error: 'Não é possível cadastrar multa em uma ocorrência do tipo Apreensão' });
      }

      // Apenas cadastra se for tipo "Multa"
      if (ocorrencia.tipo && ocorrencia.tipo.toLowerCase() !== 'multa') {
        return res.status(400).json({ error: 'O tipo da ocorrência não é válido para cadastro de multa' });
      }

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

      // Se o id_ocorrencia vier no update, validar o tipo
      if (id_ocorrencia) {
        const ocorrencia = await Ocorrencia.findByPk(id_ocorrencia);
        if (!ocorrencia) {
          return res.status(404).json({ error: 'Ocorrência não encontrada' });
        }

        // Bloqueia caso seja apreensão
        if (ocorrencia.tipo && ocorrencia.tipo.toLowerCase() === 'apreensão') {
          return res.status(400).json({ error: 'Não é possível vincular multa a uma ocorrência do tipo Apreensão' });
        }

        // Só permite se for multa
        if (ocorrencia.tipo && ocorrencia.tipo.toLowerCase() !== 'multa') {
          return res.status(400).json({ error: 'O tipo da ocorrência não é válido para multa' });
        }
      }

      await multa.update({
        categoria,
        coima_ucf,
        faixa_kz,
        valor_kz,
        id_ocorrencia: id_ocorrencia ?? multa.id_ocorrencia // mantém caso não venha no body
      });

      return res.json(multa);
    } catch (e) {
      if (e instanceof ValidationError) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message)
        });
      }
      return res.status(400).json({ error: e.message });
    }
  }

  // Deletar multa
/*  async delete(req, res) {
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
  } */
}

export default new MultaController();
