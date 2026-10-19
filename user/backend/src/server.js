const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../../../.env'),
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const productRoutes = require('../routes/productRoutes');
const basketRoutes = require('../routes/basketRoutes');
const { notFound, errorHandler } = require('../middleware/errorHandler');

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
app.use(morgan('dev'));

// The Stripe webhook route goes HERE later, BEFORE express.json()

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/baskets', basketRoutes);

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// These two must stay LAST
app.use(notFound);
app.use(errorHandler);

async function startServer() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is missing from the root .env file');
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer().catch((error) => {
  console.error('Could not start the server:', error.message);
  process.exit(1);
});