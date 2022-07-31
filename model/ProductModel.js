const mongoose = require("mongoose");

//Khai báo Schema từ thư viện mongoose
const Schema = mongoose.Schema;

//  Khởi tạo 1 schema với các thuộc tính được yêu cầu
const ProductSchema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId,
  },
  name: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
  type: {
    type: mongoose.Types.ObjectId,
    ref: "type",
  },
  imageUrl: {
    type: String,
    required: true,
  },
  buyPrice: {
    type: Number,
    required: true,
  },
  promotionPrice: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    default: 0,
  },
  timeCreated: {
    type: Date,
    default: Date.now(),
  },
  timeUpdated: {
    type: Date,
    default: Date.now(),
  },
});

//Export
module.exports = mongoose.model("product", ProductSchema);
