const mongoose = require('mongoose');

const CustomerModel = require('../model/CustomerModel');
const OrderModel = require('../model/OrderModel');

// KHAI BÁO API

//Create Customer By Phone
const createCustomerByPhone = (request, response) => {
    //B1 Chuẩn bị dữ liệu
    var bodyRequest = request.body;
    //B2 Validate dữ liệu
    //B3 Thao tác với cơ sỡ dữ liệu
    CustomerModel.findOne({ phone: bodyRequest.phone }, (error, phoneExist) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        }
        else {
            if (!phoneExist) {
                //Không tìm được số điện thoại trong hệ thống
                //Tạo customer mới
                CustomerModel.create({
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
                        OrderModel.create({
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
                                CustomerModel.findByIdAndUpdate(dataNewCustomer._id,
                                    {
                                        $push: { orders: data._id },
                                    },
                                    (error,) => {
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
                OrderModel.create({
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
                        CustomerModel.findByIdAndUpdate(phoneExist._id,
                            {
                                $push: { orders: data._id },
                            },
                            (error,) => {
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

//Create API
const createCustomer = (request, response) => {

    //B1: Thu thập dữ liệu
    let bodyRequest = request.body;

    //B2: Validate dữ liệu
    if (!bodyRequest.fullName) {
        return response.status(400).json({
            status: 'Error 400: Bad Request ',
            message: 'fullName is required'
        })
    }

    if (!bodyRequest.phone) {
        return response.status(400).json({
            status: 'Error 400: Bad Request ',
            message: 'phone is required'
        })
    }

    if (!bodyRequest.email) {
        return response.status(400).json({
            status: 'Error 400: Bad Request ',
            message: 'email is required'
        })
    }


    //B3: Thao tác với cơ sở dữ liệu
    let CustomerCreate = {
        _id: mongoose.Types.ObjectId(),
        fullName: bodyRequest.fullName,
        phone: bodyRequest.phone,
        email: bodyRequest.email,
        address: bodyRequest.address,
        city: bodyRequest.city,
        country: bodyRequest.country,
    }

    CustomerModel.create(CustomerCreate, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: 'Error 500: Internal sever Error',
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Create Customer  successfully",
                data: data
            })
        }
    })
}

// Get All
const getAllCustomer = (request, response) => {
    //B1: Thu thập dữ liệu
    //B2: Validate dữ liệu
    //B3: Thao tác với cơ sở dữ liệu
    CustomerModel.find((error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal sever Error",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Get All Customer successfully",
                data: data
            })
        }
    })
}

//Get By ID
const getCustomerByID = (request, response) => {
    //B1: Thu thập dữ liệu
    let customerId = request.params.customerId;

    //B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Customer ID is not a valid"
        })
    }

    //B3: Thao tác với cơ sở dữ liệu
    CustomerModel.findById(customerId, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Bad Request",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Get Customer By ID successfully",
                data: data
            })
        }
    })
}

//Update Product Types
const updateCustomer = (request, response) => {
    //B1: Thu thập dữ liệu
    let bodyRequest = request.body;
    let customerId = request.params.customerId;

    //B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Customer ID is not a valid"
        })
    }

    //B3: Thao tác với cơ sở dữ liệu
    let CustomerUpdate = {
        fullName: bodyRequest.fullName,
        phone: bodyRequest.phone,
        email: bodyRequest.email,
        address: bodyRequest.address,
        city: bodyRequest.city,
        country: bodyRequest.country,
    }

    CustomerModel.findByIdAndUpdate(customerId, CustomerUpdate, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Bad Request",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Get Customer By ID successfully",
                data: data
            })
        }
    })
}

//Delete Product Types
const deleteCustomer = (request, response) => {
    //B1: Thu thập dữ liệu
    let customerId = request.params.customerId;

    //B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Customer ID is not a valid"
        })
    }

    //B3: Thao tác với cơ sở dữ liệu
    CustomerModel.findByIdAndDelete(customerId, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Bad Request",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Get Customer By ID successfully",
            })
        }
    })
}

module.exports = { createCustomerByPhone, createCustomer, getAllCustomer, getCustomerByID, updateCustomer, deleteCustomer }