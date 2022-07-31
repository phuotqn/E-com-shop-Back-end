const mongoose = require("mongoose");

//Khai báo Schema từ thư viện mongoose
const Schema = mongoose.Schema;

//  Khởi tạo 1 schema với các thuộc tính được yêu cầu
const ProductTypeSchema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
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
module.exports = mongoose.model("type", ProductTypeSchema);
