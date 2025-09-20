import { Router } from 'express';
import authMiddleware from '../middlewares/auth';
import AdminController from '../controllers/AdminController';

const router = Router();

// CRUD Admin
router.post('/', AdminController.store); // Criar admin
// router.get('/', AdminController.index); Listar admins
router.get('/:id', authMiddleware, (req, res, next) => {
  if (req.user.type !== 'admin') {
    return res.status(403).json({ error: 'Apenas administradores podem realizar esta ação' });
  }
  return AdminController.show(req, res, next);
}); // Buscar admin por ID
router.put('/:id', authMiddleware, (req, res, next) => {
  if (req.user.type !== 'admin') {
    return res.status(403).json({ error: 'Apenas administradores podem realizar esta ação' });
  }
  return AdminController.update(req, res, next);
}); // Atualizar admin
// router.delete('/:id', AdminController.delete); // Deletar admin

export default router;
