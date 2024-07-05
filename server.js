const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const userRoutes = require('./routes/usuarios');
const jobRoutes = require('./routes/vagas');

const app = express();
app.use(bodyParser.json());

// Sincronizar o banco de dados
sequelize.sync().then(() => {
  console.log('Database synchronized');
}).catch(err => {
  console.error('Unable to synchronize the database:', err);
});

// Usar as rotas importadas
app.use('/api/usuarios', userRoutes);
app.use('/api/vagas', jobRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
