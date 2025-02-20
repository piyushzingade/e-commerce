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
exports.getUserOrders = exports.placeOrder = void 0;
const productModel_1 = require("../models/productModel");
const orderModel_1 = require("../models/orderModel");
const cartModel_1 = require("../models/cartModel");
const placeOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const { paymentMethod, shippingAddress } = req.body;
        const userId = req.user.id;
        // Fetch user's cart
        const cart = yield cartModel_1.Cart.findOne({ userId })
            .populate("items.productId")
            .exec();
        if (!cart || !cart.items || cart.items.length === 0) {
            // ✅ Ensure items exist
            res.status(400).json({ message: "Cart is empty" });
            return;
        }
        // Check stock availability
        for (const item of cart.items) {
            const product = yield productModel_1.Product.findById(item.productId);
            if (!product || product.stock < item.quantity) {
                res.status(400).json({
                    message: `Insufficient stock for ${(product === null || product === void 0 ? void 0 : product.model) || "product"}`,
                });
                return;
            }
        }
        // Deduct stock
        for (const item of cart.items) {
            yield productModel_1.Product.findByIdAndUpdate(item.productId, {
                $inc: { stock: -item.quantity },
            });
        }
        // Create order
        const newOrder = new orderModel_1.Order({
            userId,
            items: cart.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.productId.price,
            })),
            totalAmount: cart.items.reduce((acc, item) => acc + item.productId.price * item.quantity, 0),
            paymentMethod,
            shippingAddress,
            status: "Pending",
        });
        yield newOrder.save();
        yield cartModel_1.Cart.findOneAndUpdate({ userId }, { items: [] });
        res
            .status(201)
            .json({ message: "Order placed successfully", order: newOrder });
    }
    catch (error) {
        console.error("Error placing order:", error.message);
        res.status(500).json({ message: "Error placing order", error });
    }
});
exports.placeOrder = placeOrder;
// 📜 Get User Orders
const getUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const orders = yield orderModel_1.Order.find({ userId: req.user.id })
            .populate("items.productId")
            .exec();
        if (!orders.length) {
            res.status(404).json({ message: "No orders found" });
            return;
        }
        res.status(200).json(orders);
    }
    catch (error) {
        console.error("Error fetching orders:", error.message);
        res.status(500).json({ message: "Error fetching orders", error });
    }
});
exports.getUserOrders = getUserOrders;
