//Khai báo thư viện express
const express = require('express');


//Import Middleware
const { CustomerMiddleware } = require('../middleware/CustomerMiddleware');

//Khai báo router
const CustomerRouter = express.Router();

//Sử dụng Middleware
CustomerRouter.use(CustomerMiddleware)

//Sử dụng controller
const { createCustomerByPhone, createCustomer, getAllCustomer, getCustomerByID, updateCustomer, deleteCustomer } = require('../controller/CustomerController');


//KHAI BÁO API
// Create Customer By Phone
CustomerRouter.post('/customers/phone', createCustomerByPhone);

// Create Customer
CustomerRouter.post('/customers', createCustomer);

//Get All Customer s
CustomerRouter.get('/customers', getAllCustomer);

// Get Customer  By ID
CustomerRouter.get('/customers/:customerId', getCustomerByID);


//Update Customer
CustomerRouter.put('/customers/:customerId', updateCustomer);

//Delete Customer
CustomerRouter.delete('/customers/:customerId', deleteCustomer);

module.exports = CustomerRouter;