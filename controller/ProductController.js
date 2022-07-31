const mongoose = require("mongoose");

const ProductModel = require("../model/ProductModel");
const ProductTypeModel = require("../model/ProductTypeModel");

// KHAI BÁO API

//Create API
const createProduct = (request, response) => {
  //B1: Thu thập dữ liệu
  let bodyRequest = request.body;

  //B2: Validate dữ liệu
  if (!bodyRequest.name) {
    return response.status(400).json({
      status: "Error 400: Bad Request ",
      message: "Name is required",
    });
  }

  if (!bodyRequest.imageUrl) {
    return response.status(400).json({
      status: "Error 400: Bad Request ",
      message: "imageUrl is required",
    });
  }

  if (!(Number.isInteger(bodyRequest.buyPrice) && bodyRequest.buyPrice > 0)) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "buy Price is not valid",
    });
  }

  if (
    !(
      Number.isInteger(bodyRequest.promotionPrice) &&
      bodyRequest.promotionPrice > 0
    )
  ) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "Promotion Price is not valid",
    });
  }

  if (!Number.isInteger(bodyRequest.amount)) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "Promotion Price is not valid",
    });
  }

  //B3: Thao tác với cơ sở dữ liệu
  let ProductCreate = {
    _id: mongoose.Types.ObjectId(),
    name: bodyRequest.name,
    description: bodyRequest.description,
    type: bodyRequest.type,
    imageUrl: bodyRequest.imageUrl,
    buyPrice: bodyRequest.buyPrice,
    promotionPrice: bodyRequest.promotionPrice,
    amount: bodyRequest.amount,
  };

  if (!mongoose.Types.ObjectId.isValid(bodyRequest.type)) {
    return res.status(400).json({
      status: "Error 400: Bad request",
      message: "type is not valid!",
    });
  }

  //B3: Xử lý dữ liệu
  ProductTypeModel.findOne({ _id: bodyRequest.type }, (error, typeExist) => {
    if (error) {
      return res.status(500).json({
        status: "Error 500: Internal server error",
        message: err.message,
      });
    } else {
      if (typeExist) {
        console.log(typeExist);
        ProductModel.create(ProductCreate, (error, data) => {
          if (error) {
            return response.status(500).json({
              status: "Error 500: Internal sever Error",
              message: error.message,
            });
          } else {
            return response.status(201).json({
              status: "Success: Create Product  successfully",
              data: data,
            });
          }
        });
      } else {
        return res.status(400).json({
          status: "Error 400: Bad request",
          message: "ProductTypeID can not find!",
        });
      }
    }
  });
};

// Get All
const getAllProduct = (request, response) => {
  //B1: Thu thập dữ liệu
  const { name, type, minPromotionPrice, maxPromotionPrice } = request.query;
  const condition = {};

  if (name) {
    const regex = new RegExp(`${name}`);
    condition.name = regex;
  }

  if (type) {
    condition.type = type;
  }

  if (minPromotionPrice) {
    condition.promotionPrice = {
      ...condition.promotionPrice,
      $gte: minPromotionPrice,
    };
  }

  if (maxPromotionPrice) {
    condition.promotionPrice = {
      ...condition.promotionPrice,
      $lte: maxPromotionPrice,
    };
  }

  let limit = request.query.limit;
  let skip = request.query.skip;

  //B2: Validate dữ liệu
  //B3: Thao tác với cơ sở dữ liệu

  ProductModel.find(condition)
    .populate("type")
    .limit(limit)
    .skip(skip)
    .exec((error, data) => {
      if (error) {
        return response.status(500).json({
          status: "Error 500: Internal sever Error",
          message: error.message,
        });
      } else {
        return response.status(200).json({
          status: "Success: Get All Product successfully",
          data: data,
        });
      }
    });
};

//Get By ID
const getProductByID = (request, response) => {
  //B1: Thu thập dữ liệu
  let productId = request.params.productId;

  //B2: Validate dữ liệu
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "Product ID is not a valid",
    });
  }

  //B3: Thao tác với cơ sở dữ liệu
  ProductModel.findById(productId, (error, data) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Bad Request",
        message: error.message,
      });
    } else {
      return response.status(200).json({
        status: "Success: Get Product By ID successfully",
        data: data,
      });
    }
  });
};

//Update Product Types
const updateProduct = (request, response) => {
  //B1: Thu thập dữ liệu
  let bodyRequest = request.body;
  let productId = request.params.productId;

  //B2: Validate dữ liệu
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "Product ID is not a valid",
    });
  }

  //B3: Thao tác với cơ sở dữ liệu
  let ProductUpdate = {
    name: bodyRequest.name,
    description: bodyRequest.description,
    type: bodyRequest.type,
    imageUrl: bodyRequest.imageUrl,
    buyPrice: bodyRequest.buyPrice,
    promotionPrice: bodyRequest.promotionPrice,
    amount: bodyRequest.amount,
  };

  ProductModel.findByIdAndUpdate(productId, ProductUpdate, (error, data) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Bad Request",
        message: error.message,
      });
    } else {
      return response.status(200).json({
        status: "Success: Get Product By ID successfully",
        data: data,
      });
    }
  });
};

//Delete Product Types
const deleteProduct = (request, response) => {
  //B1: Thu thập dữ liệu
  let productId = request.params.productId;

  //B2: Validate dữ liệu
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "Product ID is not a valid",
    });
  }

  //B3: Thao tác với cơ sở dữ liệu
  ProductModel.findByIdAndDelete(productId, (error, data) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Bad Request",
        message: error.message,
      });
    } else {
      return response.status(200).json({
        status: "Success: Get Product By ID successfully",
      });
    }
  });
};

module.exports = {
  createProduct,
  getAllProduct,
  getProductByID,
  updateProduct,
  deleteProduct,
};
