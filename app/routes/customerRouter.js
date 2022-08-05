
const express = require("express");

const router = express.Router();
const { createCustomer, getAllCustomer, getCustomerById, updateCustomerById, deleteCustomerById, getCustomerByPhone} = require("../controllers/customerController")

router.get("/customers", getAllCustomer);

router.post("/customers", createCustomer);

router.get("/customers/:customerId", getCustomerById)

router.put("/customers/:customerId", updateCustomerById)

router.delete("/customers/:customerId", deleteCustomerById)

router.post("/customers/phone", getCustomerByPhone)

//Export dữ liệu thành 1 module
module.exports = router;