"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkout = exports.removeFromCart = exports.getCart = exports.addToCart = void 0;
const cartModel_1 = require("../models/cartModel");
const data_1 = require("../data");
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId, quantity } = req.body;
    try {
        if (!userId || !productId || quantity <= 0) {
            res.status(400).json({ message: "Invalid input data" });
            return;
        }
        let cart = yield cartModel_1.Cart.findOne({ userId });
        if (!cart) {
            cart = new cartModel_1.Cart({ userId, items: [] });
        }
        const product = data_1.Products.find((p) => p.model === productId);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        }
        else {
            cart.items.push({ productId, quantity });
        }
        yield cart.save();
        res.status(200).json(cart);
    }
    catch (error) {
        res.status(500).json({ message: "Error adding to cart", error });
    }
});
exports.addToCart = addToCart;
// 📦 Get cart items
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.query;
        const cart = yield cartModel_1.Cart.findOne({ userId }).populate("items.productId");
        if (!cart) {
            res.status(404).json({ message: "Cart not found" });
            return;
        }
        res.status(200).json(cart);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching cart", error });
    }
});
exports.getCart = getCart;
const removeFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const { id: productId } = req.params;
    try {
        const cart = yield cartModel_1.Cart.findOneAndUpdate({ userId }, { $pull: { items: { productId } } }, { new: true });
        if (!cart) {
            res.status(404).json({ message: "Cart not found" });
            return;
        }
        res.status(200).json({ message: "Item removed", cart });
    }
    catch (error) {
        res.status(500).json({ message: "Error removing item", error });
    }
});
exports.removeFromCart = removeFromCart;
// ✅ Checkout and place order
const checkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        // Fetch the cart with product details populated
        const cart = yield cartModel_1.Cart.findOne({ userId }).populate("items.productId");
        if (!cart || !cart.items || cart.items.length === 0) {
            res.status(400).json({ message: "Cart is empty" });
            return;
        }
        // Calculate total price
        const totalAmount = cart.items.reduce((acc, item) => {
            const product = item.productId; // Type assertion for populated product
            return acc + (product.price || 0) * item.quantity;
        }, 0);
        // Create order object
        const order = {
            userId: cart.userId,
            items: cart.items,
            total: totalAmount,
            orderDate: new Date(),
        };
        // Clear the cart after checkout
        yield cartModel_1.Cart.findOneAndUpdate({ userId }, { items: [] });
        res
            .status(200)
            .json({ message: "Order placed successfully", order });
    }
    catch (error) {
        res.status(500).json({ message: "Error during checkout", error });
    }
});
exports.checkout = checkout;
