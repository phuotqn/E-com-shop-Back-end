
const express = require("express");

const router = express.Router();
const { createProductType, getAllProductType, getProductTypeById, updateProductTypeById, deleteProductTypeById } = require("../controllers/productTypeController")

router.get("/productTypes", getAllProductType);

router.post("/productTypes", createProductType);

router.get("/productTypes/:productTypeId", getProductTypeById)

router.put("/productTypes/:productTypeId", updateProductTypeById)

router.delete("/productTypes/:productTypeId", deleteProductTypeById)

//Export dữ liệu thành 1 module
module.exports = router;