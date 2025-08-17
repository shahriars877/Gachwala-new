const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Outdoor', 'Pure Indoor', 'Semi Indoor', 'Seeds', 'Soil & Fertilizers', 'Gardening accessories'],
    required: true 
  },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  isFeatured: { type: Boolean, default: false },
});

module.exports = mongoose.model('Product', ProductSchema);