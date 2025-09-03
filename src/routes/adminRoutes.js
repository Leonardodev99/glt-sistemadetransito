import { Router } from 'express';
import AdminController from '../controllers/AdminController';

const router = Router();

// CRUD Admin
router.post('/', AdminController.store); // Criar admin
router.get('/', AdminController.index); // Listar admins
router.get('/:id', AdminController.show); // Buscar admin por ID
router.put('/:id', AdminController.update); // Atualizar admin
router.delete('/:id', AdminController.delete); // Deletar admin

export default router;
