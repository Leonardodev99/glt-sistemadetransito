import { Router } from 'express';
import MultaController from '../controllers/MultaController';

const router = Router();

router.post('/', MultaController.store);
router.get('/', MultaController.index);
router.get('/:id', MultaController.show);
router.put('/:id', MultaController.update);
router.delete('/:id', MultaController.delete);

export default router;
