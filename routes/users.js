const express = require('express');
const router = express.Router();
const userRepository = require('../repositories/userRepository');

// Get all users
router.get('/', (req, res) => {
  res.json({ users: userRepository.findAll() });
});

// Get user by id
router.get('/:id', (req, res) => {
  const user = userRepository.findById(req.params.id);
  if (user) {
    res.json({ user });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Create a new user
router.post('/', (req, res) => {
  const user = userRepository.create(req.body);
  res.json({ user });
});

// Update a user
router.put('/:id', (req, res) => {
  const user = userRepository.update(req.params.id, req.body);
  if (user) {
    res.json({ user });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Delete a user
router.delete('/:id', (req, res) => {
  const user = userRepository.remove(req.params.id);
  if (user) {
    res.json({ user });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

module.exports = router;
