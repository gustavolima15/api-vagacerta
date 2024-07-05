const express = require('express');
const router = express.Router();
const jobRepository = require('../repositories/vagaRepository');

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await jobRepository.findAll();
    res.json({ jobs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get job by id
router.get('/:id', async (req, res) => {
  try {
    const job = await jobRepository.findById(req.params.id);
    if (job) {
      res.json({ job });
    } else {
      res.status(404).json({ error: 'Job not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new job
router.post('/', async (req, res) => {
  try {
    const job = await jobRepository.create(req.body);
    res.status(201).json({ job });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a job
router.put('/:id', async (req, res) => {
  try {
    const job = await jobRepository.update(req.params.id, req.body);
    if (job) {
      res.json({ job });
    } else {
      res.status(404).json({ error: 'Job not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a job
router.delete('/:id', async (req, res) => {
  try {
    const job = await jobRepository.remove(req.params.id);
    if (job) {
      res.json({ job });
    } else {
      res.status(404).json({ error: 'Job not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
