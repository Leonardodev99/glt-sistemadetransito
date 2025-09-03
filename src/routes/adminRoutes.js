import { Router } from 'express';

import adminController from '../controllers/AdminController';

const router = new Router();

router.get('/admins/', adminController.index);

export default router;
