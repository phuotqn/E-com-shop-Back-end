// Import course model vao controller
const customerModel = require("../models/customerModel");
const orderModel = require("../models/orderModel");


// Import mongooseJS
const mongoose = require("mongoose");

const createOrderOfCustomer = (request, response) => {
    //B1 Chuẩn bị dữ liệu
    let customerId = request.params.customerId;
    let requestBody = request.body;

    console.log(requestBody);
    //B2 Validate dữ liệu
    if (!(mongoose.Types.ObjectId.isValid(customerId))) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "customer ID is not valid"
        })
    }
    if (!requestBody.cost) {
        response.status(400).json({
            status: "Error 400: Bad Request",
            message: "cost is required"
        })
    }
    //B3 Thao tác với cơ sỡ dữ liệu
    //drinkModel.findById(requestBody.drink, (error, data) => { console.log(data.tenNuocUong) })
    let orderInput = {
        _id: mongoose.Types.ObjectId(),
        shippedDate: requestBody.shippedDate,
        note: requestBody.note,
        orderDetail: requestBody.orderDetail,
        cost: requestBody.cost
    }
    orderModel.create(orderInput, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        }
        else {
            customerModel.findByIdAndUpdate(customerId,
                {
                    $push: { orders: data._id },
                },
                (error, data) => {
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

const getAllOrder = (request, response) => {
    //B1 Chuẩn bị dữ liệu
    //B2 Validate dữ liệu
    //B3 Thao tác với cơ sỡ dữ liệu
    orderModel.find((error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        }
        else {
            response.status(202).json({
                status: "Success: Get product sucess",
                data: data
            })
        }
    })
}

const getAllOrderOfCustomer = (request, response) => {
    //B1 Chuẩn bị dữ liệu
    let customerId = request.params.customerId;
    //B2 Validate dữ liệu
    if (!(mongoose.Types.ObjectId.isValid(customerId))) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "customer ID is not valid"
        })
    }
    //B3 Thao tác với cơ sỡ dữ liệu
    customerModel.findById(customerId)
        .populate("orders")
        .exec((error, data) => {
            if (error) {
                return response.status(500).json({
                    status: "Error 500: Internal server error",
                    message: error.message
                })
            }
            else {
                return response.status(200).json({
                    status: "Get data success",
                    data: data.orders
                })
            }
        })
}

const getOrderById = (request, response) => {
    //B1 Chuẩn bị dữ liệu
    let orderId = request.params.orderId;
    //B2 Validate dữ liệu
    if (!(mongoose.Types.ObjectId.isValid(orderId))) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Order ID is not valid"
        })
    }
    //B3 Thao tác với cơ sỡ dữ liệu
    orderModel.findById(orderId, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        }
        else {
            return response.status(200).json({
                status: "Success: Get order sucess",
                data: data
            })
        }
    })
}

const updateOrderById = (request, response) => {
    //B1 Chuẩn bị dữ liệu
    let orderId = request.params.orderId;
    var requestBody = request.body;
    //B2 Validate dữ liệu
    if (!(mongoose.Types.ObjectId.isValid(orderId))) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Review ID is not valid"
        })
    }
    //B3 Thao tác với cơ sỡ dữ liệu
    let orderUpdate = {
        shippedDate: requestBody.shippedDate,
        note: requestBody.note,
        orderDetail: requestBody.orderDetail,
        cost: requestBody.cost
    }
    orderModel.findByIdAndUpdate(orderId, orderUpdate, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        }
        else {
            return response.status(201).json({
                status: "Success: Update order success",
                data: data
            })
        }
    })
}

const deleteOrderById = (request, response) => {
    //B1 Chuẩn bị dữ liệu
    let customerId = request.params.customerId;
    let orderId = request.params.orderId;
    //B2 Validate dữ liệu
    // if (!(mongoose.Types.ObjectId.isValid(customerId))) {
    //     return response.status(400).json({
    //         status: "Error 400: Bad Request",
    //         message: "Course ID is not valid"
    //     })
    // }
    if (!(mongoose.Types.ObjectId.isValid(orderId))) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Review ID is not valid"
        })
    }
    //B3 Thao tác với cơ sỡ dữ liệu
    orderModel.findByIdAndDelete(orderId, (error,data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        }
        else {
            return response.status(200).json({
                status: "Delete Order Success",
                data: data
            })
        }
    })
}
const getCustomerByOrderId = (request, response) => {
    //B1 Chuẩn bị dữ liệu
    let orderId = request.params.orderId;
    //B2 Validate dữ liệu
    customerModel.find((error, customers) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        }
        else {
            var i = 0;
            while (i < customers.length) {
                if (customers[i]) {
                    if (customers[i].orders == orderId) {
                        return response.status(200).json({
                            status: "Success: Find cus by order success",
                            data: customers[i]
                        })
                    }
                    else {
                        i++
                    }
                }
                else {
                    i++
                }
            }
        }
    })
}
module.exports = {
    createOrderOfCustomer: createOrderOfCustomer,
    getAllOrderOfCustomer: getAllOrderOfCustomer,
    getAllOrder: getAllOrder,
    getOrderById: getOrderById,
    updateOrderById: updateOrderById,
    deleteOrderById: deleteOrderById,
    getCustomerByOrderId: getCustomerByOrderId
}