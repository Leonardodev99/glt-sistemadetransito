import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    // 🔑 O token já tem { id, type } definido no TokenController
    req.user = {
      id: decoded.id,
      type: decoded.type // 'admin' ou 'agente'
    };

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};
