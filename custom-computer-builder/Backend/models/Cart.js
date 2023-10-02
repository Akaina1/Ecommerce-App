const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'products'
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ]
  });
  
  module.exports = Cart = mongoose.model('carts', CartSchema);  