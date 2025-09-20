import { Router } from 'express';
import authMiddleware from '../middlewares/auth';
import AgenteController from '../controllers/AgenteController';

const router = new Router();

// Rotas CRUD
router.post('/', authMiddleware, (req, res, next) => {
  if (req.user.type !== 'admin') {
    return res.status(403).json({ error: 'Apenas administradores podem realizar esta ação' });
  }
  return AgenteController.store(req, res, next);
});
router.get('/', authMiddleware, (req, res, next) => {
  if (req.user.type !== 'admin') {
    return res.status(403).json({ error: 'Apenas administradores podem realizar esta ação' });
  }
  return AgenteController.index(req, res, next);
});
router.get('/:id', authMiddleware, (req, res, next) => {
  if (req.user.type !== 'admin') {
    return res.status(403).json({ error: 'Apenas administradores podem realizar esta ação' });
  }
  return AgenteController.show(req, res, next);
});
router.put('/:id', AgenteController.update);
// router.delete('/:id', AgenteController.delete);

export default router;
