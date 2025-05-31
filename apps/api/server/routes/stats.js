const express = require("express");
const router = express.Router();
const { users, artworks } = require("../models/data");

// GET /api/v1/stats/users/by-role
router.get("/users/by-role", (req, res) => {
  const allUsers = users.getAll();
  const roleCounts = allUsers.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});
  res.json(roleCounts);
});

// GET /api/v1/stats/artworks/by-year
router.get("/artworks/by-year", (req, res) => {
  const allArtworks = artworks.getAll();
  const yearCounts = allArtworks.reduce((acc, artwork) => {
    // Try to parse year as string (e.g., '2023')
    const year = artwork.year;
    if (year) {
      acc[year] = (acc[year] || 0) + 1;
    }
    return acc;
  }, {});
  res.json(yearCounts);
});

module.exports = router;
