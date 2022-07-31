const mongoose = require('mongoose');

const OrderModel = require('../model/OrderModel');
const CustomerModel = require('../model/CustomerModel');


// Khai báo API

//Create Order
const createOrderOfCustomer = (request, response) => {

    //B1:Thu thập dữ liệu
    let customerId = request.params.customerId;
    let bodyRequest = request.body;

    //B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Customer ID is not a valid"
        })
    }

    if (!(Number.isInteger(bodyRequest.cost) && bodyRequest.cost >= 0)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "cost is not a valid"
        })
    }

    //B3: Thao tác với cơ sở dữ liệu
    let newOrder = {
        _id: mongoose.Types.ObjectId(),
        orderDate: bodyRequest.orderDate,
        shippedDate: bodyRequest.shippedDate,
        note: bodyRequest.note,
        orderDetail: bodyRequest.orderDetail,
        cost: bodyRequest.cost
    }

    OrderModel.create(newOrder, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal sever Error",
                message: error.message
            })
        } else {
            CustomerModel.findByIdAndUpdate(customerId, {
                $push: { orders: data._id }
            },
                (error, updateCustomer) => {
                    if (error) {
                        return response.status(500).json({
                            status: "Error 500: Internal sever Error",
                            message: error.message
                        })
                    } else {
                        return response.status(201).json({
                            status: "Create Order Success",
                            data: data
                        })
                    }
                }
            )
        }
    })
}

const getCustomerByOrderId = (request, response) => {
    //B1 Chuẩn bị dữ liệu
    let orderId = request.params.orderId;
    //B2 Validate dữ liệu
    CustomerModel.find((error, customers) => {
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

//Get All Order
const getAllOrder = (request, response) => {
    //B1: Thu thập dữ liệu
    //B2: Validate dữ liệu
    //B3: Thao tác với cơ sở dữ liệu
    OrderModel.find((error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal sever Error",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Get All Order successfully",
                data: data
            })
        }
    })
}

//Get ALL Order Of Customer
const getAllOrderOfCustomer = (request, response) => {
    //B1: Thu thập dữ liệu
    let customerId = request.params.customerId;

    //B2: Validate dư liệu
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Customer ID is invalid"
        })
    }

    //B3: Thao tác với cơ sở dữ liệu
    CustomerModel.findById(customerId)
        .populate("orders")
        .exec((error, data) => {
            if (error) {
                return response.status(500).json({
                    status: "Error 500: Internal server error",
                    message: error.message
                })
            } else {
                return response.status(200).json({
                    status: "Get data success",
                    data: data.orders
                })
            }
        })
}

//Get Order By ID
const getOrderById = (request, response) => {

    //B1: Thu thập dữ liệu
    let orderId = request.params.orderId;

    //B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Order ID is not a valid"
        })
    }

    //B3: Thao tác với cơ sở dữ liệu
    OrderModel.findById(orderId, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal sever Error",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Get Order By ID successfully",
                data: data
            })
        }
    })
}


//Update Order
const updateOrder = (request, response) => {
    // B1: Thu thập dữ liệu
    let orderId = request.params.orderId;
    let bodyRequest = request.body;

    //B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Order ID is not a valid"
        })
    }

    //B3: Thao tác với cơ sở dữ liệu
    let OrderUpdate = {
        shippedDate: bodyRequest.shippedDate,
        note: bodyRequest.note,
        orderDetail: bodyRequest.orderDetail,
        cost: bodyRequest.cost
    }

    OrderModel.findByIdAndUpdate(orderId, OrderUpdate, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal sever Error",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Update Order successfully",
                data: data
            })
        }
    })

}


// Delete Order
const deleteOrderById = (request, response) => {
    //B1 Chuẩn bị dữ liệu
    let customerId = request.params.customerId;
    let orderId = request.params.orderId;
    //B2 Validate dữ liệu
    if (!(mongoose.Types.ObjectId.isValid(customerId))) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Course ID is not valid"
        })
    }
    if (!(mongoose.Types.ObjectId.isValid(orderId))) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Review ID is not valid"
        })
    }

    //B3: Thao tác với cơ sở dữ liệu
    OrderModel.findByIdAndDelete(orderId, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        }
        else {
            //Sau khi xóa xong 1 review khỏi collection cần xóa thêm orderId trong course đang chứa nó
            CustomerModel.findByIdAndUpdate(customerId,
                {
                    $pull: { orders: orderId }
                },
                (errore) => {
                    if (error) {
                        return response.status(500).json({
                            status: "Error 500: Internal server error",
                            message: error.message
                        })
                    }
                    else {
                        return response.status(204).json({
                            status: "Success: Delete review success",
                        })
                    }
                }
            )
        }
    })
}

module.exports = {
    createOrderOfCustomer,
    getCustomerByOrderId,
    getAllOrder,
    getAllOrderOfCustomer,
    getOrderById,
    updateOrder,
    deleteOrderById
}