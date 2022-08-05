
const express = require("express");

const router = express.Router();

const {createOrderOfCustomer,getAllOrder, getAllOrderOfCustomer, getOrderById, updateOrderById, deleteOrderById, getCustomerByOrderId}= require("../controllers/orderController")

router.get("/orders", getAllOrder)

router.post("/customers/:customerId/orders", createOrderOfCustomer)

router.get("/customers/:customerId/orders", getAllOrderOfCustomer)

router.get("/orders/:orderId", getOrderById)

router.get("/orders/customers/:orderId", getCustomerByOrderId)

router.put("/orders/:orderId", updateOrderById)

// router.delete("/customers/:customerId/orders/:orderId", deleteOrderById)
router.delete("/orders/:orderId", deleteOrderById)

//Export dữ liệu thành 1 module
module.exports = router;