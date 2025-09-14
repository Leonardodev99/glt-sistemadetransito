import { Router } from 'express';
import TokenController from '../controllers/TokenController';

const router = new Router();

// Rota para login
router.post('/', TokenController.store);

export default router;
