
const express = require("express");

const router = express.Router();
const { createProduct, getAllProduct, getProductById, updateProductById, deleteProductById } = require("../controllers/productController")

router.get("/products", getAllProduct);

router.post("/products", createProduct);

router.get("/products/:productId", getProductById)

router.put("/products/:productId", updateProductById)

router.delete("/products/:productId", deleteProductById)

//Export dữ liệu thành 1 module
module.exports = router;