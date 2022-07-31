//Khai báo thư viện express
const express = require('express');


//Import Middleware
const {ProductTypeMiddleware} = require('../middleware/ProductTypeMiddleware');

//Khai báo router
const ProductTypeRouter= express.Router();

//Sử dụng Middleware
ProductTypeRouter.use(ProductTypeMiddleware)

//Sử dụng controller
const {createProductType, getAllProductTypes,getProductTypeByID,updateProductTypes,deleteProductTypes} = require('../controller/ProductTypeController');


//KHAI BÁO API

// Create ProductType
ProductTypeRouter.post('/producttypes',createProductType);


//Get All Product Types
ProductTypeRouter.get('/producttypes', getAllProductTypes);

// Get Product Type By ID
ProductTypeRouter.get('/producttypes/:productTypeId', getProductTypeByID);


//Update Product Type
ProductTypeRouter.put('/producttypes/:productTypeId',updateProductTypes);

//Delete Product Type
ProductTypeRouter.delete('/producttypes/:productTypeId',deleteProductTypes);

module.exports = ProductTypeRouter;