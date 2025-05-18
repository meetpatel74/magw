// routes/artworks.js
const express = require('express');
const router = express.Router();
const { artworkSchema } = require('../validation/schemas');
const { artworks, exhibitions } = require('../models/data');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Get all artworks
router.get('/', (req, res) => {
  let results = artworks.getAll();
  
  // Filter by exhibition ID
  if (req.query.exhibitionId) {
    results = results.filter(artwork => artwork.exhibitionId === req.query.exhibitionId);
  }
  
  res.json(results);
});

// Get artwork by ID
router.get('/:id', (req, res) => {
  const artwork = artworks.getById(req.params.id);
  
  if (!artwork) {
    return res.status(404).json({ message: 'Artwork not found' });
  }
  
  res.json(artwork);
});

// Create new artwork (protected route)
router.post('/', authenticateToken, authorizeRoles('admin', 'staff'), (req, res, next) => {
  try {
    // Validate request body
    const { error, value } = artworkSchema.validate(req.body);
    if (error) {
      error.status = 400;
      return next(error);
    }
    
    // Check if exhibitionId exists (if provided)
    if (value.exhibitionId) {
      const exhibition = exhibitions.getById(value.exhibitionId);
      if (!exhibition) {
        return res.status(400).json({ message: 'Exhibition not found' });
      }
    }
    
    // Create artwork
    const newArtwork = artworks.create(value);
    res.status(201).json(newArtwork);
  } catch (error) {
    next(error);
  }
});

// Update artwork (protected route)
router.put('/:id', authenticateToken, authorizeRoles('admin', 'staff'), (req, res, next) => {
  try {
    // Check if artwork exists
    const existing = artworks.getById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: 'Artwork not found' });
    }
    
    // Validate request body
    const { error, value } = artworkSchema.validate(req.body);
    if (error) {
      error.status = 400;
      return next(error);
    }
    
    // Check if exhibitionId exists (if provided)
    if (value.exhibitionId) {
      const exhibition = exhibitions.getById(value.exhibitionId);
      if (!exhibition) {
        return res.status(400).json({ message: 'Exhibition not found' });
      }
    }
    
    // Update artwork
    const updated = artworks.update(req.params.id, value);
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

// Delete artwork (protected route)
router.delete('/:id', authenticateToken, authorizeRoles('admin'), (req, res, next) => {
  try {
    // Check if artwork exists
    const existing = artworks.getById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: 'Artwork not found' });
    }
    
    // Delete artwork
    artworks.delete(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;