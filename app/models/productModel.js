//B1: Import mongooseJS
const mongoose = require('mongoose');

//B2:  Khai baos Schema từ thư viện mongoose
const Schema = mongoose.Schema;

//B3: Khởi tạo 1 schema với các thuộc tính được yêu cầu
const reviewSchema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId
    },
    name: {
        type: String,
        unique: true
    },
    description: {
        type: String,
    },
    type: {
        type: mongoose.Types.ObjectId,
        ref: "ProductType"
    },
    imageUrl: {
        type: String,
        required: true
    },
    buyPrice: {
        type: Number,
        required: true
    },
    promotionPrice: {
        type: Number,
        required: true
    },
    amount: {
        type: String,
        default: 0
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

//B4: Export ra 1 model nhờ schema vừa khai báo
module.exports = mongoose.model("Product", reviewSchema)
