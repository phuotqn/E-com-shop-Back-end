const mongoose = require('mongoose');

const ProductTypeModel = require('../model/ProductTypeModel');


// KHAI BÁO API

//Create API
const createProductType = (request, response) => {

    //B1: Thu thập dữ liệu
    let bodyRequest = request.body;

    //B2: Validate dữ liệu
    if (!bodyRequest.name) {
        return response.status(400).json({
            status: 'Error 400: Bad Request ',
            message: 'Name is required'
        })
    }

    //B3: Thao tác với cơ sở dữ liệu
    let ProductTypeCreate = {
        _id: mongoose.Types.ObjectId(),
        name: bodyRequest.name,
        description: bodyRequest.description
    }

    ProductTypeModel.create(ProductTypeCreate, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: 'Error 500: Internal sever Error',
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Create Product Type successfully",
                data: data
            })
        }
    })
}


// Get All
const getAllProductTypes = (request, response) => {
    //B1: Thu thập dữ liệu
    //B2: Validate dữ liệu
    //B3: Thao tác với cơ sở dữ liệu
    ProductTypeModel.find((error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal sever Error",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Get All Product Types successfully",
                data: data
            })
        }
    })
}

//Get By ID
const getProductTypeByID = (request, response) => {
    //B1: Thu thập dữ liệu
    let productTypeId = request.params.productTypeId;

    //B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(productTypeId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Product type ID is not a valid"
        })
    }

    //B3: Thao tác với cơ sở dữ liệu
    ProductTypeModel.findById(productTypeId, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Bad Request",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Get Product Types By ID successfully",
                data: data
            })
        }
    })
}


//Update Product Types
const updateProductTypes = (request, response) => {
    //B1: Thu thập dữ liệu
    let bodyRequest = request.body;
    let productTypeId = request.params.productTypeId;

    //B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(productTypeId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Product type ID is not a valid"
        })
    }

    //B3: Thao tác với cơ sở dữ liệu
    let ProductTypeUpdate = {
        name: bodyRequest.name,
        description: bodyRequest.description
    }

    ProductTypeModel.findByIdAndUpdate(productTypeId,ProductTypeUpdate,(error, data)=>{
        if (error) {
            return response.status(500).json({
                status: "Error 500: Bad Request",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Get Product Types By ID successfully",
                data: data
            })
        }
    })
}

//Delete Product Types
const deleteProductTypes = (request, response)=>{
     //B1: Thu thập dữ liệu
    let productTypeId = request.params.productTypeId;

    //B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(productTypeId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Product type ID is not a valid"
        })
    }

    //B3: Thao tác với cơ sở dữ liệu
    ProductTypeModel.findByIdAndDelete(productTypeId, (error, data)=>{
        if (error) {
            return response.status(500).json({
                status: "Error 500: Bad Request",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Get Product Types By ID successfully",
            })
        }
    })
}

module.exports = { createProductType, getAllProductTypes, getProductTypeByID ,updateProductTypes,deleteProductTypes}