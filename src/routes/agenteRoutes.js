import { Router } from 'express';
import AgenteController from '../controllers/AgenteController';

const router = new Router();

// Rotas CRUD
router.post('/', AgenteController.store);
router.get('/', AgenteController.index);
router.get('/:id', AgenteController.show);
router.put('/:id', AgenteController.update);
router.delete('/:id', AgenteController.delete);

export default router;
