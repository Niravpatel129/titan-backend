const mongoose = require('mongoose');

const readyOrders = new mongoose.Schema({
  shopifyOrderId: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['created', 'printed', 'shipped', 'complete'],
    default: 'created',
  },
});

const Item = mongoose.model('readyOrders', readyOrders);

module.exports = Item;
