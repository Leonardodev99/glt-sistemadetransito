import { Router } from 'express';
import authMiddleware from '../middlewares/auth';
import MultaController from '../controllers/MultaController';

const router = Router();

router.post('/', authMiddleware, (req, res, next) => {
  if (req.user.type !== 'agente') {
    return res.status(403).json({ error: 'Apenas agentes podem realizar esta ação' });
  }
  return MultaController.store(req, res, next);
});
router.get('/', authMiddleware, (req, res, next) => {
  if (req.user.type !== 'admin') {
    return res.status(403).json({ error: 'Apenas administradores podem realizar esta ação' });
  }
  return MultaController.index(req, res, next);
});
router.get('/:id', authMiddleware, MultaController.show);
router.put('/:id', authMiddleware, (req, res, next) => {
  if (req.user.type !== 'agente') {
    return res.status(403).json({ error: 'Apenas agentes podem realizar esta ação' });
  }
  return MultaController.update(req, res, next);
});
// router.delete('/:id', MultaController.delete);

export default router;
