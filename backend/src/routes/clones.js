const express = require('express');
const router = express.Router();

// Listar clones
router.get('/', (req, res) => {
  res.json({ clones: [] });
});

// Criar clone
router.post('/', (req, res) => {
  res.json({ message: 'Clone criado' });
});

module.exports = router;