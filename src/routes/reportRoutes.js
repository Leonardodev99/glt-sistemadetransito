import { Router } from 'express';
import authMiddleware from '../middlewares/auth';
import ReportController from '../controllers/ReportController';

const router = Router();

router.get('/multas-resumo', authMiddleware, (req, res, next) => {
  if (req.user.type !== 'admin') {
    return res.status(403).json({ error: 'Apenas administradores podem realizar esta ação' });
  }
  return ReportController.multasResumo(req, res, next);
});
router.get('/infracoes-comuns', authMiddleware, (req, res, next) => {
  if (req.user.type !== 'admin') {
    return res.status(403).json({ error: 'Apenas administradores podem realizar esta ação' });
  }
  return ReportController.infracoesComuns(req, res, next);
});
router.get('/desempenho-agentes', authMiddleware, (req, res, next) => {
  if (req.user.type !== 'admin') {
    return res.status(403).json({ error: 'Apenas administradores podem realizar esta ação' });
  }
  return ReportController.desempenhoAgentes(req, res, next);
});
router.get('/estatisticas-geo', authMiddleware, (req, res, next) => {
  if (req.user.type !== 'admin') {
    return res.status(403).json({ error: 'Apenas administradores podem realizar esta ação' });
  }
  return ReportController.estatisticasGeograficas(req, res, next);
});

export default router;
