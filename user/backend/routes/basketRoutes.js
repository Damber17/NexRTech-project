// Basket routes
const express = require('express');
const mongoose = require('mongoose');
const Basket = require('../models/Basket');

const router = express.Router();

// Create a basket
router.post('/', async (req, res) => {
  try {
    const {
      basket_name,
      user_id,
      merchant_id,
      recipient_id,
      currency,
    } = req.body;

    if (!basket_name || !user_id || !merchant_id || !recipient_id || !currency) {
      return res.status(400).json({
        success: false,
        message: 'basket_name, user_id, merchant_id, recipient_id, and currency are required',
      });
    }

    const basket = await Basket.create({
      basket_name,
      user_id,
      merchant_id,
      recipient_id,
      currency,
    });

    return res.status(201).json({
      success: true,
      message: 'Basket created',
      basket,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Could not create basket',
      error: error.message,
    });
  }
});

// Retrieve one basket by its ID
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid basket ID',
      });
    }

    const basket = await Basket.findById(req.params.id);

    if (!basket) {
      return res.status(404).json({
        success: false,
        message: 'Basket not found',
      });
    }

    return res.json({
      success: true,
      basket,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Could not retrieve basket',
      error: error.message,
    });
  }
});

module.exports = router;