const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Product');

const router = express.Router();

// GET /api/products
// Optional filters: ?category=Groceries or ?merchant_id=<id>
router.get('/', async (req, res) => {
  try {
    const filter = { is_active: true };

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.merchant_id) {
      if (!mongoose.isValidObjectId(req.query.merchant_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid merchant ID',
          error: { code: 'INVALID_MERCHANT_ID' },
        });
      }

      filter.merchant_id = req.query.merchant_id;
    }

    const products = await Product.find(filter).sort({ name: 1 }).lean();

    return res.json({
      success: true,
      message: 'Products retrieved successfully',
      products: products.map((product) => ({
        ...product,
        price: product.price.toString(),
      })),
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: 'Could not retrieve products',
      error: { code: 'PRODUCTS_FETCH_FAILED' },
    });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID',
        error: { code: 'INVALID_PRODUCT_ID' },
      });
    }

    const product = await Product.findOne({
      _id: req.params.id,
      is_active: true,
    }).lean();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
        error: { code: 'PRODUCT_NOT_FOUND' },
      });
    }

    return res.json({
      success: true,
      message: 'Product retrieved successfully',
      product: {
        ...product,
        price: product.price.toString(),
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: 'Could not retrieve product',
      error: { code: 'PRODUCT_FETCH_FAILED' },
    });
  }
});

module.exports = router;