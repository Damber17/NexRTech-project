const mongoose = require('mongoose');
const { jsonTransform } = require('../utils/decimal');

const productSchema = new mongoose.Schema(
  {
    merchant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Merchant',
      required: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
    unit_label: { type: String, default: null },
    description: { type: String, default: '' },
    price: { type: mongoose.Schema.Types.Decimal128, required: true },
    currency: { type: String, default: 'KES', uppercase: true },
    stock_qty: { type: Number, required: true, min: 0, default: 0 },
    category: { type: String, required: true },
    product_image: { type: String, default: null },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true, toJSON: { transform: jsonTransform } }
);

module.exports = mongoose.model('Product', productSchema);