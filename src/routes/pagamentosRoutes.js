import { Router } from 'express';
import PagamentoController from '../controllers/PagamentoController';

const router = Router();

router.post('/', PagamentoController.store);
router.get('/', PagamentoController.index);
router.get('/:id', PagamentoController.show);
router.put('/:id', PagamentoController.update);
router.delete('/:id', PagamentoController.delete);

export default router;
