const express = require('express');
const router = express.Router();

// Registro
router.post('/register', (req, res) => {
  res.json({ message: 'Registro a funcionar' });
});

// Login
router.post('/login', (req, res) => {
  res.json({ message: 'Login a funcionar' });
});

module.exports = router;