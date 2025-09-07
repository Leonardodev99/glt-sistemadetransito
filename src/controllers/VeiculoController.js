import { ValidationError } from 'sequelize';
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

      const veiculo = await Veiculo.create({
        matricula,
        num_livrete,
        marca,
        modelo,
        cor,
        id_condutor
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
  async update(req, res) {
    try {
      const { id } = req.params;

      const veiculo = await Veiculo.findByPk(id);
      if (!veiculo) {
        return res.status(404).json({ error: 'Veículo não encontrado' });
      }

      const {
        matricula,
        num_livrete,
        marca,
        modelo,
        cor,
        id_condutor
      } = req.body;

      await veiculo.update({
        matricula,
        num_livrete,
        marca,
        modelo,
        cor,
        id_condutor
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
}

export default new VeiculoController();
