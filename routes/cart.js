const express = require('express');
const router = express.Router();

let cart = [];

// GET /cart
router.get('/', (_req, res) => {
  res.json({ cart });
});

// POST /cart  { "productId": 1, "quantity": 2 }
router.post('/', (req, res) => {
  const { productId, quantity } = req.body || {};
  if (!productId || !quantity) {
    return res.status(400).json({ error: 'productId and quantity required' });
  }
  cart.push({ productId, quantity });
  res.status(201).json({ message: 'Added to cart', cart });
});

// DELETE /cart
router.delete('/', (_req, res) => {
  cart = [];
  res.json({ message: 'Cart cleared' });
});

module.exports = router;

