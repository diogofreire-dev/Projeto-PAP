const express = require('express');
const router = express.Router();

// Enviar mensagem
router.post('/:cloneId', (req, res) => {
  res.json({ response: 'Olá! Sou o teu clone virtual.' });
});

module.exports = router;