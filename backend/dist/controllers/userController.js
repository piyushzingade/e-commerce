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
exports.getPurchase = exports.getUserProfile = void 0;
const userModel_1 = require("../models/userModel");
const orderModel_1 = require("../models/orderModel");
// 🧑‍💼 Get User Profile
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Ensure the user is authenticated
        if (!req.user || !req.user.id) {
            res.status(401).json({ error: "Unauthorized access" });
            return;
        }
        // Fetch the user from the database, excluding the password
        const user = yield userModel_1.User.findById(req.user.id).select("-password");
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        // Return the user profile data
        res.status(200).json(user);
    }
    catch (error) {
        console.error("Error fetching user profile:", error.message);
        res.status(500).json({ error: "Error fetching user profile" });
    }
});
exports.getUserProfile = getUserProfile;
// 🛒 Get User Purchase History
const getPurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        // Fetch all orders placed by the user
        const orders = yield orderModel_1.Order.find({ userId }).populate("items.productId");
        if (!orders || orders.length === 0) {
            res.status(404).json({ message: "No purchase history found" });
        }
        res.status(200).json(orders);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error fetching purchase history", error });
    }
});
exports.getPurchase = getPurchase;
