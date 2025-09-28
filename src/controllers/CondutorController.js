import { ValidationError } from 'sequelize';
import path from 'path';
import fs from 'fs';
import Condutor from '../models/Condutor';

class CondutorController {
  // Criar novo condutor
  async store(req, res) {
    try {
      const {
        nome,
        telefone,
        email,
        bi,
        num_carta,
        data_validade_carta
      } = req.body;

      const file_bi = req.files?.file_bi ? req.files.file_bi[0].filename : null;
      const file_carta = req.files?.file_carta ? req.files.file_carta[0].filename : null;
      const foto = req.files?.foto ? req.files.foto[0].filename : null;

      const condutor = await Condutor.create({
        nome,
        telefone,
        email,
        bi,
        num_carta,
        data_validade_carta,
        file_bi,
        file_carta,
        foto
      });

      return res.status(201).json(condutor);
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

  // Listar todos os condutores
  async index(req, res) {
    try {
      const condutores = await Condutor.findAll();

      return res.json(condutores);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // Buscar condutor por ID
  async show(req, res) {
    try {
      const { id } = req.params;
      const condutor = await Condutor.findByPk(id);

      if (!condutor) {
        return res.status(404).json({ error: 'Condutor não encontrado' });
      }

      return res.json(condutor);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // Atualizar condutor
  async update(req, res) {
    try {
      const { id } = req.params;

      const condutor = await Condutor.findByPk(id);
      if (!condutor) {
        return res.status(404).json({ error: 'Condutor não encontrado' });
      }

      const {
        nome,
        telefone,
        email,
        bi,
        num_carta,
        data_validade_carta
      } = req.body;

      // Se novos arquivos forem enviados, pega os nomes
      const file_bi = req.files?.file_bi ? req.files.file_bi[0].filename : condutor.file_bi;
      const file_carta = req.files?.file_carta ? req.files.file_carta[0].filename : condutor.file_carta;
      const foto = req.files?.foto ? req.files.foto[0].filename : condutor.foto;

      await condutor.update({
        nome,
        telefone,
        email,
        bi,
        num_carta,
        data_validade_carta,
        file_bi,
        file_carta,
        foto
      });

      return res.json(condutor);
    } catch (e) {
      if (e instanceof ValidationError) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message)
        });
      }
      return res.status(400).json({ error: e.message });
    }
  }

  // Deletar condutor
  /* async delete(req, res) {
    try {
      const { id } = req.params;

      const condutor = await Condutor.findByPk(id);
      if (!condutor) {
        return res.status(404).json({ error: 'Condutor não encontrado' });
      }

      await condutor.destroy();

      return res.json({ message: 'Condutor deletado com sucesso' });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  } */

  // Consultar bilhete pelo número do BI
  async consultarBilhete(req, res) {
    try {
      const { bi } = req.body;
      if (!bi) return res.status(400).json({ error: 'Informe o número do BI' });

      const condutor = await Condutor.findOne({ where: { bi } });
      if (!condutor || !condutor.file_bi) {
        return res.status(404).json({ error: 'Bilhete não encontrado' });
      }

      // Corrige para uploads/images
      const filePath = path.resolve('uploads', 'images', condutor.file_bi);

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Arquivo não encontrado no servidor' });
      }

      return res.sendFile(filePath);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // Consultar carta de condução pelo número
  async consultarCarta(req, res) {
    try {
      const { num_carta } = req.body;
      if (!num_carta) return res.status(400).json({ error: 'Informe o número da carta de condução' });

      const condutor = await Condutor.findOne({ where: { num_carta } });
      if (!condutor || !condutor.file_carta) {
        return res.status(404).json({ error: 'Carta de condução não encontrada' });
      }

      const filePath = path.resolve('uploads', 'images', condutor.file_carta);

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({
          error: `Arquivo não encontrado no servidor em ${filePath}`
        });
      }

      return res.sendFile(filePath);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
}

export default new CondutorController();
