// Import product model vao controller
const productModel = require("../models/productModel");

// Import mongooseJS
const mongoose = require("mongoose");

const createProduct = (request, response) => {
    //B1: Thu thập dữ liệu
    var bodyRequest = request.body;
    //B2: Kiểm tra dữ liệu
    if (!bodyRequest.name) {
        response.status(400).json({
            status: "Error 400: Bad Request",
            message: "ordernameId is required"
        })
    }
    if (!bodyRequest.imageUrl) {
        response.status(400).json({
            status: "Error 400: Bad Request",
            message: "imageUrl is required"
        })
    }
    if (!bodyRequest.buyPrice) {
        response.status(400).json({
            status: "Error 400: Bad Request",
            message: "buyPrice is required"
        })
    }
    if (!bodyRequest.promotionPrice) {
        response.status(400).json({
            status: "Error 400: Bad Request",
            message: "promotionPrice is required"
        })
    }
    //Thao tác với cơ sở dữ liệu
    let createproduct = {
        _id: mongoose.Types.ObjectId(),
        name: bodyRequest.name,
        description: bodyRequest.description,
        imageUrl: bodyRequest.imageUrl,
        buyPrice: bodyRequest.buyPrice,
        promotionPrice: bodyRequest.promotionPrice,
        amount: bodyRequest.amount
    }

    productModel.create(createproduct, (error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        }
        else {
            response.status(201).json({
                status: "Success: product Created",
                data: data
            })
        }
    })

}

const getAllProduct = (request, response) => {
    //B1 Chuẩn bị dữ liệu
    var { name, minPrice, maxPrice, type } = request.query;

    const condition = {}

    if (name) {
        const regex = new RegExp(`${name}`)
        condition.name = regex
    }
    if (type) {
        if (type[1].length > 1) {
            condition.type = { $in: [...type] }
        }
        else { condition.type = { $in: [type] } }
    }

    if (minPrice) { 
        condition.promotionPrice = {
            ...condition.promotionPrice,
            $gte: minPrice
        }
    }

    if (maxPrice) {
        condition.promotionPrice = {
            ...condition.promotionPrice,
            $lte: maxPrice
        }
    }

    let limitProduct = request.query.limit
    let skipProduct = request.query.skip
    //B2 Validate dữ liệu
    if (limitProduct || skipProduct) {
        productModel.find(condition).limit(limitProduct).skip(skipProduct).populate("type").exec((error, data) => {
            if (error) {
                response.status(500).json({
                    status: "Error 500: Internal server error",
                    message: error.message
                })
            }
            else {
                response.status(202).json({
                    status: "Success: Get users limit sucess",
                    data: data
                })
            }
        })
    }
    else {
        //B3 Thao tác với cơ sỡ dữ liệu
        productModel.find(condition)
            .populate("type")
            .exec((error, data) => {
                if (error) {
                    return response.status(500).json({
                        status: "Error 500: Internal server error",
                        message: error.message
                    })
                } else {
                    return response.status(200).json({
                        status: "Get data success",
                        data: data
                    })
                }
            })
    }
}

const getProductById = (request, response) => {
    //B1 Chuẩn bị dữ liệu
    let productId = request.params.productId;
    //B2 Validate dữ liệu
    if (!(mongoose.Types.ObjectId.isValid(productId))) {
        response.status(400).json({
            status: "Error 400: Bad Request",
            message: "product ID is not valid"
        })
    }
    //B3 Thao tác với cơ sỡ dữ liệu
    productModel.findById(productId).populate("type").exec((error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        }
        else {
            response.status(200).json({
                status: "Success: Get product sucess",
                data: data
            })
        }
    })
}

const updateProductById = (request, response) => {
    //B1 Chuẩn bị dữ liệu
    let productId = request.params.productId;
    var bodyRequest = request.body;
    //B2 Validate dữ liệu
    if (!(mongoose.Types.ObjectId.isValid(productId))) {
        response.status(400).json({
            status: "Error 400: Bad Request",
            message: "product ID is not valid"
        })
    }
    //B3 Thao tác với cơ sỡ dữ liệu
    let productUpdate = {
        name: bodyRequest.name,
        imageUrl: bodyRequest.imageUrl,
        buyPrice: bodyRequest.buyPrice,
        type: bodyRequest.type,
        promotionPrice: bodyRequest.promotionPrice,
    }
    productModel.findByIdAndUpdate(productId, productUpdate, (error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        }
        else {
            response.status(201).json({
                status: "Success: Update product success",
                data: data
            })
        }
    })
}

const deleteProductById = (request, response) => {
    //B1 Chuẩn bị dữ liệu
    let productId = request.params.productId;
    //B2 Validate dữ liệu
    if (!(mongoose.Types.ObjectId.isValid(productId))) {
        response.status(400).json({
            status: "Error 400: Bad Request",
            message: "product ID is not valid"
        })
    }
    //B3 Thao tác với cơ sỡ dữ liệu
    productModel.findByIdAndDelete(productId, (error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        }
        else {
            response.status(204).json({
                status: "Success: Delete product sucess",
            })
        }
    })
}

module.exports = {
    createProduct: createProduct,
    getAllProduct: getAllProduct,
    getProductById: getProductById,
    updateProductById: updateProductById,
    deleteProductById: deleteProductById,
}