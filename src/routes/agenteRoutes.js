import { Router } from 'express';
import authMiddleware from '../middlewares/auth';
import AgenteController from '../controllers/AgenteController';

const router = new Router();

// Rotas CRUD
router.post('/', authMiddleware, AgenteController.store);

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

router.get('/ver-perfil', authMiddleware, AgenteController.verPerfil);

router.get('/perfil-update', authMiddleware, AgenteController.profileUpdate);

router.put('/:id', authMiddleware, (req, res, next) => {
  if (req.user.type !== 'admin') {
    return res.status(403).json({ error: 'Apenas administradores podem realizar esta ação' });
  }
  return AgenteController.update(req, res, next);
});

// router.delete('/:id', AgenteController.delete);

export default router;
