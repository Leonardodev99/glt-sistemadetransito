import { Router } from 'express';
import ReportController from '../controllers/ReportController';

const router = Router();

router.get('/multas-resumo', ReportController.multasResumo);
router.get('/infracoes-comuns', ReportController.infracoesComuns);
router.get('/desempenho-agentes', ReportController.desempenhoAgentes);
router.get('/estatisticas-geo', ReportController.estatisticasGeograficas);

export default router;
