const mongoose = require('mongoose');

// const cartItemSchema = new mongoose.Schema({

//   product: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product',
//     required: true
//   },
//   color: {
//     type: String,
//     required: true
//   },
//   size: {
//     type: String,
//     required: true
//   },
//   quantity: {
//     type: Number,
//     required: true,
//     min: 1
//   },
//   price: {
//     type: Number,
//     required: true
//   }
// });

const cartSchema = new mongoose.Schema({
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }],
  cartUUID: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  totalProduct: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Cart', cartSchema);
