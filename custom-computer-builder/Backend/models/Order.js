const OrderSchema = new Schema({
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
    ],
    status: {
      type: String,
      default: 'Pending'
    },
    paymentMethod: {
      type: String
    }
  });
  
  module.exports = Order = mongoose.model('orders', OrderSchema);  