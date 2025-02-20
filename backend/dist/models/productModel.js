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
exports.productSchema = exports.Product = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const zod_1 = require("zod");
// // Mongoose Schema
const ProductSchema = new mongoose_1.Schema({
    category: {
        type: String,
        enum: ["Processor", "Motherboard", "RAM", "Accessories", "Graphic Card"],
        required: true,
    },
    brand: { type: String, required: true },
    model: { type: String, required: true }, // ✅ No conflict now
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    images: [{ type: String }],
    specifications: { type: Object, default: {} },
}, { timestamps: true });
exports.Product = mongoose_1.default.model("Product", ProductSchema);
// ✅ Zod Validation Schema
exports.productSchema = zod_1.z.object({
    category: zod_1.z.enum([
        "Processor",
        "Motherboard",
        "RAM",
        "Accessories",
        "Graphic Card",
    ]),
    brand: zod_1.z.string().min(1, "Brand is required"),
    model: zod_1.z.string().min(1, "Model is required"),
    price: zod_1.z.number().min(1, "Price must be greater than 0"),
    stock: zod_1.z.number().min(0, "Stock cannot be negative"),
    images: zod_1.z.array(zod_1.z.string().url("Invalid image URL")).optional(),
    specifications: zod_1.z.record(zod_1.z.any()).optional(),
});
