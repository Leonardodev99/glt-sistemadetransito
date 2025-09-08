import { Router } from 'express';
import OcorrenciaController from '../controllers/OcorrenciaController';

const routes = new Router();

routes.post('/', OcorrenciaController.store);
routes.get('/', OcorrenciaController.index);
routes.get('/:id', OcorrenciaController.show);
routes.put('/:id', OcorrenciaController.update);
routes.delete('/:id', OcorrenciaController.delete);

export default routes;
