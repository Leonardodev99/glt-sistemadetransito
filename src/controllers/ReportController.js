import {
  Op, fn, col, literal
} from 'sequelize';
import Multa from '../models/Multa';
import Ocorrencia from '../models/Ocorrencia';
import Agente from '../models/Agente';

function buildDateFilter(startDate, endDate) {
  const where = {};
  if (startDate && endDate) {
    where.data_hora = { [Op.between]: [new Date(startDate), new Date(endDate)] };
  } else if (startDate) {
    where.data_hora = { [Op.gte]: new Date(startDate) };
  } else if (endDate) {
    where.data_hora = { [Op.lte]: new Date(endDate) };
  }
  return where;
}

class ReportController {
  // 1) Multas aplicadas: resumo por categoria + totais
  async multasResumo(req, res) {
    try {
      const { start_date, end_date } = req.query;
      const whereOc = buildDateFilter(start_date, end_date);

      const rows = await Multa.findAll({
        attributes: [
          'categoria',
          [fn('COUNT', col('Multa.id_multa')), 'qtd_multas'],
          [fn('SUM', col('Multa.valor_kz')), 'valor_total_kz']
        ],
        include: [
          {
            model: Ocorrencia,
            as: 'ocorrencia',
            attributes: [],
            required: true,
            where: whereOc
          }
        ],
        group: ['categoria'],
        order: [[literal('valor_total_kz'), 'DESC']],
        raw: true
      });

      const totais = await Multa.findAll({
        attributes: [
          [fn('COUNT', col('Multa.id_multa')), 'qtd_multas_total'],
          [fn('SUM', col('Multa.valor_kz')), 'valor_total_kz']
        ],
        include: [
          {
            model: Ocorrencia,
            as: 'ocorrencia',
            attributes: [],
            required: true,
            where: whereOc
          }
        ],
        raw: true
      });

      return res.json({
        periodo: { start_date, end_date },
        por_categoria: rows,
        totais: totais[0] || { qtd_multas_total: 0, valor_total_kz: 0 }
      });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // 2) Infrações mais comuns (top N por tipo)
  async infracoesComuns(req, res) {
    try {
      const { start_date, end_date, limit = 10 } = req.query;
      const whereOc = buildDateFilter(start_date, end_date);

      const rows = await Ocorrencia.findAll({
        attributes: [
          'tipo',
          [fn('COUNT', col('Ocorrencia.id_ocorrencia')), 'qtd']
        ],
        where: whereOc,
        group: ['tipo'],
        order: [[literal('qtd'), 'DESC']],
        limit: Number(limit),
        raw: true
      });

      return res.json({
        periodo: { start_date, end_date },
        top: rows
      });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // 3) Desempenho dos agentes
  async desempenhoAgentes(req, res) {
    try {
      const { start_date, end_date, id_agente } = req.query;
      const whereOc = buildDateFilter(start_date, end_date);
      if (id_agente) whereOc.id_agente = id_agente;

      const rows = await Multa.findAll({
        attributes: [
          [col('ocorrencia->agente.id_agente'), 'id_agente'],
          [col('ocorrencia->agente.nome'), 'agente_nome'],
          [fn('COUNT', col('Multa.id_multa')), 'qtd_multas'],
          [fn('SUM', col('Multa.valor_kz')), 'valor_total_kz']
        ],
        include: [
          {
            model: Ocorrencia,
            as: 'ocorrencia',
            attributes: [],
            required: true,
            where: whereOc,
            include: [
              {
                model: Agente, as: 'agente', attributes: [], required: true
              }
            ]
          }
        ],
        group: ['ocorrencia->agente.id_agente', 'ocorrencia->agente.nome'],
        order: [[literal('qtd_multas'), 'DESC']],
        raw: true
      });

      return res.json({
        periodo: { start_date, end_date },
        filtros: { id_agente: id_agente || null },
        por_agente: rows
      });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // 4) Estatísticas por localização
  async estatisticasGeograficas(req, res) {
    try {
      const { start_date, end_date, limit = 20 } = req.query;
      const whereOc = buildDateFilter(start_date, end_date);

      const rows = await Multa.findAll({
        attributes: [
          [col('ocorrencia.localizacao'), 'localizacao'],
          [fn('COUNT', col('Multa.id_multa')), 'qtd_ocorrencias'],
          [fn('SUM', col('Multa.valor_kz')), 'valor_total_kz']
        ],
        include: [
          {
            model: Ocorrencia,
            as: 'ocorrencia',
            attributes: [],
            required: true,
            where: whereOc
          }
        ],
        group: ['ocorrencia.localizacao'],
        order: [[literal('qtd_ocorrencias'), 'DESC']],
        limit: Number(limit),
        raw: true
      });

      return res.json({
        periodo: { start_date, end_date },
        por_localizacao: rows
      });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
}

export default new ReportController();
