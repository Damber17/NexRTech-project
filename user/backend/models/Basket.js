const mongoose = require('mongoose');

const basketItemSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: { type: Number, required: true, min: 1 },
    unit_price: { type: mongoose.Schema.Types.Decimal128, required: true },
  },
  { _id: false }
);

const basketSchema = new mongoose.Schema(
  {
    basket_name: { type: String, required: true, trim: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    merchant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Merchant',
      required: true,
    },
    recipient_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['open', 'checked-out', 'abandoned'],
      default: 'open',
    },
    currency: { type: String, required: true, uppercase: true },
    total_amount: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
      default: () => mongoose.Types.Decimal128.fromString('0'),
    },
    items: { type: [basketItemSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Basket', basketSchema);