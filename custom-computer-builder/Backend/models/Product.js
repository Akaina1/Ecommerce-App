const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stockQuantity: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String
  },
  onSale: {
    type: Boolean,
    default: false
  }
});

module.exports = Product = mongoose.model('products', ProductSchema);