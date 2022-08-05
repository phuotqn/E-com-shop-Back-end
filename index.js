//Câu lệnh này tương tự câu lệnh import express from 'express'; Dùng để import thư viện express vào project
const express = require("express");
var cors = require("cors");
var mongoose = require('mongoose');

//Import router
const productTypeRouter = require("./app/routes/productTypeRouter.js");
const productRouter = require("./app/routes/productRouter.js");
const customerRouter = require("./app/routes/customerRouter.js");
const orderRouter = require("./app/routes/orderRouter.js");

//Khởi tạo app express
const app = express();

const port = 8000;

//Khai báo middleware đọc json
app.use(express.json());

//Khai báo middleware đọc dữ liệu UTF-8
app.use(express.urlencoded({
    extended: true
}))
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

mongoose.connect("mongodb://localhost:27017/Shop_24h", (error) => {
    if (error) {
        throw error
    };
    console.log('Connect MongooDB successfully!');
})


app.use((request, response, next) => {
    console.log("Time", new Date());
    next();
})
app.use((request, response, next) => {
    console.log("Request method: ", request.method);
    next();
})

//Khai báo API dạng get "/" sẽ chạy vào đây
//Callback funtion
app.get("/", (request, response) => {
    let today = new Date();

    response.status(200).json({
        message: `Xin chào, hôm nay là ngày ${today.getDate()} tháng ${today.getMonth() + 1} năm ${today.getFullYear()}`
    })
})

app.use("/", productTypeRouter);
app.use("/", productRouter);
app.use("/", customerRouter);
app.use("/", orderRouter);

//Chạy app express
app.listen(port, () => {
    console.log("App listening on port (Ứng dụng đang chạy trên cổng): " + port)
})