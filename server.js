const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const usuariosRoutes = require('./routes/usuarios');
const vagasRoutes = require('./routes/vagas');
const Usuario = require('./models/usuario');
const { authenticateToken } = require('./middlewares/authenticateToken');
const usuarioRepository = require('./repositories/usuarioRepository');

const app = express();
const SECRET_KEY = process.env.SECRET_KEY || 'seu_segredo_super_secreto';
app.use(bodyParser.json());

// Rota de registro usando o repository de usuario
app.post('/api/register', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const hashedPassword = await bcrypt.hash(senha, 10);

    const newUser = await usuarioRepository.create({
      nome,
      email,
      senha: hashedPassword,
    });

    res.status(201).json({ message: 'Usuário criado com sucesso', user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota de login
app.post('/api/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await usuarioRepository.findByEmail(email);
    if (!user || !bcrypt.compareSync(senha, user.senha)) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sincronizar o banco de dados
sequelize.sync().then(() => {
  console.log('Database synchronized');
}).catch(err => {
  console.error('Unable to synchronize the database:', err);
});

// Usar as rotas importadas
app.use('/api/usuarios', authenticateToken, usuariosRoutes);
app.use('/api/vagas', authenticateToken, vagasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});