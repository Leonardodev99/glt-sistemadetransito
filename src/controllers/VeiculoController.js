import { ValidationError } from 'sequelize';
import path from 'path';
import fs from 'fs';
import Veiculo from '../models/Veiculo';
import Condutor from '../models/Condutor';

class VeiculoController {
  // Criar novo veículo
  async store(req, res) {
    try {
      const {
        matricula,
        num_livrete,
        marca,
        modelo,
        cor,
        id_condutor
      } = req.body;

      const file_livrete = req.files?.file_livrete
        ? req.files.file_livrete[0].filename
        : null;

      const veiculo = await Veiculo.create({
        matricula,
        num_livrete,
        marca,
        modelo,
        cor,
        id_condutor,
        file_livrete
      });

      return res.status(201).json(veiculo);
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

  // Listar todos os veículos
  async index(req, res) {
    try {
      const veiculos = await Veiculo.findAll({
        attributes: [
          'id_veiculo',
          'matricula',
          'num_livrete',
          'marca',
          'modelo',
          'cor',
          'id_condutor',
          'created_at',
          'updated_at'
        ],
        include: [
          {
            model: Condutor,
            as: 'condutor',
            attributes: ['id_condutor', 'nome', 'telefone', 'email']
          }
        ]
      });

      return res.json(veiculos);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // Buscar veículo por ID
  async show(req, res) {
    try {
      const { id } = req.params;

      const veiculo = await Veiculo.findByPk(id, {
        attributes: [
          'id_veiculo',
          'matricula',
          'num_livrete',
          'marca',
          'modelo',
          'cor',
          'id_condutor',
          'created_at',
          'updated_at'
        ],
        include: [
          {
            model: Condutor,
            as: 'condutor',
            attributes: ['id_condutor', 'nome', 'telefone', 'email']
          }
        ]
      });

      if (!veiculo) {
        return res.status(404).json({ error: 'Veículo não encontrado' });
      }

      return res.json(veiculo);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // Atualizar veículo
  // Atualizar veículo
  async update(req, res) {
    try {
      const { id } = req.params;

      const veiculo = await Veiculo.findByPk(id);
      if (!veiculo) {
        return res.status(404).json({ error: 'Veículo não encontrado' });
      }

      // Se não vier body, inicializa como objeto vazio
      const {
        matricula,
        num_livrete,
        marca,
        modelo,
        cor,
        id_condutor
      } = req.body || {};

      // Atualiza apenas file_livrete se for enviado
      const file_livrete = req.files?.file_livrete
        ? req.files.file_livrete[0].filename
        : veiculo.file_livrete;
      console.log('Arquivo recebido:', req.files);
      console.log('file_livrete:', file_livrete);

      await veiculo.update({
        matricula: matricula ?? veiculo.matricula,
        num_livrete: num_livrete ?? veiculo.num_livrete,
        marca: marca ?? veiculo.marca,
        modelo: modelo ?? veiculo.modelo,
        cor: cor ?? veiculo.cor,
        id_condutor: id_condutor ?? veiculo.id_condutor,
        file_livrete
      });

      return res.json(veiculo);
    } catch (e) {
      if (e instanceof ValidationError) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message)
        });
      }
      return res.status(400).json({ error: e.message });
    }
  }

  // Deletar veículo
  async delete(req, res) {
    try {
      const { id } = req.params;

      const veiculo = await Veiculo.findByPk(id);
      if (!veiculo) {
        return res.status(404).json({ error: 'Veículo não encontrado' });
      }

      await veiculo.destroy();

      return res.json({ message: 'Veículo deletado com sucesso' });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // Consultar livrete pela matrícula do veículo
  async consultarLivrete(req, res) {
    try {
      const { matricula } = req.body;
      if (!matricula) return res.status(400).json({ error: 'Informe a matrícula do veículo' });

      const veiculo = await Veiculo.findOne({ where: { matricula } });
      if (!veiculo || !veiculo.file_livrete) {
        return res.status(404).json({ error: 'Livrete não encontrado' });
      }

      const filePath = path.resolve('uploads', 'images', veiculo.file_livrete);

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

export default new VeiculoController();
