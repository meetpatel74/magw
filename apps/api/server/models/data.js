// models/data.js
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// In a real application, this would be replaced with database connections
// For this lab, we'll use in-memory data with JSON files as persistence

// Load data from JSON files
const loadData = (filename) => {
  try {
    const filePath = path.join(__dirname, '../data', filename);
    
    // Check if file exists, if not create it with empty array
    if (!fs.existsSync(filePath)) {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(filePath, JSON.stringify({ [filename.split('.')[0]]: [] }));
      return [];
    }
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return data[filename.split('.')[0]] || [];
  } catch (error) {
    console.error(`Error loading data from ${filename}:`, error);
    return [];
  }
};

// Save data to JSON file
const saveData = (filename, data) => {
  try {
    const filePath = path.join(__dirname, '../data', filename);
    const dir = path.dirname(filePath);
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    const key = filename.split('.')[0];
    fs.writeFileSync(filePath, JSON.stringify({ [key]: data }, null, 2));
    return true;
  } catch (error) {
    console.error(`Error saving data to ${filename}:`, error);
    return false;
  }
};

// Exhibition model
const exhibitions = {
  getAll: () => loadData('exhibitions.json'),
  
  getById: (id) => {
    const all = loadData('exhibitions.json');
    return all.find(exhibition => exhibition.id === id);
  },
  
  create: (exhibition) => {
    const all = loadData('exhibitions.json');
    const newExhibition = {
      ...exhibition,
      id: uuidv4()
    };
    all.push(newExhibition);
    saveData('exhibitions.json', all);
    return newExhibition;
  },
  
  update: (id, exhibition) => {
    const all = loadData('exhibitions.json');
    const index = all.findIndex(item => item.id === id);
    
    if (index === -1) return null;
    
    const updated = { ...all[index], ...exhibition, id };
    all[index] = updated;
    saveData('exhibitions.json', all);
    return updated;
  },
  
  delete: (id) => {
    const all = loadData('exhibitions.json');
    const index = all.findIndex(item => item.id === id);
    
    if (index === -1) return false;
    
    all.splice(index, 1);
    saveData('exhibitions.json', all);
    return true;
  }
};

// Artwork model
const artworks = {
  getAll: () => loadData('artworks.json'),
  
  getById: (id) => {
    const all = loadData('artworks.json');
    return all.find(artwork => artwork.id === id);
  },
  
  getByExhibitionId: (exhibitionId) => {
    const all = loadData('artworks.json');
    return all.filter(artwork => artwork.exhibitionId === exhibitionId);
  },
  
  create: (artwork) => {
    const all = loadData('artworks.json');
    const newArtwork = {
      ...artwork,
      id: uuidv4()
    };
    all.push(newArtwork);
    saveData('artworks.json', all);
    return newArtwork;
  },
  
  update: (id, artwork) => {
    const all = loadData('artworks.json');
    const index = all.findIndex(item => item.id === id);
    
    if (index === -1) return null;
    
    const updated = { ...all[index], ...artwork, id };
    all[index] = updated;
    saveData('artworks.json', all);
    return updated;
  },
  
  delete: (id) => {
    const all = loadData('artworks.json');
    const index = all.findIndex(item => item.id === id);
    
    if (index === -1) return false;
    
    all.splice(index, 1);
    saveData('artworks.json', all);
    return true;
  }
};

// User model
const users = {
  getAll: () => loadData('users.json'),
  
  getById: (id) => {
    const all = loadData('users.json');
    return all.find(user => user.id === id);
  },
  
  getByEmail: (email) => {
    const all = loadData('users.json');
    return all.find(user => user.email === email);
  },
  
  create: (user) => {
    const all = loadData('users.json');
    const newUser = {
      ...user,
      id: uuidv4()
    };
    all.push(newUser);
    saveData('users.json', all);
    return newUser;
  },
  
  update: (id, user) => {
    const all = loadData('users.json');
    const index = all.findIndex(item => item.id === id);
    
    if (index === -1) return null;
    
    const updated = { ...all[index], ...user, id };
    all[index] = updated;
    saveData('users.json', all);
    return updated;
  },
  
  delete: (id) => {
    const all = loadData('users.json');
    const index = all.findIndex(item => item.id === id);
    
    if (index === -1) return false;
    
    all.splice(index, 1);
    saveData('users.json', all);
    return true;
  }
};

module.exports = {
  exhibitions,
  artworks,
  users
};