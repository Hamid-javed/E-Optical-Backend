const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  productName: { type: String },
  rightCYL: { type: Number },
  rightSPH: { type: Number },
  rightAxis: { type: Number },
  leftCYL: { type: Number },
  leftSPH: { type: Number },
  leftAxis: { type: Number },
  lens: { type: String },
});

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    default: 1,
    required: true
  },
  message: messageSchema,
});

const cartSchema = new mongoose.Schema({
  items: [cartItemSchema],
  cartUUID: { type: String, required: true },
  totalProduct: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Cart', cartSchema);
