const mongoose = require('mongoose');

// Turns Decimal128 values into plain strings like "57.00"
const convert = (v) => {
  if (v instanceof mongoose.Types.Decimal128) return v.toString();
  if (Array.isArray(v)) return v.map(convert);
  if (v && typeof v === 'object' && v.constructor === Object) {
    for (const k of Object.keys(v)) v[k] = convert(v[k]);
  }
  return v;
};

exports.jsonTransform = (_doc, ret) => {
  delete ret.__v;
  return convert(ret);
};