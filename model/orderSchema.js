// const mongoose = require('mongoose');

// const messageSchema = new mongoose.Schema({
//   productName: { type: String },
//   right: { type: Number },
//   rightAxis: { type: Number },
//   left: { type: Number },
//   leftAxis: { type: Number }
// })

// const orderSchema = new mongoose.Schema({
//   products: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product',
//     required: true
//   }],
//   totalAmount: { type: Number, required: true },
//   items: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product',
//     required: true
//   }],
//   message: [messageSchema],
//   status: {
//     type: String,
//     enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
//     default: 'Pending',
//   },
//   paymentStatus: {
//     type: String,
//     enum: ['Paid', 'Pending', 'Refunded'],
//     default: 'Pending',
//   },
//   shippingAddress: {
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     email: { type: String, required: true },
//     number: { type: Number, required: true },
//     address: { type: String, required: true },
//     city: { type: String, required: true },
//     zip: { type: String, required: true },
//     country: { type: String, required: true },
//   },
//   trackingNumber: { type: String },

//   timestamps: true  // Automatically adds `createdAt` and `updatedAt`

// });

// orderSchema.pre('save', function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

// module.exports = mongoose.model('Order', orderSchema);

const mongoose = require('mongoose');

// Message schema
const messageSchema = new mongoose.Schema({
  productName: { type: String },
  right: { type: Number },
  rightAxis: { type: Number },
  left: { type: Number },
  leftAxis: { type: Number }
});

// Order schema
const orderSchema = new mongoose.Schema({
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }],
  totalAmount: { type: Number, required: true },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }],
  message: [messageSchema],  // message is an array of messages
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  paymentStatus: {
    type: String,
    enum: ['Paid', 'Pending', 'Refunded'],
    default: 'Pending',
  },
  shippingAddress: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
    },
    number: { type: Number, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
  },
  trackingNumber: { type: String },

}, { timestamps: true });  // Automatically adds `createdAt` and `updatedAt` fields

module.exports = mongoose.model('Order', orderSchema);
