const mongoose = require("mongoose");

const wishSchema = new mongoose.Schema({
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }],
  cartUUID: { type: String, required: true },
});

module.exports = mongoose.model('Wishlist', wishSchema);