import { Router } from 'express';
import authMiddleware from '../middlewares/auth';
import PagamentoController from '../controllers/PagamentoController';

const router = Router();

router.post('/', authMiddleware, (req, res, next) => {
  if (req.user.type !== 'agente') {
    return res.status(403).json({ error: 'Apenas agentes podem realizar esta ação' });
  }
  return PagamentoController.store(req, res, next);
});

router.get('/', authMiddleware, (req, res, next) => {
  if (req.user.type !== 'admin') {
    return res.status(403).json({ error: 'Apenas administradores podem realizar esta ação' });
  }
  return PagamentoController.index(req, res, next);
});
router.get('/:id', authMiddleware, PagamentoController.show);

router.put('/:id', authMiddleware, PagamentoController.update);
// router.delete('/:id', PagamentoController.delete);

export default router;
