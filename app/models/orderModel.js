//B1: Import mongooseJS
const mongoose = require('mongoose');

//B2:  Khai baos Schema từ thư viện mongoose
const Schema = mongoose.Schema;

//B3: Khởi tạo 1 schema với các thuộc tính được yêu cầu
const reviewSchema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId
    },
    orderDate: {
        type: Date,
        default: Date.now()
    },
    shippedDate: {
        type: Date
    },
    note: {
        type: String,
        required: false
    },
    orderDetail: {
        type: Array,
    },
    cost: {
        type: Number,
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
module.exports = mongoose.model("Order", reviewSchema)
