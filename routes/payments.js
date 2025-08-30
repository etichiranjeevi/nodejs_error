const express = require('express');
const router = express.Router();

let payments = [];

// GET /payments
router.get('/', (_req, res) => {
  res.json({ payments });
});

// POST /payments  { "cartId": 1, "amount": 2000, "method": "card" }
router.post('/', (req, res) => {
  const { cartId, amount, method } = req.body || {};
  if (!cartId || !amount || !method) {
    return res.status(400).json({ error: 'cartId, amount, method required' });
  }
  const payment = {
    id: payments.length + 1,
    cartId,
    amount,
    method,
    status: 'success',
    ts: new Date().toISOString()
  };
  payments.push(payment);
  res.status(201).json({ message: 'Payment processed', payment });
});

// DELETE /payments
router.delete('/', (_req, res) => {
  payments = [];
  res.json({ message: 'Payments cleared' });
});

module.exports = router;

