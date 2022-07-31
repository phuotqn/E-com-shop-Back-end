const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId
  },
  orderDate: {
    type: Date,
    default: Date.now()
  },
  shippedDate: {
    type: Date,
  },
  note: {
    type: String,
    required: false
  },
  orderDetail: {
    type: Array
  },
  cost: {
    type: Number,
    default: 0,
  },
  timeCreated: {
    type: Date,
    default: Date.now()
  },
  timeUpdated: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Order', OrderSchema);
