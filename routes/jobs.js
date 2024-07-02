const express = require('express');
const router = express.Router();
const jobRepository = require('../repositories/jobRepository');

// Get all jobs
router.get('/', (req, res) => {
  res.json({ jobs: jobRepository.findAll() });
});

// Get job by id
router.get('/:id', (req, res) => {
  const job = jobRepository.findById(req.params.id);
  if (job) {
    res.json({ job });
  } else {
    res.status(404).json({ error: 'Job not found' });
  }
});

// Create a new job
router.post('/', (req, res) => {
  const job = jobRepository.create(req.body);
  res.json({ job });
});

// Update a job
router.put('/:id', (req, res) => {
  const job = jobRepository.update(req.params.id, req.body);
  if (job) {
    res.json({ job });
  } else {
    res.status(404).json({ error: 'Job not found' });
  }
});

// Delete a job
router.delete('/:id', (req, res) => {
  const job = jobRepository.remove(req.params.id);
  if (job) {
    res.json({ job });
  } else {
    res.status(404).json({ error: 'Job not found' });
  }
});

module.exports = router; // Certifique-se de exportar o router
