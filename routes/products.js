const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Load products from data file (sync for simplicity)
function loadProducts() {
  const dataPath = path.join(__dirname, '..', 'data', 'products.json');
  const raw = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(raw);
}

// GET /products (but remember in app.js it's mounted under /product)
router.get('/', (req, res) => {
  try {
    const products = loadProducts();
    res.json(products);
  } catch (err) {
    console.error('[ERROR] /products load failed:', err.message);
    res.status(500).json({ error: 'Failed to load products' });
  }
});

// GET /products/:id
router.get('/:id', (req, res) => {
  try {
    const products = loadProducts();
    const id = Number(req.params.id);
    const item = products.find(p => p.id === id);
    if (!item) return res.status(404).json({ error: 'Product not found' });
    res.json(item);
  } catch (err) {
    console.error('[ERROR] /products/:id failed:', err.message);
    res.status(500).json({ error: 'Failed to load product' });
  }
});

module.exports = router;

