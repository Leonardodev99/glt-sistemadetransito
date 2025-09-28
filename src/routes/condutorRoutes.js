import { Router } from 'express';
import authMiddleware from '../middlewares/auth';
import CondutorController from '../controllers/CondutorController';
import upload from '../middlewares/upload';

const router = new Router();

router.post('/', upload.fields([
  { name: 'file_bi', maxCount: 1 },
  { name: 'file_carta', maxCount: 1 },
  { name: 'foto', maxCount: 1 }
]), authMiddleware, (req, res, next) => {
  if (req.user.type !== 'admin') {
    return res.status(403).json({ error: 'Apenas administradores podem realizar esta ação' });
  }
  return CondutorController.store(req, res, next);
});

router.get('/', authMiddleware, (req, res, next) => {
  if (req.user.type !== 'admin') {
    return res.status(403).json({ error: 'Apenas administradores podem realizar esta ação' });
  }
  return CondutorController.index(req, res, next);
});

router.get('/:id', authMiddleware, CondutorController.show);

router.put('/:id', upload.fields([
  { name: 'file_bi', maxCount: 1 },
  { name: 'file_carta', maxCount: 1 },
  { name: 'foto', maxCount: 1 }
]), authMiddleware, (req, res, next) => {
  if (req.user.type !== 'admin') {
    return res.status(403).json({ error: 'Apenas administradores podem realizar esta ação' });
  }
  return CondutorController.update(req, res, next);
});

// router.delete('/:id', CondutorController.delete);

router.post('/consultar-bi', authMiddleware, CondutorController.consultarBilhete);

router.post('/consultar-carta', authMiddleware, CondutorController.consultarCarta);

export default router;
