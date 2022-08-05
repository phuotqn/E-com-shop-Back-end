//B1: Import mongooseJS
const mongoose = require('mongoose');

//B2:  Khai baos Schema từ thư viện mongoose
const Schema = mongoose.Schema;

//B3: Khởi tạo 1 schema với các thuộc tính được yêu cầu
const reviewSchema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId
    },
    fullName: {
        type: String,
        required: true,
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
        ref: "Order"
    }
    ],
    ngayTao: {
        type: Date,
        default: Date.now()
    },
    ngayCapNhat: {
        type: Date,
        default: Date.now()
    }

})

//B4: Export ra 1 model nhờ schema vừa khai báo
module.exports = mongoose.model("Customer", reviewSchema)
