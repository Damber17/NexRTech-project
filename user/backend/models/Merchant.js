const mongoose = require('mongoose');
const { jsonTransform } = require('../utils/decimal');

const merchantSchema = new mongoose.Schema(
  {
    business_name: { type: String, required: true, trim: true },
    business_registration_no: { type: String, default: '' },
    category: { type: String, default: 'Groceries' },
    image: { type: String, default: null },
    address: { type: String, required: true, trim: true },
    country: { type: String, default: 'KE', uppercase: true },
    location: {
      lat: { type: Number, default: null },
      lng: { type: Number, default: null },
    },
    owner_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    mobile_money_account: {
      provider: { type: String, default: 'mpesa' },
      phone_number: { type: String, default: '' },
      account_name: { type: String, default: '' },
      country: { type: String, default: 'KE' },
    },
    payout_currency: { type: String, default: 'KES' },
    kyb_status: { type: String, enum: ['pending', 'verified', 'failed'], default: 'pending' },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true, toJSON: { transform: jsonTransform } }
);

module.exports = mongoose.model('Merchant', merchantSchema);