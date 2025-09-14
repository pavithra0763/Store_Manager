const express = require("express");
const router = express.Router();
const productController = require("../controller/product");

// Add Product
router.post("/add", productController.addProduct);

// Get All Products by user
router.get("/get/:userId", productController.getAllProducts);

// Delete Product
router.delete("/delete/:id", productController.deleteSelectedProduct);

// Update Product
router.post("/update", productController.updateSelectedProduct);

// Search Product
router.get("/search", productController.searchProduct);

module.exports = router;
