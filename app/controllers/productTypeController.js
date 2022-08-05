// Import productType model vao controller
const productTypeModel = require("../models/productTypeModel");

// Import mongooseJS
const mongoose = require("mongoose");

const createProductType = (request, response) => {
    //B1: Thu thập dữ liệu
    var bodyRequest = request.body;
    //B2: Kiểm tra dữ liệu
    if (!bodyRequest.name) {
        response.status(400).json({
            status: "Error 400: Bad Request",
            message: "name is required"
        })
    }
    //Thao tác với cơ sở dữ liệu
    let createproductType = {
        _id: mongoose.Types.ObjectId(),
        name: bodyRequest.name,
        description: bodyRequest.description
    }

    productTypeModel.create(createproductType, (error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        }
        else {
            response.status(201).json({
                status: "Success: productType Created",
                data: data
            })
        }
    })

}


const getAllProductType = (request, response) => {
    var { name, minPrice, maxPrice, type } = request.query;

    const condition = {}

    if (name) {
        const regex = new RegExp(`${name}`)
        condition.name = regex
    }
    //B1 Chuẩn bị dữ liệu
    //B2 Validate dữ liệu
    //B3 Thao tác với cơ sỡ dữ liệu
    productTypeModel.find(condition, (error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        }
        else {
            response.status(202).json({
                status: "Success: Get productTypes sucess",
                data: data
            })
        }
    })
}

const getProductTypeById = (request, response) => {
    //B1 Chuẩn bị dữ liệu
    let productTypeId = request.params.productTypeId;
    //B2 Validate dữ liệu
    if (!(mongoose.Types.ObjectId.isValid(productTypeId))) {
        response.status(400).json({
            status: "Error 400: Bad Request",
            message: "productType ID is not valid"
        })
    }
    //B3 Thao tác với cơ sỡ dữ liệu
    productTypeModel.findById(productTypeId, (error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        }
        else {
            response.status(200).json({
                status: "Success: Get productTypes sucess",
                data: data
            })
        }
    })
}

const updateProductTypeById = (request, response) => {
    //B1 Chuẩn bị dữ liệu
    let productTypeId = request.params.productTypeId;
    var bodyRequest = request.body;
    //B2 Validate dữ liệu
    if (!(mongoose.Types.ObjectId.isValid(productTypeId))) {
        response.status(400).json({
            status: "Error 400: Bad Request",
            message: "productType ID is not valid"
        })
    }
    //B3 Thao tác với cơ sỡ dữ liệu
    let productTypeUpdate = {
        name: bodyRequest.name,
        description: bodyRequest.description
    }
    productTypeModel.findByIdAndUpdate(productTypeId, productTypeUpdate, (error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        }
        else {
            response.status(201).json({
                status: "Success: Update productType success",
                data: data
            })
        }
    })
}

const deleteProductTypeById = (request, response) => {
    //B1 Chuẩn bị dữ liệu
    let productTypeId = request.params.productTypeId;
    //B2 Validate dữ liệu
    if (!(mongoose.Types.ObjectId.isValid(productTypeId))) {
        response.status(400).json({
            status: "Error 400: Bad Request",
            message: "productType ID is not valid"
        })
    }
    //B3 Thao tác với cơ sỡ dữ liệu
    productTypeModel.findByIdAndDelete(productTypeId, (error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        }
        else {
            response.status(204).json({
                status: "Success: Delete productTypes sucess",
            })
        }
    })
}

module.exports = {
    createProductType: createProductType,
    getAllProductType: getAllProductType,
    getProductTypeById: getProductTypeById,
    updateProductTypeById: updateProductTypeById,
    deleteProductTypeById: deleteProductTypeById,
}