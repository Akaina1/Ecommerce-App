const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BuildSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    parts: {
      CPU: {
        type: Schema.Types.ObjectId,
        ref: 'products'
        },
        GPU: {
            type: Schema.Types.ObjectId,
            ref: 'products'
        },
        RAM: {
            type: Schema.Types.ObjectId,
            ref: 'products'
        },
        MOBO: {
            type: Schema.Types.ObjectId,
            ref: 'products'
        },
        SSD: {
            type: Schema.Types.ObjectId,
            ref: 'products'
        },
        HDD: {
            type: Schema.Types.ObjectId,
            ref: 'products'
        },
        PSU: {
            type: Schema.Types.ObjectId,
            ref: 'products'
        },
        CASE: {
            type: Schema.Types.ObjectId,
            ref: 'products'
        },
        COOLING: {
            type: Schema.Types.ObjectId,
            ref: 'products'
        },
        FRONTFANS: {
            type: Schema.Types.ObjectId,
            ref: 'products'
        },
        BACKFANS: {
            type: Schema.Types.ObjectId,
            ref: 'products'
        }
    },
    totalPrice: {
      type: Number,
      required: true
    }
  });
  
  module.exports = Build = mongoose.model('builds', BuildSchema);  