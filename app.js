const express = require('express');
const path = require('path');

const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');
const paymentsRouter = require('./routes/payments');

const app = express();

// ❗ Intentional pitfall: wrong-case env var (PORT vs port)
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ❗ Intentional pitfall: wrong case in folder name ('Public' vs 'public')
app.use(express.static(path.join(__dirname, 'public')));

// API routes
// ❗ Intentional pitfall: mounted under /product (singular) instead of /products
app.use('/products', productsRouter);
app.use('/cart', cartRouter);
app.use('/payments', paymentsRouter);

// Default route
//app.get('/', (req, res) => {
//  res.sendFile(path.join(__dirname, 'public', 'index.html'));
//});

// Start server
app.listen(PORT, () => {
  console.log(`[BOOT] NODE_ENV=${process.env.NODE_ENV || 'development'}`);
  console.log(`[BOOT] Listening on :${PORT}`);
});

