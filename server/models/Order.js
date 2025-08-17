// File: server/models/Order.js

const mongoose = require('mongoose');

// A sub-schema for the items within the order
const OrderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

// A sub-schema for the shipping address
const ShippingAddressSchema = new mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: String, required: true },
});

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
    // We now use the sub-schemas defined above
    orderItems: [OrderItemSchema],
    shippingAddress: ShippingAddressSchema,

    // The field name on the frontend is 'totalPrice', so we match that here
    totalPrice: { type: Number, required: true },
    
    status: { type: String, required: true, default: 'Pending' },
  },
  {
    timestamps: true, // This automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Order', OrderSchema);
