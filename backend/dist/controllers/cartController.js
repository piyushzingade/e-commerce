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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkout = exports.removeFromCart = exports.getCart = exports.addToCart = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const cartModel_1 = require("../models/cartModel");
const orderModel_1 = require("../models/orderModel");
const productModel_1 = require("../models/productModel");
/**
 * @route POST /api/cart/add
 * @desc Add an item to the cart
 * @access Public
 */
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, quantity } = req.body;
        if (!productId || quantity <= 0) {
            res.status(400).json({ message: "Invalid input data" });
            return;
        }
        if (!mongoose_1.default.Types.ObjectId.isValid(productId)) {
            res.status(400).json({ message: "Invalid productId format" });
            return;
        }
        let cart = yield cartModel_1.Cart.findOne();
        if (!cart) {
            cart = new cartModel_1.Cart({ items: [] });
        }
        const product = yield productModel_1.Product.findById(productId);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        }
        else {
            cart.items.push({
                //@ts-ignore
                productId: new mongoose_1.default.Types.ObjectId(productId),
                quantity,
            });
        }
        yield cart.save();
        res.status(200).json({ message: "Item added to cart", cart });
    }
    catch (error) {
        console.error("Error adding to cart:", error.message);
        res.status(500).json({ message: "Error adding to cart", error });
    }
});
exports.addToCart = addToCart;
/**
 * @route GET /cart
 * @desc Get the cart
 * @access Public
 */
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield cartModel_1.Cart.findOne().populate("items.productId");
        if (!cart) {
            res.status(404).json({ message: "Cart not found" });
            return;
        }
        res.status(200).json(cart);
    }
    catch (error) {
        console.error("Error fetching cart:", error.message);
        res.status(500).json({ message: "Error fetching cart", error });
    }
});
exports.getCart = getCart;
/**
 * @route DELETE /cart/remove/:id
 * @desc Remove an item from the cart
 * @access Public
 */
const removeFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        if (!mongoose_1.default.Types.ObjectId.isValid(productId)) {
            res.status(400).json({ message: "Invalid product ID" });
            return;
        }
        const cart = yield cartModel_1.Cart.findOneAndUpdate({}, {
            $pull: { items: { productId: new mongoose_1.default.Types.ObjectId(productId) } },
        }, { new: true });
        if (!cart) {
            res.status(404).json({ message: "Cart not found" });
            return;
        }
        res.status(200).json({ message: "Item removed", cart });
    }
    catch (error) {
        console.error("Error removing item from cart:", error.message);
        res.status(500).json({ message: "Error removing item", error });
    }
});
exports.removeFromCart = removeFromCart;
/**
 * @route POST /cart/checkout
 * @desc Checkout the cart and create an order
 * @access Public
 */
const checkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { address } = req.body;
        if (!address ||
            !address.street ||
            !address.city ||
            !address.state ||
            !address.zip) {
            res.status(400).json({ message: "Address is required" });
            return;
        }
        const cart = yield cartModel_1.Cart.findOne().populate("items.productId");
        if (!cart || !cart.items || cart.items.length === 0) {
            res.status(400).json({ message: "Cart is empty" });
            return;
        }
        const orderItems = cart.items.map((item) => {
            const product = item.productId;
            return {
                productId: product._id,
                quantity: item.quantity,
                price: product.price,
            };
        });
        const totalAmount = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const order = new orderModel_1.Order({
            items: orderItems,
            totalAmount,
            address,
            orderDate: new Date(),
        });
        yield order.save();
        yield cartModel_1.Cart.findOneAndUpdate({}, { items: [] });
        res.status(200).json({ message: "Order placed successfully", order });
    }
    catch (error) {
        console.error("Error during checkout:", error.message);
        res.status(500).json({ message: "Error during checkout", error });
    }
});
exports.checkout = checkout;
