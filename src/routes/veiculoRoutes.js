import { Router } from 'express';
import authMiddleware from '../middlewares/auth';
import VeiculoController from '../controllers/VeiculoController';
import upload from '../middlewares/upload';

const router = new Router();

// Rotas CRUD para Veículos
router.post('/', upload.fields([
  { name: 'file_livrete', maxCount: 1 }
]), authMiddleware, (req, res, next) => {
  if (req.user.type !== 'admin') {
    return res.status(403).json({ error: 'Apenas administradores podem realizar esta ação' });
  }
  return VeiculoController.store(req, res, next);
}); // Criar veículo

router.get('/', authMiddleware, (req, res, next) => {
  if (req.user.type !== 'admin') {
    return res.status(403).json({ error: 'Apenas administradores podem realizar esta ação' });
  }
  return VeiculoController.index(req, res, next);
}); // Listar todos

router.get('/:id', authMiddleware, VeiculoController.show); // Buscar por ID

router.put('/:id', upload.fields([
  { name: 'file_livrete', maxCount: 1 }
]), authMiddleware, (req, res, next) => {
  if (req.user.type !== 'admin') {
    return res.status(403).json({ error: 'Apenas administradores podem realizar esta ação' });
  }
  return VeiculoController.update(req, res, next);
}); // Atualizar

// router.delete('/:id', VeiculoController.delete); // Deletar

router.post('/consultar-veiculo', authMiddleware, VeiculoController.consultarLivrete); // COnsultar livrete do veículo

export default router;
