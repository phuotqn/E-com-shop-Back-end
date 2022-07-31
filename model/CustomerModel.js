const mongoose = require('mongoose');

//Khai báo Schema từ thư viện mongoose
const Schema = mongoose.Schema;

//  Khởi tạo 1 schema với các thuộc tính được yêu cầu
const CustomerSchema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId
  },
  fullName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    default: ""
  },
  country: {
    type: String,
    default: ""
  },
  orders: [{
    type: mongoose.Types.ObjectId,
    ref: "Order",
  }],
  timeCreated: {
    type: Date,
    default: Date.now()
  },
  timeUpdated: {
    type: Date,
    default: Date.now()
  }
})

//Export
module.exports = mongoose.model("Customer", CustomerSchema)
