const mongoose = require('mongoose');
const User = require('../models/User');
const Merchant = require('../models/Merchant');
const Product = require('../models/Product');

(async () => {
  const user = new User({
    name: 'Test User',
    username: 'TestUser',
    email: 'T@Example.com',
    whatsapp_number: '+254712345678',
    country: 'ke',
  });
  await user.validate();
  console.log('User OK:', user.username, user.email, user.country, user.roles);

  try {
    await new User({ name: 'X', username: 'a', email: 'x@x.com', whatsapp_number: '0712345678', country: 'KE' }).validate();
  } catch (e) {
    console.log('Bad user correctly rejected:', Object.keys(e.errors).join(', '));
  }

  const m = new Merchant({ business_name: 'SupaMart Grocers', address: 'Moi Avenue, Nairobi' });
  await m.validate();
  console.log('Merchant OK:', m.business_name, m.category, m.kyb_status);

  const p = new Product({
    merchant_id: m._id,
    name: 'Fresh Milk (500ml)',
    price: mongoose.Types.Decimal128.fromString('57.00'),
    category: 'Dairy',
    stock_qty: 40,
  });
  await p.validate();
  const json = p.toJSON();
  console.log('Product price in JSON:', json.price, typeof json.price);
})().catch((e) => { console.log('ERR', e.message); process.exit(1); });