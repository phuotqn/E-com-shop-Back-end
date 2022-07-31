//Khai báo thư viện express
const express = require('express');


//Import Middleware
const { OrderMiddleware } = require('../middleware/OrderMiddleware');

//Khai báo router
const OrderRouter = express.Router();

//Sử dụng Middleware
OrderRouter.use(OrderMiddleware)

//Sử dụng controller
const { createOrderOfCustomer, getCustomerByOrderId, getAllOrder, getAllOrderOfCustomer, getOrderById, updateOrder, deleteOrderById } = require('../controller/OrderController');

//KHAI BÁO API

//CREATE

// Create Order Of Customer
OrderRouter.post('/customers/:customerId/orders', createOrderOfCustomer);

//Get ALL
OrderRouter.get('/orders', getAllOrder);


// Get All Order Of Customer
OrderRouter.get('/customers/:customerId/orders', getAllOrderOfCustomer);

//Get Customer by orderID
OrderRouter.get('/orders/customers/:orderId', getCustomerByOrderId);

//Get Order BY ID
OrderRouter.get('/orders/:orderId', getOrderById);


//Update Order
OrderRouter.put('/orders/:orderId', updateOrder)


// Delete Order by ID
OrderRouter.delete("/customers/:customerId/orders/:orderId", deleteOrderById)

module.exports = OrderRouter;