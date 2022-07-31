//Khai báo thư viện express
const express = require('express');


//Import Middleware
const {ProductMiddleware} = require('../middleware/ProductMiddleware');

//Khai báo router
const ProductRouter= express.Router();

//Sử dụng Middleware
ProductRouter.use(ProductMiddleware)

//Sử dụng controller
const {createProduct, getAllProduct,getProductByID,updateProduct,deleteProduct} = require('../controller/ProductController');


//KHAI BÁO API

// Create Product
ProductRouter.post('/products',createProduct);


//Get All Product s
ProductRouter.get('/products', getAllProduct);

// Get Product  By ID
ProductRouter.get('/products/:productId', getProductByID);


//Update Product
ProductRouter.put('/products/:productId',updateProduct);

//Delete Product
ProductRouter.delete('/products/:productId',deleteProduct);

module.exports = ProductRouter;