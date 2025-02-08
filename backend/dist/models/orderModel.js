"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchema = exports.Order = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const zod_1 = require("zod");
// Mongoose Schema
const OrderSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            productId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        },
    ],
    totalAmount: { type: Number, required: true },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true },
        country: { type: String, default: "India" },
    },
    status: {
        type: String,
        enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
        default: "Pending",
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending",
    },
}, { timestamps: true });
exports.Order = mongoose_1.default.model("Order", OrderSchema);
exports.orderSchema = zod_1.z.object({
    userId: zod_1.z.string().min(1, "User ID is required"),
    items: zod_1.z.array(zod_1.z.object({
        productId: zod_1.z.string().min(1, "Product ID is required"),
        quantity: zod_1.z.number().min(1, "Quantity must be at least 1"),
        price: zod_1.z.number().min(1, "Price must be greater than 0"),
    })),
    totalAmount: zod_1.z.number().min(1, "Total amount must be greater than 0"),
    address: zod_1.z.object({
        street: zod_1.z.string().min(1, "Street is required"),
        city: zod_1.z.string().min(1, "City is required"),
        state: zod_1.z.string().min(1, "State is required"),
        zip: zod_1.z.string().min(1, "ZIP code is required"),
        country: zod_1.z.string().default("India"),
    }),
});
