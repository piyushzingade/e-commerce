"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.getAllProducts = void 0;
const data_1 = require("../data"); // Import the product data directly
// Get all products
const getAllProducts = (req, res) => {
    try {
        res.status(200).json(data_1.Products);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
};
exports.getAllProducts = getAllProducts;
// Get product by ID
const getProductById = (req, res) => {
    try {
        const product = data_1.Products.find((p) => p.model === req.params.id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching product", error });
    }
};
exports.getProductById = getProductById;
