import { Router } from 'express';
import VeiculoController from '../controllers/VeiculoController';

const router = new Router();

// Rotas CRUD para Veículos
router.post('/', VeiculoController.store); // Criar veículo
router.get('/', VeiculoController.index); // Listar todos
router.get('/:id', VeiculoController.show); // Buscar por ID
router.put('/:id', VeiculoController.update); // Atualizar
router.delete('/:id', VeiculoController.delete); // Deletar

export default router;
