import { Router } from 'express';
import CondutorController from '../controllers/CondutorController';
import upload from '../middlewares/upload';

const router = new Router();

router.post('/', upload.fields([
  { name: 'file_bi', maxCount: 1 },
  { name: 'file_carta', maxCount: 1 },
  { name: 'foto', maxCount: 1 }
]), CondutorController.store);
router.get('/', CondutorController.index);
router.get('/:id', CondutorController.show);

router.put('/:id', upload.fields([
  { name: 'file_bi', maxCount: 1 },
  { name: 'file_carta', maxCount: 1 },
  { name: 'foto', maxCount: 1 }
]), CondutorController.update);

router.delete('/:id', CondutorController.delete);

router.post('/consultar-bi', CondutorController.consultarBilhete);

router.post('/consultar-carta', CondutorController.consultarCarta);

export default router;
