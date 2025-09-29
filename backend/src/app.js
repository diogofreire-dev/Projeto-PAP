const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'Clone Virtual API a funcionar!' });
});

// Rotas principais (adicionar depois)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/clones', require('./routes/clones'));
app.use('/api/chat', require('./routes/chat'));

app.listen(PORT, () => {
  console.log(`Servidor na porta ${PORT}`);
});