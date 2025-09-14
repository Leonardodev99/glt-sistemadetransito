import { Router } from 'express';
import VeiculoController from '../controllers/VeiculoController';
import upload from '../middlewares/upload';

const router = new Router();

// Rotas CRUD para Veículos
router.post('/', upload.fields([
  { name: 'file_livrete', maxCount: 1 }
]), VeiculoController.store); // Criar veículo
router.get('/', VeiculoController.index); // Listar todos
router.get('/:id', VeiculoController.show); // Buscar por ID
router.put('/:id', upload.fields([
  { name: 'file_livrete', maxCount: 1 }
]), VeiculoController.update); // Atualizar
router.delete('/:id', VeiculoController.delete); // Deletar

export default router;
