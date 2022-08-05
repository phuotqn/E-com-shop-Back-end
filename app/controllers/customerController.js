// Import course model vao controller
const customerModel = require("../models/customerModel");
const orderModel = require("../models/orderModel");

// Import mongooseJS
const mongoose = require("mongoose");

const createCustomer = (request, response) => {
    //B1: Thu thập dữ liệu
    var bodyRequest = request.body;
    console.log(bodyRequest);
    //B2: Kiểm tra dữ liệu
    if (!bodyRequest.fullName) {
        response.status(400).json({
            status: "Error 400: Bad Request",
            message: "fullName is required"
        })
    }
    if (!bodyRequest.phone) {
        response.status(400).json({
            status: "Error 400: Bad Request",
            message: "phone is required"
        })
    }
    if (!bodyRequest.email) {
        response.status(400).json({
            status: "Error 400: Bad Request",
            message: "email is required"
        })
    }
    if (!bodyRequest.address) {
        response.status(400).json({
            status: "Error 400: Bad Request",
            message: "address is required"
        })
    }
    //Thao tác với cơ sở dữ liệu
    let createcustomer = {
        _id: mongoose.Types.ObjectId(),
        fullName: bodyRequest.fullName,
        phone: bodyRequest.phone,
        email: bodyRequest.email,
        address: bodyRequest.address,
        city: bodyRequest.city,
        country: bodyRequest.country
    }

    customerModel.create(createcustomer, (error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        }
        else {
            response.status(201).json({
                status: "Success: customer Created",
                data: data
            })
        }
    })

}

const getAllCustomer = (request, response) => {
    var { phone} = request.query;

    const condition = {}

    if (phone) {
        const regex = new RegExp(`${phone}`)
        condition.phone = regex
    }
    //B1 Chuẩn bị dữ liệu
    //B2 Validate dữ liệu
    //B3 Thao tác với cơ sỡ dữ liệu
    customerModel.find(condition)
        .populate("orders")
        .exec((error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        }
        else {
            response.status(202).json({
                status: "Success: Get customers sucess",
                data: data
            })
        }
    })
}

const getCustomerById = (request, response) => {
    //B1 Chuẩn bị dữ liệu
    let customerId = request.params.customerId;
    //B2 Validate dữ liệu
    if (!(mongoose.Types.ObjectId.isValid(customerId))) {
        response.status(400).json({
            status: "Error 400: Bad Request",
            message: "customer ID is not valid"
        })
    }
    //B3 Thao tác với cơ sỡ dữ liệu
    customerModel.findById(customerId, (error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        }
        else {
            response.status(200).json({
                status: "Success: Get customers sucess",
                data: data
            })
        }
    })
}
const getCustomerByPhone = (request, response) => {
    //B1 Chuẩn bị dữ liệu
    var bodyRequest = request.body;
    //B2 Validate dữ liệu
    //B3 Thao tác với cơ sỡ dữ liệu
    customerModel.findOne({phone: bodyRequest.phone}, (error, phoneExist) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        }
        else {
            if(!phoneExist){ 
                //Không tìm được số điện thoại trong hệ thống
                //Tạo customer mới
                customerModel.create({
                    _id: mongoose.Types.ObjectId(),
                    fullName: bodyRequest.fullName,
                    phone: bodyRequest.phone,
                    email: bodyRequest.email,
                    address: bodyRequest.address,
                    city: bodyRequest.city,
                    country: bodyRequest.country
                }, (error, dataNewCustomer) => {
                    if (error) {
                        response.status(500).json({
                            status: "Error 500: Internal server error",
                            message: error.message
                        })
                    }
                    else {
                        orderModel.create({
                            _id: mongoose.Types.ObjectId(),
                            shippedDate: bodyRequest.shippedDate,
                            note: bodyRequest.note,
                            orderDetail: bodyRequest.orderDetail,
                            cost: bodyRequest.cost
                        }, (error, data) => {
                            if (error) {
                                return response.status(500).json({
                                    status: "Error 500: Internal server error",
                                    message: error.message
                                })
                            }
                            else {
                                customerModel.findByIdAndUpdate(dataNewCustomer._id,
                                    {
                                        $push: { orders: data._id },
                                    },
                                    (error, ) => {
                                        if (error) {
                                            return response.status(500).json({
                                                status: "Error 500: Internal server error",
                                                message: error.message
                                            })
                                        }
                                        else {
                                            return response.status(201).json({
                                                status: "Create Order Of customer",
                                                data: data
                                            })
                                        }
                                    }
                                )
                            }
                        })
                    }
                })
            }
            else {
                //Nếu tồn tại hệ thống
                orderModel.create({
                    _id: mongoose.Types.ObjectId(),
                    shippedDate: bodyRequest.shippedDate,
                    note: bodyRequest.note,
                    orderDetail: bodyRequest.orderDetail,
                    cost: bodyRequest.cost
                }, (error, data) => {
                    if (error) {
                        return response.status(500).json({
                            status: "Error 500: Internal server error",
                            message: error.message
                        })
                    }
                    else {
                        customerModel.findByIdAndUpdate(phoneExist._id,
                            {
                                $push: { orders: data._id },
                            },
                            (error, ) => {
                                if (error) {
                                    return response.status(500).json({
                                        status: "Error 500: Internal server error",
                                        message: error.message
                                    })
                                }
                                else {
                                    return response.status(201).json({
                                        status: "Create Order Of customer",
                                        data: data
                                    })
                                }
                            }
                        )
                    }
                })
            }
        }
    })
}

const updateCustomerById = (request, response) => {
    //B1 Chuẩn bị dữ liệu
    let customerId = request.params.customerId;
    var bodyRequest = request.body;
    //B2 Validate dữ liệu
    if (!(mongoose.Types.ObjectId.isValid(customerId))) {
        response.status(400).json({
            status: "Error 400: Bad Request",
            message: "customer ID is not valid"
        })
    }
    //B3 Thao tác với cơ sỡ dữ liệu
    let customerUpdate = {
        fullName: bodyRequest.fullName,
        phone: bodyRequest.phone,
        email: bodyRequest.email,
        address: bodyRequest.address,
        city: bodyRequest.city,
        country: bodyRequest.country
    }
    customerModel.findByIdAndUpdate(customerId, customerUpdate, (error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        }
        else {
            response.status(201).json({
                status: "Success: Update customer success",
                data: data
            })
        }
    })
}

const deleteCustomerById = (request, response) => {
    //B1 Chuẩn bị dữ liệu
    let customerId = request.params.customerId;
    //B2 Validate dữ liệu
    if (!(mongoose.Types.ObjectId.isValid(customerId))) {
        response.status(400).json({
            status: "Error 400: Bad Request",
            message: "customer ID is not valid"
        })
    }
    //B3 Thao tác với cơ sỡ dữ liệu
    customerModel.findByIdAndDelete(customerId, (error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        }
        else {
            response.status(204).json({
                status: "Success: Delete customers sucess",
            })
        }
    })
}
module.exports = {
    createCustomer: createCustomer,
    getAllCustomer: getAllCustomer,
    getCustomerById: getCustomerById,
    updateCustomerById: updateCustomerById,
    deleteCustomerById: deleteCustomerById,
    getCustomerByPhone: getCustomerByPhone
}