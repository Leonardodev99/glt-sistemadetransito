import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin';
import Agente from '../models/Agente';

class TokenController {
  async store(req, res) {
    try {
      const { email = '', senha = '' } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
      }

      // 🔍 Procurar Admin (inclui senha_hash)
      let user = await Admin.scope(null).findOne({
        where: { email },
        attributes: ['id_admin', 'nome', 'email', 'senha_hash'],
        raw: true
      });
      let userType = 'admin';

      if (!user) {
        // 🔍 Procurar Agente (inclui senha_hash)
        user = await Agente.scope(null).findOne({
          where: { email },
          attributes: ['id_agente', 'nome', 'email', 'senha_hash'],
          raw: true
        });
        userType = 'agente';
      }

      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }

      // ✅ Validar senha
      const senhaValida = await bcrypt.compare(senha, user.senha_hash);
      if (!senhaValida) {
        return res.status(401).json({ error: 'Senha inválida' });
      }

      // 🔑 Gerar token
      const token = jwt.sign(
        { id: userType === 'admin' ? user.id_admin : user.id_agente, type: userType },
        process.env.TOKEN_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRATION }
      );

      return res.json({
        user: {
          id: userType === 'admin' ? user.id_admin : user.id_agente,
          nome: user.nome,
          email: user.email,
          type: userType
        },
        token
      });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
}

export default new TokenController();
