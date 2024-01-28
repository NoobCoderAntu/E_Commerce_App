const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//Create product --- Admin
exports.createProduct = catchAsyncErrors (async (req,res,next)=>{

    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
});
// Get All products
exports.getAllProducts = catchAsyncErrors (async (req,res)=>{
    
    const products = await Product.find();
    res.status(200).json({
        success:true,
        products
    })
});

// Get Product Details
exports.getProductDetails = catchAsyncErrors (async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      product,
    });
  });
  

// Update product ---Admin
exports.updateProduct = catchAsyncErrors (async (req,res,next)=>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return  res.status(500).json({
            success:false,
            message:"product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        product
    })
});

// Delete product
exports.deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByIdAndDelete(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product Deleted Successfully"
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
