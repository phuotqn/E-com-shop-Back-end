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
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false 
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
module.exports = mongoose.model("ProductType", reviewSchema)
