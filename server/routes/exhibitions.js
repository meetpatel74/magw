// routes/exhibitions.js
const express = require('express');
const router = express.Router();
const { exhibitionSchema } = require('../validation/schemas');
const { exhibitions, artworks } = require('../models/data');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Get all exhibitions
router.get('/', (req, res) => {
  let results = exhibitions.getAll();
  
  // Filter by type
  if (req.query.type) {
    results = results.filter(exhibition => exhibition.type === req.query.type);
  }
  
  // Filter by current
  if (req.query.current) {
    const isCurrentBool = req.query.current === 'true';
    results = results.filter(exhibition => exhibition.isCurrent === isCurrentBool);
  }
  
  // Filter by upcoming
  if (req.query.upcoming) {
    const isUpcomingBool = req.query.upcoming === 'true';
    results = results.filter(exhibition => exhibition.isUpcoming === isUpcomingBool);
  }
  
  res.json(results);
});

// Get exhibition by ID
router.get('/:id', (req, res) => {
  const exhibition = exhibitions.getById(req.params.id);
  
  if (!exhibition) {
    return res.status(404).json({ message: 'Exhibition not found' });
  }
  
  res.json(exhibition);
});

// Get artworks by exhibition ID
router.get('/:id/artworks', (req, res) => {
  const exhibition = exhibitions.getById(req.params.id);
  
  if (!exhibition) {
    return res.status(404).json({ message: 'Exhibition not found' });
  }
  
  const exhibitionArtworks = artworks.getByExhibitionId(req.params.id);
  res.json(exhibitionArtworks);
});

// Create new exhibition (protected route)
router.post('/', authenticateToken, authorizeRoles('admin', 'staff'), (req, res, next) => {
  try {
    // Validate request body
    const { error, value } = exhibitionSchema.validate(req.body);
    if (error) {
      error.status = 400;
      return next(error);
    }
    
    // Create exhibition
    const newExhibition = exhibitions.create(value);
    res.status(201).json(newExhibition);
  } catch (error) {
    next(error);
  }
});

// Update exhibition (protected route)
router.put('/:id', authenticateToken, authorizeRoles('admin', 'staff'), (req, res, next) => {
  try {
    // Check if exhibition exists
    const existing = exhibitions.getById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: 'Exhibition not found' });
    }
    
    // Validate request body
    const { error, value } = exhibitionSchema.validate(req.body);
    if (error) {
      error.status = 400;
      return next(error);
    }
    
    // Update exhibition
    const updated = exhibitions.update(req.params.id, value);
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

// Delete exhibition (protected route)
router.delete('/:id', authenticateToken, authorizeRoles('admin'), (req, res, next) => {
  try {
    // Check if exhibition exists
    const existing = exhibitions.getById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: 'Exhibition not found' });
    }
    
    // Delete exhibition
    exhibitions.delete(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;