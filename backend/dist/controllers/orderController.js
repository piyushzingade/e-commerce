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
const orderModel_1 = require("../models/orderModel");
const cartModel_1 = require("../models/cartModel");
const data_1 = require("../data"); // Array of product objects
const placeOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, paymentMethod, shippingAddress } = req.body;
        // Fetch user's cart
        const cart = yield cartModel_1.Cart.findOne({ userId }).populate("items.productId");
        if (!cart || cart.items.length === 0) {
            res.status(400).json({ message: "Cart is empty" });
            return;
        }
        // Check stock availability
        for (const item of cart.items) {
            const product = data_1.Products.find((p) => p.model === item.productId.toString());
            if (!product || product.stock < item.quantity) {
                res.status(400).json({
                    message: `Insufficient stock for ${(product === null || product === void 0 ? void 0 : product.model) || "product"}`,
                });
                return;
            }
        }
        // Deduct stock
        for (const item of cart.items) {
            const product = data_1.Products.find((p) => p.model === item.productId.toString());
            if (product) {
                product.stock -= item.quantity;
            }
        }
        // Create order
        const newOrder = new orderModel_1.Order({
            userId,
            items: cart.items.map((item) => {
                var _a;
                return ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: ((_a = data_1.Products.find((p) => p.model === item.productId.toString())) === null || _a === void 0 ? void 0 : _a.price) ||
                        0,
                });
            }),
            totalAmount: cart.items.reduce((acc, item) => {
                const product = data_1.Products.find((p) => p.model === item.productId.toString());
                return acc + ((product === null || product === void 0 ? void 0 : product.price) || 0) * item.quantity;
            }, 0),
            paymentMethod,
            shippingAddress,
            status: "Pending",
        });
        yield newOrder.save();
        // Clear cart
        yield cartModel_1.Cart.findOneAndUpdate({ userId }, { items: [] });
        res
            .status(201)
            .json({ message: "Order placed successfully", order: newOrder });
    }
    catch (error) {
        res.status(500).json({ message: "Error placing order", error });
    }
});
exports.placeOrder = placeOrder;
const getUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderModel_1.Order.find({ userId: req.query.userId }).populate("items.productId");
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
});
exports.getUserOrders = getUserOrders;
