import { Router } from 'express';
import authMiddleware from '../middlewares/auth';
import OcorrenciaController from '../controllers/OcorrenciaController';

const routes = new Router();

routes.post('/', authMiddleware, (req, res, next) => {
  if (req.user.type !== 'agente') {
    return res.status(403).json({ error: 'Apenas agentes podem realizar esta ação' });
  }
  return OcorrenciaController.store(req, res, next);
});

routes.get('/', authMiddleware, (req, res, next) => {
  if (req.user.type !== 'admin') {
    return res.status(403).json({ error: 'Apenas administradores podem realizar esta ação' });
  }
  return OcorrenciaController.index(req, res, next);
});

routes.get('/:id', authMiddleware, OcorrenciaController.show);
routes.put('/:id', authMiddleware, (req, res, next) => {
  if (req.user.type !== 'agente') {
    return res.status(403).json({ error: 'Apenas agentes podem realizar esta ação' });
  }
  return OcorrenciaController.update(req, res, next);
});
// routes.delete('/:id', OcorrenciaController.delete);

export default routes;
